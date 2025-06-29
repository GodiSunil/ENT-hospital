import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  specialization: {
    type: [String],
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  education: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    default: ['English'],
  },
  availability: {
    monday: { type: [String], default: [] },
    tuesday: { type: [String], default: [] },
    wednesday: { type: [String], default: [] },
    thursday: { type: [String], default: [] },
    friday: { type: [String], default: [] },
    saturday: { type: [String], default: [] },
    sunday: { type: [String], default: [] },
  },
  rating: {
    type: Number,
    default: 5.0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  awards: {
    type: [String],
    default: [],
  },
  publications: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);