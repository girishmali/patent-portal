import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/users/login`, { username, password });
      const { token, username: returnedUsername } = res.data;
      // store token and inform parent
      onLogin({ token, username: returnedUsername });
    } catch (err) {
      console.error(err?.response?.data || err);
      setError(err?.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 8, p: 2, boxShadow: 3 }}>
      <CardContent sx={{ textAlign: "center" }}>

{/* Logo */}
    <img 
      src="/logo.jpeg"          // <-- place your logo inside public/logo.png
      alt="Janani Logo"
      style={{
        width: 90,
        height: 90,
        borderRadius: 12,      // rounded square
        objectFit: "cover",
        marginBottom: 16
      }}
    />

    {/* Gujarati Title */}
    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
      જનની ગાયનેક હોસ્પિટલ
    </Typography>

        {/*<Typography variant="h5" gutterBottom>
          Login
        </Typography>*/}
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
