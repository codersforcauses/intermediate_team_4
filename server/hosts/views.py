from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response 


class HostHomePage(APIView): 
    def get(self, request): 
        return Response({"endpoint": "Hosts HomePage", "status": "working"})
    


class HostCreateClub(APIView): 
    def get(self, request): 
        return Response({"endpoint": "Hosts CreateClub", "status": "working"})
    



# Create your views here.
