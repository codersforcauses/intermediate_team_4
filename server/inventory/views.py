# this is where the logic to call the backend is written 
# like when this URL is hit, do this action
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import InventoryItem
from .serializers import InventoryItemSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta

class InventoryItemViewSet(viewsets.ModelViewSet):
    serializer_class = InventoryItemSerializer

    def get_queryset(self):
        # 1. Start with all items
        # does not talk to the database yet, its just a query plan
        queryset = InventoryItem.objects.all()

        # 2. Grab 'categories' from the URL (e.g., ?categories=Tools)
        category = self.request.query_params.get('categories')
        
        # 3. Grab 'ordering' from the URL (e.g., ?ordering=name)
        sort_by = self.request.query_params.get('ordering')

        # 4. Apply filters manually if the user provided them
        if category is not None:
            queryset = queryset.filter(categories=category)

        # 5. Apply sorting manually
        if sort_by is not None:
            queryset = queryset.order_by(sort_by)

        return queryset

# the original that works
# class InventoryItemViewSet(viewsets.ModelViewSet):
#     # This tells the view where to get the data and how to translate it
#     queryset = InventoryItem.objects.all()
#     serializer_class = InventoryItemSerializer

    # url = GET /api/inventory/countDueThisWeek/
    @action(detail=False, methods=['get'])
    def countDueThisWeek(self, request):
        # 1. Define the time range
        now = timezone.now()
        one_week_later = now + timedelta(days=7)
        
        # 2. Filter and count in the database (efficient!)
        count = InventoryItem.objects.filter(
            dueOn__range=[now, one_week_later]
        ).count()
        
        # 3. Return a simple response
        return Response({'count': count})