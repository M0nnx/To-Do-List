import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL2 = 'http://localhost:8000/usuarios/';

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

export const editarUsuario = async (id, datosActualizar) => {
  const token = Cookies.get('access');
  try {
    const response = await axios.put(
      `${API_URL2}editar/${id}/`,
      datosActualizar,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al editar usuario:', error.response?.data || error.message);
    throw error;
  }
};

export const borrarUsuario = async (id) => {
  const token = Cookies.get('access');
  try {
    const response = await axios.delete(`${API_URL2}borrar/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al borrar usuario:', error.response?.data || error.message);
    throw error;
  }
};