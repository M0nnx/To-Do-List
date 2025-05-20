import React, { useEffect, useState } from 'react';
import { getPerfil } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function PerfilPage() {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getPerfil();
        setPerfil(data);
      } catch (err) {
        console.error("Error al obtener el perfil:", err);
        if (err.response && err.response.status === 401) {
          setError('Sesión expirada o no autorizado. Redirigiendo al login...');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setError('Error al obtener el perfil. Inténtalo de nuevo más tarde.');
        }
      }
    };

    fetchPerfil();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!perfil) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p><strong>Usuario:</strong> {perfil.usuario}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
      <p><strong>Rol:</strong> {perfil.rol}</p>

      <h2>Opciones del Perfil</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: 'auto' }}>
        <button onClick={() => navigate('/Tabla')}>
          Ver Mis Tareas Admin
        </button>
        <button onClick={() => navigate('/registro')}>
          Registrarme
        </button>
        <button onClick={() => navigate('/settings')}>
          Ver Mis Tareas
        </button>
        <button onClick={() => navigate('/notifications')}>
          Notificaciones
        </button>
      </div>
    </div>
  );
}

export default PerfilPage;