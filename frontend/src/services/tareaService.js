import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://127.0.0.1:8000/tareas/";

const getAuthHeader = () => {
  const token = Cookies.get('access');
  if (!token) {
    console.warn("Token no encontrado. El usuario no está autenticado.");
    return null;
  }
  return { Authorization: `Bearer ${token}` };
};

const getTokenHeader = () => {
  const token = Cookies.get('access');
  if (!token) throw new Error('No token found');
  return { Authorization: `Bearer ${token}` };
};




// Obtener Tareas
export const obtenerTareas = async () => {
  const token = Cookies.get('access');
  if (!token) {
    console.warn('No token found, usuario no autenticado');
    return null;
  }

  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error('Error al obtener tareas:', err.response?.data || err.message);
    return { error: 'No se pudieron obtener las tareas' };
  }
};

// Borrar una tarea
export const borrarTarea = async (id) => {
  const headers = getAuthHeader();
  if (!headers) return false;

  try {
    const response = await axios.delete(`${BASE_URL}borrar/${id}`, { headers });
    console.log(`Tarea ${id} eliminada:`, response.data);
    return true;
  } catch (err) {
    console.error(`Error al borrar tarea ${id}:`, err.response?.data || err.message);
    return false;
  }
};

// Editar una tarea
export const editarTarea = async (id, datosTarea) => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await axios.patch(`${BASE_URL}editar/${id}`, datosTarea, { headers });
    console.log(`Tarea ${id} editada:`, response.data);
    return response.data;
  } catch (err) {
    console.error(`Error al editar tarea ${id}:`, err.response?.data || err.message);
    return null;
  }
};


// Crear una tarea
export const crearTarea = async (datosTarea) => {
  const headers = getAuthHeader();
  if (!headers) return false;

  try {
    const response = await axios.post(`${BASE_URL}crear`, datosTarea, { headers });
    console.log(`📌 Tarea creada:`, response.data);
    return true;
  } catch (err) {
    console.error(`❌ Error al crear la tarea:`, err.response?.data || err.message);
    return false;
  }
};


export const actualizarTarea = async (tareaId, data) => {
  try {
    const response = await axios.put(`${BASE_URL}tareas/${tareaId}/`, data, {
      headers: getTokenHeader(),
    });
    return response.data;
  } catch (err) {
    console.error('Update tarea error:', err.response?.data || err.message);
    throw new Error('Failed to update tarea');
  }
};
