from django.urls import path
from .views import RegistroVista,PerfilVista,Logout,Usuarios,borrarUsuario,editarUsuarios

urlpatterns = [
    path('registro/', RegistroVista.as_view(), name='registro'),
    path('perfil/', PerfilVista.as_view(), name='perfil'),
    path('editar/', editarUsuarios.as_view(), name='editarUsuario'),
    path('borrar/', borrarUsuario.as_view(), name='borrarUsuario'),


    path('salir/', Logout.as_view(), name='salir'),
    path('', Usuarios.as_view(), name='verUsuarios'),


]
