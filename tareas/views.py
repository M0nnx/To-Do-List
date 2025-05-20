from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TareaSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from usuarios.permissions import EsAdmin, EsCliente
from .models import Tarea 

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.
class crearTarea(APIView):
    permission_classes = [EsAdmin]
    @swagger_auto_schema(
        operation_summary="Crea una nueva tarea",
        request_body=TareaSerializer,
        responses={
            201: openapi.Response(
                description="Tarea creada correctamente",
                schema=TareaSerializer
            ),
            400: 'Solicitud Incorrecta',
            403: 'Prohibido'
        }
    )    
    def post(self, request):
        serializer = TareaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Tarea creada correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Tareas(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        operation_summary="Lista todas las tareas",
        responses={200: TareaSerializer(many=True)}
    )
    def get(self, request):
        tareas = Tarea.objects.all() 
        serializer = TareaSerializer(tareas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

class editarTareas(APIView):
    permission_classes = [EsAdmin]
    @swagger_auto_schema(
        operation_summary="Edita una tarea existente",
        manual_parameters=[
            openapi.Parameter(
                name='pk',
                in_=openapi.IN_PATH,
                description='ID de la tarea a editar',
                type=openapi.TYPE_INTEGER,
                required=True
            )
        ],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'titulo': openapi.Schema(type=openapi.TYPE_STRING),
                'completado': openapi.Schema(type=openapi.TYPE_BOOLEAN)
            }
        ),
        responses={
            200: TareaSerializer,
            400: 'Solicitud Incorrecta',
            403: 'Prohibido',
            404: 'No Encontrado'
        }
    )
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
    @swagger_auto_schema(
        operation_summary="Eliminar una tarea",
        manual_parameters=[
            openapi.Parameter(
                name='pk',
                in_=openapi.IN_PATH,
                description='ID de la tarea a eliminar',
                type=openapi.TYPE_INTEGER,
                required=True
            )
        ],
        responses={
            204: 'No Contenido',
            403: 'Prohibido',
            404: 'No Encontrado'
        }
    )
    def delete(self,request,pk):
        try:
            tarea = Tarea.objects.get(pk=pk)
        except Tarea.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        tarea.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class ListaTareasUsuario(APIView):
    permission_classes = [IsAuthenticated]
    permission_classes = [EsCliente]
    def get(self, request):
        tareas = Tarea.objects.filter(usuario=request.user)
        serializer = TareaSerializer(tareas, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        if not tareas.exists():
            return Response({"mensaje": "No tienes tareas registradas"}, status=status.HTTP_204_NO_CONTENT)

