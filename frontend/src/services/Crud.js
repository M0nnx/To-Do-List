import axios from 'axios';
import { getAccessToken } from './authService';

const API_URL = 'http://localhost:8000/api/';

export const obtenerPerfil = async () => {
  const token = getAccessToken();
  const res = await axios.get(`${API_URL}user/perfil/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
