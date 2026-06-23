import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  createdAt: { type: Date, default: Date.now },
});

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model('Appointment', AppointmentSchema);