import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Grid, Typography, Button, TextField, Card, CardContent,
  Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton,
  TableContainer, TableSortLabel, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AddPatientDialog from "../components/AddPatientDialog";
import EditPatientDialog from "../components/EditPatientDialog";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";


function Dashboard({ username, onLogout }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tempFrom, setTempFrom] = useState("");
  const [tempTo, setTempTo] = useState("");
  const [sortBy, setSortBy] = useState({ field: "name", dir: "asc" });
  const [addOpen, setAddOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  // load patients
  const loadPatients = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE}/api/patients`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    setPatients(res.data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // Delete API with confirm
  const doDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE}/api/patients/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    setDeleteConfirm({ open: false, id: null });
    loadPatients();
  };

  const totalDeliveries = patients.filter(p => p.deliveryStatus === "Done").length;
  const totalPatients = patients.length;

  // filters: note dateFrom/dateTo apply only to EDD
  const filtered = useMemo(() => {
    return patients
      .filter((p) => {
        const q = search.trim().toLowerCase();
        const nameMatch = p.name?.toLowerCase().includes(q);
        const villageMatch = p.village?.toLowerCase().includes(q);

        // EDD date filter
        let fromOk = true, toOk = true;
        if (dateFrom) {
          fromOk = new Date(p.expectedDeliveryDate) >= new Date(dateFrom);
        }
        if (dateTo) {
          toOk = new Date(p.expectedDeliveryDate) <= new Date(dateTo);
        }

        return (q === "" ? true : (nameMatch || villageMatch)) && fromOk && toOk;
      })
      .sort((a, b) => {
        const dir = sortBy.dir === "asc" ? 1 : -1;
        let av = a[sortBy.field], bv = b[sortBy.field];
        if (sortBy.field === "expectedDeliveryDate" || sortBy.field === "lmpDate") {
          av = new Date(av); bv = new Date(bv);
        } else if (typeof av === "string") {
          av = av.toLowerCase(); bv = bv.toLowerCase();
        }
        if (av > bv) return dir;
        if (av < bv) return -dir;
        return 0;
      });
  }, [patients, search, dateFrom, dateTo, sortBy]);

  const handleSort = (field) => {
    setSortBy((s) => ({
      field,
      dir: s.field === field ? (s.dir === "asc" ? "desc" : "asc") : "asc"
    }));
  };

  // when add dialog closes with added => refresh
  const onAddClose = (added) => {
    setAddOpen(false);
    if (added) loadPatients();
  };

  // when edit dialog closes with updated => refresh
  const onEditClose = (updated) => {
    setEditPatient(null);
    if (updated) loadPatients();
  };

  // apply temporary date pickers to active filter
  const applyDateFilter = () => {
    setDateFrom(tempFrom);
    setDateTo(tempTo);
  };
  const clearDateFilter = () => {
    setTempFrom("");
    setTempTo("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={onLogout}>LOGOUT</Button>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Card sx={{ background: "#ef5350", color: "white" }}>
              <CardContent>
                <Typography>Total Deliveries</Typography>
                <Typography variant="h4">{totalDeliveries}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card sx={{ background: "#ef5350", color: "white" }}>
              <CardContent>
                <Typography>Total Patients</Typography>
                <Typography variant="h4">{totalPatients}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* spacer to push date inputs right */}
          <Grid item xs />

          {/* date filters (right side) */}
          <Grid item>
            <Typography variant="caption" display="block">Date From (EDD)</Typography>
            <TextField
              type="date"
              value={tempFrom}
              onChange={(e) => setTempFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>

          <Grid item>
            <Typography variant="caption" display="block">Date To (EDD)</Typography>
            <TextField
              type="date"
              value={tempTo}
              onChange={(e) => setTempTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={applyDateFilter}>Apply</Button>
          </Grid>

          <Grid item>
            <Button variant="outlined" onClick={clearDateFilter}>Clear</Button>
          </Grid>
        </Grid>
      </Box>

      {/* Search and Add button row */}
      <Box sx={{ mt: 3, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          placeholder="Search by Name or Village"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, maxWidth: 700 }}
          size="small"
        />

        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setAddOpen(true)}>Add New Patient</Button>
      </Box>

      {/* Table with scroll + sorting */}
      <Paper variant="outlined">
        <TableContainer sx={{ maxHeight: 360 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={sortBy.field === "name" ? sortBy.dir : false}>
                  <TableSortLabel active={sortBy.field === "name"} direction={sortBy.dir} onClick={() => handleSort("name")}>Name</TableSortLabel>
                </TableCell>
                <TableCell><TableSortLabel active={sortBy.field === "village"} direction={sortBy.dir} onClick={() => handleSort("village")}>Village</TableSortLabel></TableCell>
                <TableCell><TableSortLabel active={sortBy.field === "age"} direction={sortBy.dir} onClick={() => handleSort("age")}>Age</TableSortLabel></TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell sortDirection={sortBy.field === "lmpDate" ? sortBy.dir : false}>
                  <TableSortLabel active={sortBy.field === "lmpDate"} direction={sortBy.dir} onClick={() => handleSort("lmpDate")}>LMP Date</TableSortLabel>
                </TableCell>
                <TableCell sortDirection={sortBy.field === "expectedDeliveryDate" ? sortBy.dir : false}>
                  <TableSortLabel active={sortBy.field === "expectedDeliveryDate"} direction={sortBy.dir} onClick={() => handleSort("expectedDeliveryDate")}>EDD</TableSortLabel>
                </TableCell>
                <TableCell>Visit Status</TableCell>
                <TableCell>Vaccination</TableCell>
                <TableCell>Delivery Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p._id} hover>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.village}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.mobile}</TableCell>
                  <TableCell>{p.lmpDate ? new Date(p.lmpDate).toLocaleDateString() : ""}</TableCell>
                  <TableCell>{p.expectedDeliveryDate ? new Date(p.expectedDeliveryDate).toLocaleDateString() : ""}</TableCell>
                  <TableCell>{p.visitStatus}</TableCell>
                  <TableCell>{p.vaccination}</TableCell>
                  <TableCell>{p.deliveryStatus}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => setEditPatient(p)}><EditIcon fontSize="small" color="primary" /></IconButton>
                    <IconButton size="small" onClick={() => setDeleteConfirm({ open: true, id: p._id })}><DeleteIcon fontSize="small" color="error" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this patient?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>No</Button>
          <Button color="error" onClick={() => doDelete(deleteConfirm.id)}>Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Add / Edit dialogs */}
      <AddPatientDialog open={addOpen} onClose={onAddClose} />
      <EditPatientDialog patient={editPatient} onClose={onEditClose} />
    </Box>
  );
}

export default Dashboard;
