import React, { useEffect, useState } from 'react';
import { getPerfil } from '../services/authService';

function PerfilPage() {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getPerfil();
        setPerfil(data);
      } catch (err) {
        setError('Error al obtener el perfil');
      }
    };

    fetchPerfil();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!perfil) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p><strong>Usuario:</strong> {perfil.usuario}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
      <p><strong>Rol:</strong> {perfil.rol}</p>
    </div>
  );
}

export default PerfilPage;