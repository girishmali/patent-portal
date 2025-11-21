import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import axios from "axios";
import { calculateEDD } from "../utils/calulateEOD";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function EditPatientDialog({ patient, onClose }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name || "",
        village: patient.village || "",
        age: patient.age || "",
        mobile: patient.mobile || "",
        lmpDate: patient.lmpDate ? new Date(patient.lmpDate).toISOString().split("T")[0] : "",
        expectedDeliveryDate: patient.expectedDeliveryDate ? new Date(patient.expectedDeliveryDate).toISOString().split("T")[0] : "",
        reminderDay: patient.reminderDay || "",
        deliveryNo: patient.deliveryNo || 1,
        visitStatus: patient.visitStatus || "No",
        vaccination: patient.vaccination || "T1",
        deliveryStatus: patient.deliveryStatus || "Pending"     // NEW FIELD
      });
    } else setForm(null);
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    if (name === "lmpDate") next.expectedDeliveryDate = calculateEDD(value);
    setForm(next);
  };

  const submit = async () => {
    const token = localStorage.getItem("token");
    await axios.put(`${API_BASE}/api/patients/${patient._id}`, form, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    onClose(true);
  };

  if (!form) return null;

  return (
    <Dialog open={!!patient} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Update Patient</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />

        <TextField label="Village" name="village" value={form.village} onChange={handleChange} fullWidth />

        <TextField label="Age" name="age" type="number" value={form.age} onChange={handleChange} fullWidth />

        <TextField label="Mobile" name="mobile" value={form.mobile} onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      handleChange({ target: { name: "mobile", value } });
    }
  }}
  error={form.mobile.length > 0 && form.mobile.length !== 10}
  helperText={
    form.mobile.length > 0 && form.mobile.length !== 10
      ? "Mobile number must be 10 digits"
      : ""
  }
  inputProps={{ maxLength: 10 }} fullWidth />

        <TextField label="LMP Date" type="date" name="lmpDate" InputLabelProps={{ shrink: true }} value={form.lmpDate} onChange={handleChange} fullWidth />

        <TextField label="Expected Delivery Date" type="date" name="expectedDeliveryDate" InputLabelProps={{ shrink: true }} value={form.expectedDeliveryDate} readOnly fullWidth />

        <TextField label="Reminder Day" name="reminderDay" value={form.reminderDay} onChange={handleChange} fullWidth />

        <TextField label="Delivery No" name="deliveryNo" type="number" value={form.deliveryNo} onChange={handleChange} fullWidth />

        <FormControl fullWidth>
          <InputLabel>Visit Status</InputLabel>
          <Select label="Visit Status" name="visitStatus" value={form.visitStatus} onChange={handleChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Vaccination</InputLabel>
          <Select label="Vaccination" name="vaccination" value={form.vaccination} onChange={handleChange}>
            <MenuItem value="T1">T1</MenuItem>
            <MenuItem value="T2">T2</MenuItem>
          </Select>
        </FormControl>

        {/* NEW FIELD */}
        <FormControl fullWidth>
          <InputLabel>Delivery Status</InputLabel>
          <Select label="Delivery Status" name="deliveryStatus" value={form.deliveryStatus} onChange={handleChange}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>

      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button variant="contained" onClick={submit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
