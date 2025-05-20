# 📋 Sistema de Gestión de Usuarios y Tareas para Empleados

Este proyecto está diseñado para facilitar la **administración, asignación y seguimiento de tareas** en una organización, asegurando un control de acceso robusto mediante **roles diferenciados**.  
Es ideal para empresas que buscan mejorar su planificación interna, la supervisión de tareas y la eficiencia del equipo.

---

## 🚀 Tecnologías utilizadas

### Backend
- Python
- Django
- Django REST Framework
- JWT para autenticación segura

### Frontend
- React
- JavaScript
- Tailwind CSS

### Base de datos
- PostgreSQL

---

## 🧩 Funcionalidades principales

### 👤 Gestión de Usuarios
- Registro y administración de empleados
- Asignación de roles: `Administrador` y `Empleado`
- Control de acceso mediante autenticación JWT

### ✅ Gestión de Tareas
- Creación y asignación de tareas a usuarios específicos
- Estados de tareas: `Pendiente`, `En progreso`, `Completada`
- Fechas de vencimiento y asignación de prioridades
- Filtros avanzados y reportes de rendimiento

---

## 🎯 Objetivos del sistema

- Optimizar la planificación y ejecución de actividades laborales
- Mejorar la visibilidad del progreso y desempeño de cada empleado
- Fortalecer la comunicación y coordinación interna
- Asegurar la claridad de responsabilidades y plazos

---

## 📦 Instalación y ejecución

### 🔧 Backend (Django)

```bash
# Clona el repositorio
git clone https://github.com/M0nnx/To-Do-List.git
cd To-Do-List
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### 💻 Frontend (React + Tailwind)
```bash
cd To-Do-List/frontend
npm install
npm start
```

