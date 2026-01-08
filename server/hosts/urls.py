from django.urls import path 
from . import views


app_name = "hosts" 

urlpatterns = [
    path("", views.HostHomePage.as_view(), name="hosts-homepage"), 
    path("Createclub", views.HostCreateClub.as_view(), name="hosts-createclub")
]