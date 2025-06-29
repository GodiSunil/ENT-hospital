import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  patientAge: {
    type: Number,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    default: '',
  },
  isFirstVisit: {
    type: Boolean,
    default: true,
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },
  insurance: {
    provider: String,
    policyNumber: String,
  },
  preferredLanguage: {
    type: String,
    default: 'English',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);