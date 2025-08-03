from django.shortcuts import render
from rest_framework import generics , viewsets, permissions
from .models import User, Product
from .serializers import RegisterSerializer , ProductSerializer , CustomTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

class RegisterView(generics.CreateAPIView):
    """
    View to handle user registration.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    # def perform_create(self, serializer):
    #     """
    #     Save the new user instance after validation.
    #     """
    #     serializer.save()


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Optional query param ?view=mine
        if self.request.query_params.get('view') == 'mine':
            return Product.objects.filter(farmer=user).order_by('-created_at')
        else:
            # Default: show all products
            return Product.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user)


class PublicProductListView(generics.ListAPIView):
    """
    ViewSet to handle read-only operations for products.
    """
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer