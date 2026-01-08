from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.views.generic import ListView


from .models import FriendList, FriendRequest
from .serializers import FriendRequestSerializer, FriendListSerializer

User = get_user_model()


class SendFriendRequest(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        receiver = get_object_or_404(User, id=user_id)

        if receiver == request.user:
            return Response({"error": "You cannot friend yourself"}, status=400)

        if FriendRequest.objects.filter(sender=request.user, receiver=receiver, is_active=True).exists():
            return Response({"error": "Friend request already sent"}, status=400)

        FriendRequest.objects.create(sender=request.user, receiver=receiver)
        return Response({"success": "Friend request sent"})


class AcceptFriendRequest(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        friend_request = get_object_or_404(FriendRequest, id=request_id, receiver=request.user)
        friend_request.accept()
        return Response({"success": "Friend request accepted"})


class DeclineFriendRequest(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        friend_request = get_object_or_404(FriendRequest, id=request_id, receiver=request.user)
        friend_request.decline()
        return Response({"success": "Friend request declined"})
    
class CancelFriendRequest(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        friend_request = get_object_or_404(FriendRequest, id=request_id, sender=request.user)
        friend_request.cancel()
        return Response({"success": "Friend request declined"})


class MyFriendRequests(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requests = FriendRequest.objects.filter(receiver=request.user, is_active=True)
        serializer = FriendRequestSerializer(requests, many=True)
        return Response(serializer.data)
    
class MySentRequests(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requests = FriendRequest.objects.filter(sender=request.user, is_active=True)
        serializer = FriendRequestSerializer(requests, many=True)
        return Response(serializer.data)

class RemoveFriends(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        removee = get_object_or_404(User, id=user_id)
        friend_list = FriendList.objects.get(user=request.user)

        if removee == request.user:
            return Response({"error": "You cannot remove yourself"}, status=400)
        if not friend_list.is_mutual_friend(removee):
            return Response({"error": "User is not a friend"}, status=400)


        friend_list.unfriend(removee)
        return Response({"success": "Friend removed"})


class MyFriends(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        friend_list = FriendList.objects.get(user=request.user)
        serializer = FriendListSerializer(friend_list)
        return Response(serializer.data)


class UserSearch(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        query = request.query_params.get("q", "").strip()
        if not query:
            return Response([])

        results = User.objects.filter(username__icontains=query)
        friend_list = FriendList.objects.get(user=request.user)

        friends = set(friend_list.friends.values_list("id", flat=True))
        sent_requests = FriendRequest.objects.filter(sender=request.user, is_active=True).values_list("receiver_id", flat=True)
        received_requests = FriendRequest.objects.filter(receiver=request.user,is_active=True).values_list("sender_id", flat=True)
        
        data = []
        for u in results:
            data.append({
                "id": u.id,
                "username": u.username,
                "is_me": u == request.user,
                "is_friend": u.id in friends,
                "request_sent": u.id in sent_requests,
                "request_received": u.id in received_requests,
            })

        return Response(data)