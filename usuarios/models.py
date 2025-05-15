from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Usuario(AbstractUser):
    ROLES = [
        ('cliente', 'Cliente'),
        ('admin', 'Admin'),
    ]
    rol = models.CharField(choices=ROLES, default='cliente', max_length=20)

    class Meta:
        db_table = 'usuario'

    def __str__(self):
        return self.username

    def is_admin(self):
        return self.rol == 'admin'

    def is_cliente(self):
        return self.rol == 'cliente'
