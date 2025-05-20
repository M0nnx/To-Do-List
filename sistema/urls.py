from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from usuarios.permissions import EsAdmin
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

schema_view = get_schema_view(
    openapi.Info(
        title="API TO-DO",
        default_version='v1',
        description="Documentación de la API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@tuapi.com"),
        license=openapi.License(name="BSD License"),
    ),  public=True,permission_classes=[])

urlpatterns = [
    
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('usuarios/', include('usuarios.urls')),
    path('tareas/', include('tareas.urls')),
]
