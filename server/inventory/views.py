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

    ### calls for dashboard starts ###

    # url = GET /api/inventory/weeklyReportByField/
    @action(detail=False, methods=['get'])
    def weeklyReportByField(self, request):
        # 1. Get the field name from the URL (e.g., ?field=dueOn)
        field_name = request.query_params.get('field', 'dueOn')
        
        # 2. Calculate Calendar Week Boundaries
        now = timezone.now()
        days_since_monday = now.weekday()
        this_monday = (now - timedelta(days=days_since_monday)).replace(hour=0, minute=0, second=0, microsecond=0)
        last_monday = this_monday - timedelta(days=7)
        last_sunday = this_monday - timedelta(microseconds=1)

        # 3. Build the dynamic filter keys
        # Example: if field_name is 'borrowedOn', this becomes 'borrowedOn__range'
        this_week_filter = {f"{field_name}__range": [this_monday, now]}
        last_week_filter = {f"{field_name}__range": [last_monday, last_sunday]}

        # 4. Execute counts
        this_week_count = InventoryItem.objects.filter(**this_week_filter).count()
        last_week_count = InventoryItem.objects.filter(**last_week_filter).count()

        return Response({
            'field': field_name,
            'thisWeek': this_week_count,
            'lastWeek': last_week_count,
            'difference': this_week_count - last_week_count
        })


# old mat method
# # 1. Define the time range
# now = timezone.now()
# one_week_ago = now - timedelta(days=7)

# # 2. Filter and count in the database (efficient!)
# count = InventoryItem.objects.filter(
#     dueOn__range=[one_week_ago, now]
# ).count()

# @action(detail=False, methods=['get'])
# def dueSummary(self, request):
#     now = timezone.now()
#     days_since_monday = now.weekday()
#     this_monday = (now - timedelta(days=days_since_monday)).replace(hour=0, minute=0, second=0, microsecond=0)
    
#     last_monday = this_monday - timedelta(days=7)
#     last_sunday = this_monday - timedelta(microseconds=1)

#     # Database does both counts
#     this_week_count = InventoryItem.objects.filter(dueOn__range=[this_monday, now]).count()
#     last_week_count = InventoryItem.objects.filter(dueOn__range=[last_monday, last_sunday]).count()

#     return Response({
#         'thisWeek': this_week_count,
#         'lastWeek': last_week_count,
#         'difference': this_week_count - last_week_count
#     })