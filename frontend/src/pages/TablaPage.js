import React, { useEffect, useState } from 'react';
import TablaCliente from '../components/TareasCliente';
import TablaAdmin from '../components/tablaAdmin';    
import { obtenerTareas } from '../services/tareaService';
import { getPerfil } from '../services/authService';

function TablaPage() {
  const [tareas, setTareas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarTareas = async () => {
    try {
      const data = await obtenerTareas();
      setTareas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfil = await getPerfil();
        setUsuario(perfil);
        await cargarTareas();
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1 className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider' style={{ textAlign: 'center' }}>
        Lista de Tareas
      </h1>

      {usuario?.rol === 'admin' ? (
        <TablaCliente tareas={tareas} onTareasActualizadas={cargarTareas} />
      ) : (
        <TablaCliente tareas={tareas} onTareasActualizadas={cargarTareas} />
      )}
    </div>
  );
}

export default TablaPage;
