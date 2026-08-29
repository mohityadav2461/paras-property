import { connectToDatabase } from './mongodb.js';
import Property from './models/Property.js';
import Lead from './models/Lead.js';
import User from './models/User.js';
import Setting from './models/Setting.js';
import { initialProperties, initialLeads, defaultAdmin, defaultSettings } from './seedData.js';
import { hashPassword } from './auth.js';

// In-memory persistent storage fallback
let memoryStore = {
  initialized: false,
  properties: [],
  leads: [],
  users: [],
  settings: { ...defaultSettings },
};

let mongoSeeded = false;

export async function ensureMongoSeeded() {
  if (mongoSeeded) return;
  const conn = await connectToDatabase();
  if (!conn) return;

  try {
    const hashedAdminPassword = await hashPassword(defaultAdmin.password);
    const [userCount, propCount, leadCount, settingDoc] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Lead.countDocuments(),
      Setting.findOne({ key: 'general' }),
    ]);

    const seedTasks = [];
    if (userCount === 0) {
      seedTasks.push(
        User.create({
          name: defaultAdmin.name,
          email: defaultAdmin.email,
          passwordHash: hashedAdminPassword,
          role: 'admin',
        })
      );
    }
    if (propCount === 0) {
      seedTasks.push(Property.insertMany(initialProperties));
    }
    if (leadCount === 0) {
      seedTasks.push(Lead.insertMany(initialLeads));
    }
    if (!settingDoc) {
      seedTasks.push(Setting.create(defaultSettings));
    }

    if (seedTasks.length > 0) {
      await Promise.all(seedTasks);
    }
    mongoSeeded = true;
  } catch (err) {
    console.warn('Storage MongoDB seed notice:', err.message);
  }
}

export async function initStorage() {
  if (memoryStore.initialized) {
    await ensureMongoSeeded();
    return;
  }

  // Initialize in-memory fallback
  const hashedAdminPassword = await hashPassword(defaultAdmin.password);
  memoryStore.users = [
    {
      _id: 'user_admin_1',
      name: defaultAdmin.name,
      email: defaultAdmin.email,
      passwordHash: hashedAdminPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  memoryStore.properties = initialProperties.map((p, idx) => ({
    ...p,
    _id: `prop_${idx + 1}`,
    createdAt: new Date(Date.now() - (idx * 86400000)),
    updatedAt: new Date(),
  }));

  memoryStore.leads = initialLeads.map((l, idx) => ({
    ...l,
    _id: `lead_${idx + 1}`,
    propertyId: l.propertySlug ? (memoryStore.properties.find(p => p.slug === l.propertySlug)?._id || '') : '',
    updatedAt: new Date(),
  }));

  memoryStore.settings = { ...defaultSettings };
  memoryStore.initialized = true;

  await ensureMongoSeeded();
}

function escapeRegex(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ----------------- PROPERTIES CRUD ----------------- //

export async function getProperties({ status, location, propertyType, minPrice, maxPrice, minSize, maxSize, search, sort = 'newest' } = {}) {
  await initStorage();
  const conn = await connectToDatabase();

  if (conn) {
    try {
      const query = {};
      if (status && status !== 'all') {
        query.status = status;
      } else {
        // By default on public queries, exclude hidden properties unless explicitly requested
        query.status = { $ne: 'Hidden' };
      }

      if (location && location !== 'all') {
        query.location = { $regex: escapeRegex(location.trim()), $options: 'i' };
      }
      if (propertyType && propertyType !== 'all') {
        query.propertyType = propertyType;
      }
      if (minPrice) {
        query.price = { ...query.price, $gte: Number(minPrice) };
      }
      if (maxPrice) {
        query.price = { ...query.price, $lte: Number(maxPrice) };
      }
      if (minSize) {
        query.size = { ...query.size, $gte: Number(minSize) };
      }
      if (maxSize) {
        query.size = { ...query.size, $lte: Number(maxSize) };
      }
      if (search && search.trim()) {
        const escaped = escapeRegex(search.trim());
        const searchRegex = { $regex: escaped, $options: 'i' };
        query.$or = [
          { title: searchRegex },
          { location: searchRegex },
          { address: searchRegex },
          { description: searchRegex },
        ];
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'price-asc') sortOptions = { price: 1 };
      if (sort === 'price-desc') sortOptions = { price: -1 };
      if (sort === 'size-desc') sortOptions = { size: -1 };

      const props = await Property.find(query).sort(sortOptions).lean();
      return JSON.parse(JSON.stringify(props));
    } catch (e) {
      console.warn('Mongo getProperties fallback:', e.message);
    }
  }

  // Memory fallback
  let list = [...memoryStore.properties];

  if (status && status !== 'all') {
    list = list.filter((p) => p.status === status);
  } else {
    list = list.filter((p) => p.status !== 'Hidden');
  }

  if (location && location !== 'all') {
    const locLower = location.toLowerCase();
    list = list.filter((p) => p.location.toLowerCase().includes(locLower));
  }
  if (propertyType && propertyType !== 'all') {
    list = list.filter((p) => p.propertyType === propertyType);
  }
  if (minPrice) {
    list = list.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    list = list.filter((p) => p.price <= Number(maxPrice));
  }
  if (minSize) {
    list = list.filter((p) => p.size >= Number(minSize));
  }
  if (maxSize) {
    list = list.filter((p) => p.size <= Number(maxSize));
  }
  if (search && search.trim()) {
    const s = search.toLowerCase().trim();
    list = list.filter((p) =>
      p.title.toLowerCase().includes(s) ||
      p.location.toLowerCase().includes(s) ||
      (p.address && p.address.toLowerCase().includes(s)) ||
      (p.description && p.description.toLowerCase().includes(s))
    );
  }

  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sort === 'size-desc') list.sort((a, b) => b.size - a.size);
  else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return list;
}

export async function getAllPropertiesAdmin() {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const props = await Property.find({}).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(props));
    } catch (e) {
      console.warn('Mongo getAllPropertiesAdmin fallback:', e.message);
    }
  }
  return [...memoryStore.properties].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getPropertyBySlugOrId(slugOrId) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(slugOrId);
      const query = isObjectId ? { $or: [{ _id: slugOrId }, { slug: slugOrId }] } : { slug: slugOrId };
      const prop = await Property.findOne(query).lean();
      if (prop) return JSON.parse(JSON.stringify(prop));
    } catch (e) {
      console.warn('Mongo getPropertyBySlugOrId fallback:', e.message);
    }
  }

  const found = memoryStore.properties.find(
    (p) => p.slug === slugOrId || p._id === slugOrId || String(p.id) === slugOrId
  );
  return found || null;
}

