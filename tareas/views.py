from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TareaSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from usuarios.permissions import EsAdmin, EsCliente
from .models import Tarea 

# Create your views here.
class crearTarea(APIView):
    permission_classes = [EsAdmin]
    def post(self, request):
        serializer = TareaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response({"mensaje": "Tarea creada correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Tareas(APIView):
    def get(self, request):
        tareas = Tarea.objects.all() 
        serializer = TareaSerializer(tareas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

class editarTareas(APIView):
    permission_classes = [EsAdmin]
    def patch(self, request, pk):
        try:
            tarea = Tarea.objects.get(pk=pk)
        except Tarea.DoesNotExist:
            return Response({"error": "Tarea no encontrada."}, status=status.HTTP_404_NOT_FOUND)

        serializer = TareaSerializer(tarea, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class borrarTareas(APIView):
    permission_classes = [EsAdmin]
    def delete(self,request,pk):
        try:
            tarea = Tarea.objects.get(pk=pk)
        except Tarea.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        tarea.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class ListaTareasUsuario(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        tareas = Tarea.objects.filter(usuario=request.user)
        serializer = TareaSerializer(tareas, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        if not tareas.exists():
            return Response({"mensaje": "No tienes tareas registradas"}, status=status.HTTP_204_NO_CONTENT)

