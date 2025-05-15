import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography } from '@mui/material';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form);
      alert('Usuario creado correctamente');
      navigate('/login');
    } catch (err) {
      alert('Error en el registro: ' + err.message);
    }
  };

  return (
    <Card sx={{ padding: 4, maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4">Registro</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextField name="username" label="Nombre de usuario" value={form.username} onChange={handleChange} fullWidth />
        <TextField type="email" name="email" label="Correo electrónico" value={form.email} onChange={handleChange} fullWidth />
        <TextField type="password" name="password" label="Contraseña" value={form.password} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">Registrarse</Button>
      </form>
    </Card>
  );
}

export default RegisterPage;
