from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryItemViewSet

router = DefaultRouter()
# router.register(r'items', InventoryItemViewSet) # This creates /items/
router.register(r'items', InventoryItemViewSet, basename='inventoryitem') # to fix error with missing basename

urlpatterns = [
    path('', include(router.urls)),
]