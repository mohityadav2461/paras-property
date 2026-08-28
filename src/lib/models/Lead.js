import mongoose from 'mongoose';

const LeadNoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: 'Admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },
    propertyId: {
      type: String,
      default: '',
    },
    propertyTitle: {
      type: String,
      default: 'General Enquiry',
    },
    propertySlug: {
      type: String,
      default: '',
    },
    budget: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'New',
        'Contacted',
        'Interested',
        'Site Visit',
        'Negotiation',
        'Converted',
        'Lost',
      ],
      default: 'New',
    },
    source: {
      type: String,
      default: 'Website Direct',
    },
    utmSource: {
      type: String,
      default: '',
    },
    utmMedium: {
      type: String,
      default: '',
    },
    utmCampaign: {
      type: String,
      default: '',
    },
    utmContent: {
      type: String,
      default: '',
    },
    utmTerm: {
      type: String,
      default: '',
    },
    landingPage: {
      type: String,
      default: '/',
    },
    referrer: {
      type: String,
      default: '',
    },
    notes: {
      type: [LeadNoteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for lead management, phone lookups, and campaign attribution
LeadSchema.index({ phone: 1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ utmSource: 1, utmCampaign: 1 });
LeadSchema.index({ createdAt: -1 });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
