import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'general',
    },
    companyName: {
      type: String,
      default: 'Paras Property',
    },
    tagline: {
      type: String,
      default: 'Verified Plots & Premium Properties in Prime Locations',
    },
    ownerName: {
      type: String,
      default: 'Ashok Yadav',
    },
    ownerRole: {
      type: String,
      default: 'Founder & Property Consultant',
    },
    ownerPhoto: {
      type: String,
      default: '/images/ashok-yadav.jpg',
    },
    ownerMessage: {
      type: String,
      default: 'With over a decade of hands-on experience in prime residential plots, commercial lands, and gated townships across Jaipur, my personal commitment at Paras Property is to ensure 100% legal title verification, direct developer pricing, and a smooth registry experience for every buyer.',
    },
    phone: {
      type: String,
      default: '+91 77426 50820',
    },
    whatsapp: {
      type: String,
      default: '7742650820',
    },
    email: {
      type: String,
      default: 'ashokyadav@parasproperty.com',
    },
    address: {
      type: String,
      default: 'Tonk Road, Near Airport, Jaipur, Rajasthan 302018',
    },
    metaPixelId: {
      type: String,
      default: '',
    },
    currencySymbol: {
      type: String,
      default: '₹',
    },
    facebookUrl: {
      type: String,
      default: 'https://facebook.com',
    },
    instagramUrl: {
      type: String,
      default: 'https://instagram.com',
    },
    youtubeUrl: {
      type: String,
      default: 'https://youtube.com',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
