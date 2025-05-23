import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000/api/';
const API_URL2 = 'http://localhost:8000/usuarios/';


// Función para iniciar sesión
export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}login/`, formData);
    const { access, refresh } = response.data;

    Cookies.set('access', access, { expires: 1 });
    Cookies.set('refresh', refresh, { expires: 7 });
  } catch (err) {
    console.error('Login error:', err.response ? err.response.data : err.message);
    throw new Error('Login failed');
  }
};

// Función para registrarse
export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL2}registro/`, formData);
    return response.data;
  } catch (err) {
    console.error('Register error:', err.response ? err.response.data : err.message);
    throw new Error('Registration failed');
  }
};

// Función para ver el perfil 
export const getPerfil = async () => {
  const token = Cookies.get('access');
  if (!token) throw new Error('No token found');
  try {
    const response = await axios.get(`${API_URL2}perfil/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error('Get perfil error:', err.response ? err.response.data : err.message);
    throw new Error('Failed to fetch perfil');
  }
};
export const obtenerUsuarios = async () => {
  const token = Cookies.get('access');
  if (!token) {
    console.warn('No token found, usuario no autenticado');
    return null;
  }
  try {
    const response = await axios.get(`${API_URL2}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error('Error al obtener usuarios:', err.response?.data || err.message);
    return [];
  }
};