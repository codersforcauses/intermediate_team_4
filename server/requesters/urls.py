from django.urls import path 
from . import views 


app_name = "requesters"

urlpatterns = [  
    path("", views.RequesterHomePage.as_view(), name="requesters-homepage"),
    path("Myitems", views.RequesterItemPage.as_view(), name="requesters-itempage") 

]