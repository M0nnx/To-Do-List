from django.urls import path
from .views import crearTarea,Tareas,editarTareas,borrarTareas

urlpatterns = [
    path('crear', crearTarea.as_view(), name='crearTarea'),
    path('borrar/<int:pk>', borrarTareas.as_view(), name='borrarTarea'),
    path('editar/<int:pk>', editarTareas.as_view(), name='editarTarea'),
    path('', Tareas.as_view(), name='Tareas'),

]
