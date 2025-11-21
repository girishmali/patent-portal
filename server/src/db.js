import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
// || 'mongodb://127.0.0.1:27017/patient_portal_local'

export async function connectDB() {
  try {
    console.log(MONGO_URI)
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Mongo connection error', err);
    process.exit(1);
  }
}