import React from "react";
import { TextField, Button } from "@mui/material";

const PatientTable = ({ data, onEdit, onDelete, search, setSearch }) => {
  return (
    <>
      <TextField
        placeholder="Search by Name / Village"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Village</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Vaccination</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.village}</td>
              <td>{p.mobile}</td>
              <td>{p.visitStatus}</td>
              <td>{p.vaccination}</td>
              <td>
                <Button onClick={() => onEdit(p)}>Edit</Button>
                <Button color="error" onClick={() => onDelete(p._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PatientTable;
