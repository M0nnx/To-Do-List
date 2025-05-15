import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, MenuItem,Select
} from '@mui/material';
import { editarTarea, borrarTarea, crearTarea } from '../services/tareasservice';

export default function TablaTareas({ tareas = [], onTareasActualizadas }) {
  const [openEditar, setOpenEditar] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [openConfirmarBorrado, setOpenConfirmarBorrado] = useState(false);
  const [tareaActual, setTareaActual] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', prioridad: '', estado: '' });
  const [idAEliminar, setIdAEliminar] = useState(null);

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
    setNuevaTarea({ titulo: '', descripcion: '', prioridad: '', estado: '' });
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

  const handleChange = (e) => {
    setTareaActual({
      ...tareaActual,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAbrirCrear} style={{ marginBottom: 16 }}>
        Crear Tarea
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
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
                  <Button onClick={() => handleEditarClick(tarea)}>Editar</Button>
                  <Button color="error" onClick={() => handleSolicitarBorrado(tarea.id)}>Borrar</Button>
                </TableCell>
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
            value={tareaActual?.estado || ''}
            onChange={handleChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="en progreso">En Progreso</MenuItem>
            <MenuItem value="completada">Completada</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarEditar}>Cancelar</Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogActions>
      </Dialog>

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
            value={tareaActual?.estado || ''}
            onChange={handleChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="en progreso">En Progreso</MenuItem>
            <MenuItem value="completada">Completada</MenuItem>
          </Select>
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
