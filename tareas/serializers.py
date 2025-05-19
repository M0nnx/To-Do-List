from rest_framework import serializers
from .models import Tarea
from usuarios.serializers import UsuarioSerializer
from usuarios.models import Usuario


class TareaSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        source='usuario',
        queryset=Usuario.objects.all(),
        write_only=True
    )
    class Meta:
        model = Tarea
        fields = ['id', 'titulo', 'descripcion', 'estado', 'prioridad', 'usuario','fecha_vencimiento','usuario_id']
        read_only_fields = ['usuario']
