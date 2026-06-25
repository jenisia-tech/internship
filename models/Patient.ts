import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },

  symptoms: {
    type: String,
    default: "",
  },

  medicalHistory: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);