from django.urls import path
from .views import RegisterView, ProductViewSet, PublicProductListView , CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter

# Router for ProductViewSet
router = DefaultRouter()
# Register the ProductViewSet with the router
router.register(r'products', ProductViewSet, basename='product')


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/public/', PublicProductListView.as_view(), name='public_products'),
]
# Include the router's URLs in the urlpatterns
urlpatterns += router.urls