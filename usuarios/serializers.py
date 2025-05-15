from rest_framework import serializers
from django.contrib.auth import get_user_model

Usuario = get_user_model()
class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'password']
    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
        )
        return user

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','username','email']
