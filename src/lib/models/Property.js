import mongoose from 'mongoose';

const PropertyImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  cloudinaryPublicId: { type: String, default: '' },
  altText: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  isCover: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Property slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: '',
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: [
        'Plot',
        'Residential Plot',
        'Commercial Plot',
        'Villa',
        'Apartment',
        'Farmhouse',
        'Commercial Land',
        'Agricultural Land',
        'Studio / Office',
      ],
      default: 'Residential Plot',
    },
    location: {
      type: String,
      required: [true, 'Location / Area is required'],
      trim: true,
    },
    address: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    priceUnit: {
      type: String,
      default: 'Lakh', // 'Total', 'Lakh', 'Crore', 'per sq ft', 'per sq yd'
    },
    priceDisplay: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
      min: 0,
    },
    sizeUnit: {
      type: String,
      default: 'sq ft', // 'sq ft', 'sq yd', 'Gaj', 'Bigha', 'Acres'
    },
    facing: {
      type: String,
      default: 'East', // North, South, East, West, North-East, etc.
    },
    roadWidth: {
      type: String,
      default: '30 ft',
    },
    amenities: {
      type: [String],
      default: [],
    },
    nearbyLandmarks: {
      type: [String],
      default: [],
    },
    legalInformation: {
      type: [String],
      default: ['Registry Ready', 'Freehold', 'Bank Loan Available'],
    },
    status: {
      type: String,
      enum: ['Available', 'Reserved', 'Sold', 'Hidden'],
      default: 'Available',
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    images: {
      type: [PropertyImageSchema],
      default: [],
    },
    videoUrl: {
      type: String,
      default: '',
    },
    videoPublicId: {
      type: String,
      default: '',
    },
    videoTitle: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    enquiryCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for high performance searches & filters
PropertySchema.index({ status: 1, location: 1, propertyType: 1 });
PropertySchema.index({ price: 1, size: 1 });
PropertySchema.index({ createdAt: -1 });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
