from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FriendList, FriendRequest

User = get_user_model()


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class FriendRequestSerializer(serializers.ModelSerializer):
    sender = UserMiniSerializer(read_only=True)
    receiver = UserMiniSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ("id", "sender", "receiver", "is_active", "timestamp")


class FriendListSerializer(serializers.ModelSerializer):
    friends = UserMiniSerializer(many=True)

    class Meta:
        model = FriendList
        fields = ("user", "friends")
