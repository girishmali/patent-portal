import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  village: String,
  age: Number,
  mobile: String,
  lmpDate: Date,
  reminderDay: Number,
  expectedDeliveryDate: Date,
  deliveryNo: Number,
  visitStatus: { type: String, enum: ["Yes", "No"], default: "No" },
  vaccination: { type: String, enum: ["T1", "T2"], default: "T1" },
  deliveryStatus: { type: String, enum: ["Done", "Pending"], default: "Pending" } // NEW FIELD
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
