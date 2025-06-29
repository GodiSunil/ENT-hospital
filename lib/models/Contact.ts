import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  inquiryType: {
    type: String,
    enum: ['general', 'appointment', 'emergency', 'insurance', 'feedback'],
    default: 'general',
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new',
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal',
  },
  response: {
    type: String,
    default: '',
  },
  respondedAt: {
    type: Date,
  },
  respondedBy: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);