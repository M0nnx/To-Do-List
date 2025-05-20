from django.db import models
from django.conf import settings

class Tarea(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('en progreso', 'En Progreso'),
        ('completa', 'Completa'),
    ]

    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    prioridad = models.IntegerField(default=1)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo