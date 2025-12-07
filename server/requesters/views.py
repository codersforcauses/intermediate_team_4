from django.shortcuts import render
from rest_framework import generics 
from rest_framework.views import APIView
from rest_framework.response import Response 


class RequesterHomePage(APIView): 
    def get(self, request):  
        return Response({"endpoint": "Requesters HomePage", "status": "working"})
    
    
class RequesterItemPage(APIView): 
    def get(self, request): 
        return Response({"endpoint": "Requesters ItemPage", "status": "working"})



# Create your views here.
