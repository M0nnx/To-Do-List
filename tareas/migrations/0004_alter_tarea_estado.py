# Generated by Django 5.2.1 on 2025-05-20 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tareas', '0003_alter_tarea_estado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarea',
            name='estado',
            field=models.CharField(choices=[('pendiente', 'Pendiente'), ('en progreso', 'En Progreso'), ('completa', 'Completa')], default='pendiente', max_length=20),
        ),
    ]