export async function createProperty(data) {
  await initStorage();

  // Generate unique slug
  let slugBase = (data.slug || data.title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  if (!slugBase) slugBase = `property-${Date.now()}`;

  let finalSlug = slugBase;
  let counter = 1;
  while (await getPropertyBySlugOrId(finalSlug)) {
    finalSlug = `${slugBase}-${counter}`;
    counter++;
  }

  const propertyData = {
    ...data,
    slug: finalSlug,
    price: Number(data.price),
    size: Number(data.size),
    images: data.images && Array.isArray(data.images) ? data.images : [],
    amenities: data.amenities && Array.isArray(data.amenities) ? data.amenities : [],
    legalInformation: data.legalInformation && Array.isArray(data.legalInformation) ? data.legalInformation : [],
    nearbyLandmarks: data.nearbyLandmarks && Array.isArray(data.nearbyLandmarks) ? data.nearbyLandmarks : [],
  };

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const created = await Property.create(propertyData);
      return JSON.parse(JSON.stringify(created));
    } catch (e) {
      console.warn('Mongo createProperty fallback:', e.message);
    }
  }

  const newMemoryProperty = {
    ...propertyData,
    _id: `prop_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryStore.properties.unshift(newMemoryProperty);
  return newMemoryProperty;
}

export async function updateProperty(id, data) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    if (!mongoSeeded) await ensureMongoSeeded();
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      const updated = isObjectId
        ? await Property.findByIdAndUpdate(id, data, { new: true }).lean()
        : await Property.findOneAndUpdate({ slug: id }, data, { new: true }).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    } catch (e) {
      console.warn('Mongo updateProperty fallback:', e.message);
    }
  }

  const index = memoryStore.properties.findIndex((p) => p._id === id || p.slug === id);
  if (index !== -1) {
    memoryStore.properties[index] = {
      ...memoryStore.properties[index],
      ...data,
      updatedAt: new Date(),
    };
    return memoryStore.properties[index];
  }
  return null;
}

export async function deleteProperty(id) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    if (!mongoSeeded) await ensureMongoSeeded();
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      if (isObjectId) {
        await Property.findByIdAndDelete(id);
      } else {
        await Property.findOneAndDelete({ slug: id });
      }
      return { success: true };
    } catch (e) {
      console.warn('Mongo deleteProperty fallback:', e.message);
    }
  }

  memoryStore.properties = memoryStore.properties.filter((p) => p._id !== id && p.slug !== id);
  return { success: true };
}

// ----------------- LEADS CRUD & CRM ----------------- //

export async function getLeads({ status, search, source } = {}) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const query = {};
      if (status && status !== 'all') query.status = status;
      if (source && source !== 'all') query.source = source;
      if (search && search.trim()) {
        const escaped = escapeRegex(search.trim());
        const s = { $regex: escaped, $options: 'i' };
        query.$or = [{ name: s }, { phone: s }, { email: s }, { propertyTitle: s }];
      }
      const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(leads));
    } catch (e) {
      console.warn('Mongo getLeads fallback:', e.message);
    }
  }

  let list = [...memoryStore.leads];
  if (status && status !== 'all') list = list.filter((l) => l.status === status);
  if (source && source !== 'all') list = list.filter((l) => l.source === source);
  if (search && search.trim()) {
    const s = search.toLowerCase().trim();
    list = list.filter(
      (l) =>
        l.name.toLowerCase().includes(s) ||
        l.phone.includes(s) ||
        (l.email && l.email.toLowerCase().includes(s)) ||
        (l.propertyTitle && l.propertyTitle.toLowerCase().includes(s))
    );
  }
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getLeadById(id) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    if (!mongoSeeded) await ensureMongoSeeded();
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      if (isObjectId) {
        const lead = await Lead.findById(id).lean();
        if (lead) return JSON.parse(JSON.stringify(lead));
      }
    } catch (e) {
      console.warn('Mongo getLeadById fallback:', e.message);
    }
  }
  return memoryStore.leads.find((l) => l._id === id || String(l.id) === id) || null;
}

export async function createLead(leadData) {
  await initStorage();

  // Prevent accidental duplicate within last 5 minutes with same phone & property
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
  const conn = await connectToDatabase();

  if (conn) {
    if (!mongoSeeded) await ensureMongoSeeded();
    try {
      const existing = await Lead.findOne({
        phone: leadData.phone,
        propertyTitle: leadData.propertyTitle,
        createdAt: { $gte: fiveMinAgo },
      });
      if (existing) {
        return JSON.parse(JSON.stringify(existing));
      }

      const created = await Lead.create(leadData);
      // Increment property enquiry count
      if (leadData.propertyId) {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(leadData.propertyId);
        if (isObjectId) {
          await Property.findByIdAndUpdate(leadData.propertyId, { $inc: { enquiryCount: 1 } });
        }
      }
      return JSON.parse(JSON.stringify(created));
    } catch (e) {
      console.warn('Mongo createLead fallback:', e.message);
    }
  }

  const existingMemory = memoryStore.leads.find(
    (l) =>
      l.phone === leadData.phone &&
      l.propertyTitle === leadData.propertyTitle &&
      new Date(l.createdAt) >= fiveMinAgo
  );
  if (existingMemory) return existingMemory;

  const newLead = {
    ...leadData,
    _id: `lead_${Date.now()}`,
    status: 'New',
    notes: [
      {
        note: `Enquiry submitted via ${leadData.source || 'Website'}${leadData.utmCampaign ? ` (Campaign: ${leadData.utmCampaign})` : ''}`,
        createdBy: 'System (Lead Form)',
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  memoryStore.leads.unshift(newLead);
  return newLead;
}

export async function updateLeadStatus(id, status) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    if (!mongoSeeded) await ensureMongoSeeded();
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      if (isObjectId) {
        const updated = await Lead.findByIdAndUpdate(id, { status }, { new: true }).lean();
        if (updated) return JSON.parse(JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Mongo updateLeadStatus fallback:', e.message);
    }
  }

  const lead = memoryStore.leads.find((l) => l._id === id);
  if (lead) {
    lead.status = status;
    lead.updatedAt = new Date();
    return lead;
  }
  return null;
}

export async function addLeadNote(id, { note, createdBy = 'Admin Director' }) {
  await initStorage();
  const conn = await connectToDatabase();
  const newNote = {
    note,
    createdBy,
    createdAt: new Date(),
  };

  if (conn) {
    if (!mongoSeeded) await ensureMongoSeeded();
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      if (isObjectId) {
        const updated = await Lead.findByIdAndUpdate(
          id,
          { $push: { notes: newNote } },
          { new: true }
        ).lean();
        if (updated) return JSON.parse(JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Mongo addLeadNote fallback:', e.message);
    }
  }

  const lead = memoryStore.leads.find((l) => l._id === id);
  if (lead) {
    if (!lead.notes) lead.notes = [];
    lead.notes.push(newNote);
    lead.updatedAt = new Date();
    return lead;
  }
  return null;
}

// ----------------- SETTINGS & ANALYTICS ----------------- //

export async function getSettings() {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const s = await Setting.findOne({ key: 'general' }).lean();
      if (s) return JSON.parse(JSON.stringify(s));
    } catch (e) {
      console.warn('Mongo getSettings fallback:', e.message);
    }
  }
  return memoryStore.settings;
}

export async function updateSettings(data) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const updated = await Setting.findOneAndUpdate({ key: 'general' }, data, {
        upsert: true,
        new: true,
      }).lean();
      return JSON.parse(JSON.stringify(updated));
    } catch (e) {
      console.warn('Mongo updateSettings fallback:', e.message);
    }
  }
  memoryStore.settings = { ...memoryStore.settings, ...data };
  return memoryStore.settings;
}

export async function getAnalytics() {
  await initStorage();
  const allProperties = await getAllPropertiesAdmin();
  const allLeads = await getLeads();

  const totalProperties = allProperties.length;
  const availableProperties = allProperties.filter((p) => p.status === 'Available').length;
  const reservedProperties = allProperties.filter((p) => p.status === 'Reserved').length;
  const soldProperties = allProperties.filter((p) => p.status === 'Sold').length;

  const totalLeads = allLeads.length;
  const newLeads = allLeads.filter((l) => l.status === 'New').length;
  const contactedLeads = allLeads.filter((l) => l.status === 'Contacted').length;
  const convertedLeads = allLeads.filter((l) => l.status === 'Converted').length;

  const oneWeekAgo = new Date(Date.now() - 7 * 86400000);
  const oneMonthAgo = new Date(Date.now() - 30 * 86400000);
  const leadsThisWeek = allLeads.filter((l) => new Date(l.createdAt) >= oneWeekAgo).length;
  const leadsThisMonth = allLeads.filter((l) => new Date(l.createdAt) >= oneMonthAgo).length;

  // Source breakdown
  const sourceMap = {};
  allLeads.forEach((l) => {
    const src = l.source || l.utmSource || 'Website Direct';
    sourceMap[src] = (sourceMap[src] || 0) + 1;
  });

  // Campaign breakdown
  const campaignMap = {};
  allLeads.forEach((l) => {
    if (l.utmCampaign) {
      campaignMap[l.utmCampaign] = (campaignMap[l.utmCampaign] || 0) + 1;
    }
  });

  return {
    propertyStats: {
      total: totalProperties,
      available: availableProperties,
      reserved: reservedProperties,
      sold: soldProperties,
    },
    leadStats: {
      total: totalLeads,
      new: newLeads,
      contacted: contactedLeads,
      converted: convertedLeads,
      thisWeek: leadsThisWeek,
      thisMonth: leadsThisMonth,
    },
    sourceBreakdown: sourceMap,
    campaignBreakdown: campaignMap,
    recentLeads: allLeads.slice(0, 5),
    recentProperties: allProperties.slice(0, 5),
  };
}

export async function findUserByEmail(email) {
  await initStorage();
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const user = await User.findOne({ email: email.toLowerCase().trim() }).lean();
      if (user) return JSON.parse(JSON.stringify(user));
    } catch (e) {
      console.warn('Mongo findUserByEmail fallback:', e.message);
    }
  }
  return memoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
}
