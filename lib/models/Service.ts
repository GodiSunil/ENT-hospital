import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['ear', 'nose', 'throat', 'pediatric', 'hearing', 'voice', 'allergy'],
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: true,
  },
  procedures: {
    type: [String],
    default: [],
  },
  symptoms: {
    type: [String],
    default: [],
  },
  treatments: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: '30-60 minutes',
  },
  preparation: {
    type: [String],
    default: [],
  },
  recovery: {
    type: String,
    default: '',
  },
  risks: {
    type: [String],
    default: [],
  },
  cost: {
    type: String,
    default: 'Varies by treatment',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);