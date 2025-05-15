from django.urls import path
from .views import RegistroVista,PerfilVista,Logout,VistaSoloAdmin,VistaSoloCliente,Usuarios

urlpatterns = [
    path('user/registro/', RegistroVista.as_view(), name='registro'),
    path('user/perfil/', PerfilVista.as_view(), name='perfil'),
    path('user/salir/', Logout.as_view(), name='salir'),
    path('users/', Usuarios.as_view(), name='verUsuarios'),

    path('admin/', VistaSoloAdmin.as_view(), name='soloadmin'),
    path('cliente/', VistaSoloCliente.as_view(), name='solocliente'),
]
