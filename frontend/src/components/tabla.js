import React, { useState, useEffect } from 'react';
import { editarTarea, borrarTarea, crearTarea } from '../services/tareaService';
import { getPerfil, obtenerUsuarios } from '../services/authService';


export default function TablaTareas({ tareas = [], onTareasActualizadas }) {
  const [openEditar, setOpenEditar] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [openConfirmarBorrado, setOpenConfirmarBorrado] = useState(false);
  const [tareaActual, setTareaActual] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', prioridad: '', estado: '', fecha_vencimiento: '', username: '', usuario_id: '' });
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfil = await getPerfil();
        setUsuario(perfil);

        const lista = await obtenerUsuarios();
        setUsuarios(Array.isArray(lista) ? lista : []);
      } catch {
        setUsuario(null);
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
  }, []); 

  if (loading) return <p className="text-center py-4">Cargando...</p>;

  const handleEditarClick = (tarea) => {
    setTareaActual(tarea);
    setOpenEditar(true);
  };

  const handleCerrarEditar = () => {
    setOpenEditar(false);
    setTareaActual(null);
  };

  const handleGuardar = async () => {
    if (tareaActual) {
      await editarTarea(tareaActual.id, tareaActual);
      await onTareasActualizadas();
      handleCerrarEditar();
    }
  };

  const handleAbrirCrear = () => {
    setNuevaTarea({ titulo: '', descripcion: '', prioridad: '', estado: '', fecha_vencimiento: '', username: '', usuario_id: '' });
    setOpenCrear(true);
  };

  const handleCerrarCrear = () => {
    setOpenCrear(false);
  };

  const handleCrear = async () => {
    await crearTarea(nuevaTarea);
    await onTareasActualizadas();
    handleCerrarCrear();
  };

  const handleSolicitarBorrado = (id) => {
    setIdAEliminar(id);
    setOpenConfirmarBorrado(true);
  };

  const handleConfirmarBorrado = async () => {
    await borrarTarea(idAEliminar);
    await onTareasActualizadas();
    setOpenConfirmarBorrado(false);
    setIdAEliminar(null);
  };

  const handleCancelarBorrado = () => {
    setOpenConfirmarBorrado(false);
    setIdAEliminar(null);
  };

  const handleChangeEditar = (e) => {
    setTareaActual({
      ...tareaActual,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeCrear = (e) => {
    const { name, value } = e.target;
    console.log(`Cambio en ${name}:`, value);
    setNuevaTarea({
      ...nuevaTarea,
      [name]: value,
    });
  };

  return (
    <>
      {usuario?.rol === 'admin' && (
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mb-4 transition duration-200"
          onClick={handleAbrirCrear}
        >
          Crear Tarea
        </button>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Prioridad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Encargado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Fecha Vencimiento</th>
              {usuario?.rol === 'admin' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tareas.map((tarea) => (
              <tr key={tarea.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tarea.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tarea.titulo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{tarea.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tarea.prioridad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-6 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${tarea.estado === 'completa' ? 'bg-green-100 text-green-800' : 
                      tarea.estado === 'en progreso' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {tarea.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tarea.usuario.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tarea.fecha_vencimiento
                    ? new Date(tarea.fecha_vencimiento).toLocaleString('es-CL', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    : ''}
                </td>
                {usuario?.rol === 'admin' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditarClick(tarea)} className="text-blue-600 hover:text-blue-900 mr-3">
                      Editar
                    </button>
                    <button onClick={() => handleSolicitarBorrado(tarea.id)} className="text-red-600 hover:text-red-900">
                      Borrar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edición */}
      {openEditar && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Tarea</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                    value={tareaActual?.titulo || ''}
                    onChange={handleChangeEditar}
                  />
                </div>
                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    name="descripcion"
                    id="descripcion"
                    rows="3"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                    value={tareaActual?.descripcion || ''}
                    onChange={handleChangeEditar}
                  />
                </div>
                <div>
                  <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Prioridad</label>
                  <input
                    type="number"
                    name="prioridad"
                    id="prioridad"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                    value={tareaActual?.prioridad || ''}
                    onChange={handleChangeEditar}
                  />
                </div>
                <div>
                  <label htmlFor="usuario_id" className="block text-sm font-medium text-gray-700">Usuario encargado</label>
                  <select
                    id="usuario_id"
                    name="usuario_id"
                    className="mt-1 block w-96 h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={tareaActual?.usuario_id || ''}
                    onChange={handleChangeEditar}
                  >
                    <option value="" disabled>Seleccione un usuario</option>
                    {usuarios.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    className="mt-1 block w-96 h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={tareaActual?.estado || ''}
                    onChange={handleChangeEditar}
                  >
                    <option value="" disabled>Seleccione un estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completa">Completa</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fecha_vencimiento" className="block text-sm font-medium text-gray-700">Fecha Vencimiento</label>
                  <input
                    type="datetime-local"
                    name="fecha_vencimiento"
                    id="fecha_vencimiento"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                    value={tareaActual?.fecha_vencimiento ? tareaActual.fecha_vencimiento.slice(0, 16) : ''}
                    onChange={handleChangeEditar}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleCerrarEditar}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleGuardar}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Creación */}
      {openCrear && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Crear Tarea</h3>
              <div className="space-y-4">
              <div >
                  <label htmlFor="titulo-nuevo" className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                      type="text"
                      name="titulo"
                      id="titulo-nuevo"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                      value={nuevaTarea.titulo}
                      onChange={handleChangeCrear}
                  />
              </div>
                <div>
                  <label htmlFor="descripcion-nuevo" className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    name="descripcion"
                    id="descripcion-nuevo"
                    rows="3"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                    value={nuevaTarea.descripcion}
                    onChange={handleChangeCrear}
                  />
                </div>
                <div>
                  <label htmlFor="prioridad-nuevo" className="block text-sm font-medium text-gray-700">Prioridad</label>
                  <input
                    type="number"
                    name="prioridad"
                    id="prioridad-nuevo"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                    value={nuevaTarea.prioridad}
                    onChange={handleChangeCrear}
                  />
                </div>
                <div>
                  <label htmlFor="usuario_id-nuevo" className="block text-sm font-medium text-gray-700">Usuario encargado</label>
                  <select
                    id="usuario_id-nuevo"
                    name="usuario_id"
                    className="mt-1 block w-96 h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={nuevaTarea.usuario_id || ''}
                    onChange={handleChangeCrear}
                  >
                    <option value="" disabled>Seleccione un usuario</option>
                    {usuarios.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="estado-nuevo" className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    id="estado-nuevo"
                    name="estado"
                    className="mt-1 block w-96 h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={nuevaTarea.estado}
                    onChange={handleChangeCrear}
                  >
                    <option value="" disabled>Seleccione un estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completa">Completa</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fecha_vencimiento-nuevo" className="block text-sm font-medium text-gray-700">Fecha Vencimiento</label>
                  <input
                    type="datetime-local"
                    name="fecha_vencimiento"
                    id="fecha_vencimiento-nuevo"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                    value={nuevaTarea.fecha_vencimiento}
                    onChange={handleChangeCrear}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleCerrarCrear}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleCrear}
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Borrado */}
      {openConfirmarBorrado && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">¿Confirmar eliminación?</h3>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleCancelarBorrado}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={handleConfirmarBorrado}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}