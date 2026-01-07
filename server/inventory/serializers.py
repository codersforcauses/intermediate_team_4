# this is a translator for frontend and backend

from rest_framework import serializers
from .models import InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        # '__all__' tells Django to include every field from the model in the JSON
        fields = '__all__'