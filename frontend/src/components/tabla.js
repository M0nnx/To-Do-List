import React, { useState,useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, MenuItem,Select
} from '@mui/material';
import { editarTarea, borrarTarea, crearTarea } from '../services/tareasservice';
import { getPerfil } from '../services/authService';

export default function TablaTareas({ tareas = [], onTareasActualizadas }) {
  const [openEditar, setOpenEditar] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [openConfirmarBorrado, setOpenConfirmarBorrado] = useState(false);
  const [tareaActual, setTareaActual] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', prioridad: '', estado: '',fecha_vencimiento: '' });
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    getPerfil()
      .then(data => {
        setUsuario(data);
      })
      .catch(() => {
        setUsuario(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
   if (loading) return <p>Cargando...</p>;

  // Edición
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

  // Creación
  const handleAbrirCrear = () => {
    setNuevaTarea({ titulo: '', descripcion: '', prioridad: '', estado: '',fecha_vencimiento: '' });
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

  // Borrado
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

  // Cambios en formularios
  const handleChangeEditar = (e) => {
    setTareaActual({
      ...tareaActual,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCrear = (e) => {
    setNuevaTarea({
      ...nuevaTarea,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {usuario?.rol === 'admin' && (          
    <Button variant="contained" color="primary" onClick={handleAbrirCrear} style={{ marginBottom: 16 }}>
      Crear Tarea
    </Button> 
    )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Vencimiento</TableCell>
              {usuario?.rol === 'admin' && (
                <TableCell>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tareas.map((tarea) => (
              <TableRow key={tarea.id}>
                <TableCell>{tarea.id}</TableCell>
                <TableCell>{tarea.titulo}</TableCell>
                <TableCell>{tarea.descripcion}</TableCell>
                <TableCell>{tarea.prioridad}</TableCell>
                <TableCell>{tarea.estado}</TableCell>
                <TableCell>
                  {tarea.fecha_vencimiento
                    ? new Date(tarea.fecha_vencimiento).toLocaleString('es-CL', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </TableCell>
                {usuario?.rol === 'admin' && (    
                <TableCell>
                  <Button onClick={() => handleEditarClick(tarea)}>Editar</Button>
                  <Button color="error" onClick={() => handleSolicitarBorrado(tarea.id)}>Borrar</Button>
                </TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditar} onClose={handleCerrarEditar}>
        <DialogTitle>Editar Tarea</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            value={tareaActual?.titulo || ''}
            onChange={handleChangeEditar}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            value={tareaActual?.descripcion || ''}
            onChange={handleChangeEditar}
            fullWidth
          />
          <TextField
            type='number'
            margin="dense"
            label="Prioridad"
            name="prioridad"
            value={tareaActual?.prioridad || ''}
            onChange={handleChangeEditar}
            fullWidth
          />
          <Select
            label="Estado"
            name="estado"
            value={nuevaTarea.estado}
            onChange={handleChangeCrear}
            fullWidth
            margin="dense"
            displayEmpty
          >
                <MenuItem value="" disabled>
                  Seleccione un estado
                </MenuItem>
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="en progreso">En Progreso</MenuItem>
                <MenuItem value="completada">Completada</MenuItem>
              </Select>
            <TextField
              margin="dense"
              label="Fecha Vencimiento"
              name="fecha_vencimiento"
              type="datetime-local"
              value={tareaActual?.fecha_vencimiento ? tareaActual.fecha_vencimiento.slice(0, 16) : ''}
              onChange={handleChangeEditar}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarEditar}>Cancelar</Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogActions>
      </Dialog>

       {/*Crear tarea*/}
      <Dialog open={openCrear} onClose={handleCerrarCrear}>
        <DialogTitle>Crear Tarea</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            value={nuevaTarea.titulo}
            onChange={handleChangeCrear}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            value={nuevaTarea.descripcion}
            onChange={handleChangeCrear}
            fullWidth
          />
          <TextField
            type='number'
            margin="dense"
            label="Prioridad"
            name="prioridad"
            value={nuevaTarea.prioridad}
            onChange={handleChangeCrear}
            fullWidth
          />
            <Select
              label="Estado"
              name="estado"
              value={nuevaTarea.estado}
              onChange={handleChangeCrear}
              fullWidth
              margin="dense"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione un estado
              </MenuItem>
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="en progreso">En Progreso</MenuItem>
              <MenuItem value="completada">Completada</MenuItem>
            </Select>
            <TextField
              margin="dense"
              label="Fecha Vencimiento"
              name="fecha_vencimiento"
              type="datetime-local"
              value={nuevaTarea.fecha_vencimiento}
              onChange={handleChangeCrear}
              fullWidth
              InputLabelProps={{ shrink: true }} // para que el label no se superponga al valor
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarCrear}>Cancelar</Button>
          <Button onClick={handleCrear}>Crear</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmarBorrado} onClose={handleCancelarBorrado}>
        <DialogTitle>¿Confirmar eliminación?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelarBorrado}>Cancelar</Button>
          <Button color="error" onClick={handleConfirmarBorrado}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
