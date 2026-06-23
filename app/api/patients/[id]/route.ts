import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

export const Patient =
  mongoose.models.Patient ||
  mongoose.model('Patient', PatientSchema);