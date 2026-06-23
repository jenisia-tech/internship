import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Doctor =
  mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);