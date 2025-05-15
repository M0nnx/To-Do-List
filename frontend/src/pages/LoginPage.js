import React, { useState } from 'react';
import { login, getPerfil } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TextField, Button, Card, Typography } from '@mui/material';

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(form);
      const perfil = await getPerfil();
      Cookies.set('rol', perfil.rol); 
      if (perfil.rol === 'admin') {
        navigate('/admin'); 
      } else {
        navigate('/perfil');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Usuario o contraseña incorrectas');
    }
  };

  return (
    <Card sx={{ padding: 4, maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4">Iniciar sesión</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextField 
          type="text" 
          name="username" 
          label="Usuario" 
          value={form.username} 
          onChange={handleChange} 
          fullWidth 
        />
        <TextField 
          type="password" 
          name="password" 
          label="Contraseña" 
          value={form.password} 
          onChange={handleChange} 
          fullWidth 
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">Ingresar</Button>
      </form>
    </Card>
  );
}

export default LoginPage;
