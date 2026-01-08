# Create your models here.
# this is the db models 
# you can have multiple tables here
# whenever you make changes here do this
# python manage.py makemigrations   
# python manage.py migrate

from django.db import models

class InventoryItem(models.Model):
    # BigAutoField is for primary keys
    id = models.BigAutoField(primary_key=True)

    # CharField is for short text (like titles)
    name = models.CharField(max_length=255)
    
    # TextField is for long-form content (like descriptions)
    details = models.TextField(blank=True, null=True)
    categories = models.CharField(max_length=100, default="General")

    availability = models.BooleanField(default=True)
    organization = models.CharField(max_length=100, default="Demo Organization")
    
    collectionPoint = models.CharField(max_length=100, default="Demo Collection Point")
    borrowerName = models.CharField(max_length=100, blank=True, null=True)
    returnedOn = models.DateTimeField(blank=True, null=True)

    # Dates
    borrowed_on = models.DateTimeField(blank=True, null=True)
    due_on = models.DateTimeField(blank=True, null=True)
    expiry_date = models.DateField(blank=True, null=True)
    
    # auto_now_add sets the time automatically when the item is first created
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name