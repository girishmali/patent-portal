import express from "express";
import Patient from "../models/Patient.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create patient
router.post("/", auth, async (req, res) => {
  const p = new Patient(req.body);
  await p.save();
  res.status(201).json(p);
});

// List all
router.get("/", auth, async (req, res) => {
  const data = await Patient.find().sort({ createdAt: -1 });
  res.json(data);
});

// Get one
router.get("/:id", auth, async (req, res) => {
  const data = await Patient.findById(req.params.id);
  res.json(data);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const data = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
