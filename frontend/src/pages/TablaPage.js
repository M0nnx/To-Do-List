import React, { useEffect, useState } from 'react';
import TablaTareas from '../components/tabla';
import { obtenerTareas } from '../services/tareaService';

function TablaPage() {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = async () => {
    try {
      const data = await obtenerTareas();
      console.log("📌 Tareas obtenidas en TablaPage:", data);
      setTareas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <div>
      <h1 className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider' style={{ textAlign: 'center' }}>Lista de Tareas</h1>
      <TablaTareas tareas={tareas} onTareasActualizadas={cargarTareas} />
    </div>
  );
}

export default TablaPage;
