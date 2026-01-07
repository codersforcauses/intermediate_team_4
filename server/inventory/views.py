# this is where the logic to call the backend is written 
# like when this URL is hit, do this action
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import InventoryItem
from .serializers import InventoryItemSerializer

class InventoryItemViewSet(viewsets.ModelViewSet):
    # This tells the view where to get the data and how to translate it
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer