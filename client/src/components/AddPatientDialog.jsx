import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import axios from "axios";
import { calculateEDD } from "../utils/calulateEOD";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AddPatientDialog({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    village: "",
    age: "",
    mobile: "",
    lmpDate: "",
    expectedDeliveryDate: "",
    reminderDay: "",
    deliveryNo: 1,
    deliveryStatus: "Pending",     // NEW FIELD
    vaccination: "T1"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    if (name === "lmpDate") next.expectedDeliveryDate = calculateEDD(value);
    setForm(next);
  };
  const isValidMobile = /^[0-9]{10}$/.test(form.mobile);

  const submit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE}/api/patients`, form, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      onClose(true);
    } catch (err) {
      console.error(err);
      onClose(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Patient</DialogTitle>

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

        {/* NEW DROPDOWN */}
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
        <Button variant="contained" onClick={submit} disabled={!isValidMobile}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
