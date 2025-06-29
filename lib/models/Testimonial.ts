import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientImage: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);