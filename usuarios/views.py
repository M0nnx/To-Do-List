from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegistroSerializer,UsuarioSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import EsAdmin, EsCliente
from .models import Usuario

class RegistroVista(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PerfilVista(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({
            'usuario': request.user.username,
            'email': request.user.email,
            'rol': request.user.rol
        })

class Logout(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout exitoso."}, status=200)
        except KeyError:
            return Response({"error": "Falta el token de refresh."}, status=400)

class editarUsuarios(APIView):
    permission_classes = [EsAdmin]
    def patch(self,request,pk):
        try:
            usuario = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class borrarUsuario(APIView):
    permission_classes=[EsAdmin]
    def delete(self,request,pk):
        try:
            usuario= Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Usuarios(APIView):
    permission_classes = [EsAdmin]
    def get(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)