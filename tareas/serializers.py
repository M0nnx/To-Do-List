from rest_framework import serializers
from .models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ['id', 'titulo', 'descripcion', 'estado', 'prioridad', 'usuario','fecha_vencimiento']
        read_only_fields = ['usuario']
