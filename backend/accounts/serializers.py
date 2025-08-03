from rest_framework import serializers
from .models import User , Product
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


# Serializer for user registration
class RegisterSerializer(serializers.ModelSerializer):
    # Fields for registration
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'is_farmer')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.
    """
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['farmer', 'created_at']
    
    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_farmer'] = user.is_farmer

        return token