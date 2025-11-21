import React, { useState } from "react";
import { TextField, Button, Grid, Select, MenuItem } from "@mui/material";
import { calculateEDD } from "../utils/calulateEOD";

const EntryForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    village: "",
    age: "",
    mobile: "",
    lmpDate: "",
    reminderDay: "",
    expectedDeliveryDate: "",
    deliveryNo: "",
    visitStatus: "No",
    vaccination: "T1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let update = { [name]: value };

    if (name === "lmpDate") update.expectedDeliveryDate = calculateEDD(value);

    setForm({ ...form, ...update });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <Grid container spacing={2}>
        
        <Grid item xs={6}>
          <TextField fullWidth label="Name" name="name" onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="Village" name="village" onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="Age" name="age" type="number" onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="Mobile" name="mobile" onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth type="date" name="lmpDate" onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth type="date" name="expectedDeliveryDate" value={form.expectedDeliveryDate} readOnly />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="Reminder Day" name="reminderDay" type="number" onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="Delivery No" name="deliveryNo" type="number" onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
          <Select fullWidth name="visitStatus" value={form.visitStatus} onChange={handleChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={6}>
          <Select fullWidth name="vaccination" value={form.vaccination} onChange={handleChange}>
            <MenuItem value="T1">T1</MenuItem>
            <MenuItem value="T2">T2</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>Submit</Button>
        </Grid>

      </Grid>
    </form>
  );
};

export default EntryForm;
