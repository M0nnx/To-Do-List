import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://127.0.0.1:8000";

const getAuthHeader = () => {
  const token = Cookies.get('access');
  if (!token) {
    console.warn("Token no encontrado. El usuario no está autenticado.");
    return null;
  }
  return { Authorization: `Bearer ${token}` };
};

// Obtener todas las tareas
export const obtenerTareas = async () => {
  const headers = getAuthHeader();
  if (!headers) return [];

  try {
    const response = await axios.get(`${BASE_URL}/tareas/`, { headers });
    console.log("Tareas obtenidas:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error("Error al obtener tareas:", err.response?.data || err.message);
    return [];
  }
};

// Borrar una tarea
export const borrarTarea = async (id) => {
  const headers = getAuthHeader();
  if (!headers) return false;

  try {
    const response = await axios.delete(`${BASE_URL}/tareas/borrar/${id}`, { headers });
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
    const response = await axios.patch(`${BASE_URL}/tareas/editar/${id}`, datosTarea, { headers });
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
    const response = await axios.post(`${BASE_URL}/tareas/crear`, datosTarea, { headers });
    console.log(`📌 Tarea creada:`, response.data);
    return true;
  } catch (err) {
    console.error(`❌ Error al crear la tarea:`, err.response?.data || err.message);
    return false;
  }
};