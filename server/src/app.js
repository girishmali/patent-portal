import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './db.js';
import usersRouter from './routes/users.js';
import patientsRouter from "./routes/patients.js";

// start DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// mount
app.use('/api/users', usersRouter);
app.use("/api/patients", patientsRouter);

app.listen(5000, () => console.log("Server running on 5000"));