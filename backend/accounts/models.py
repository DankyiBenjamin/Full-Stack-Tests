from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    """
    Custom user model that extends the default Django user model.
    """
    is_farmer = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.username

    
class Product(models.Model):
    """
    Model to represent a product that can be sold by farmers.
    """
    farmer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.name} by {self.farmer.username}"