from django.db import models
from django.conf import settings
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()


class FriendList(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="friend_list")
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="friends_of")


    def __str__(self):
        return self.user.username
    def add_friend(self, account):
        """
        Add a new friend
        """
        if not account in self.friends.all():
            self.friends.add(account)
            self.save()
    
    def remove_friend(self, account):
        """
        Remove a friend
        """
        if account in self.friends.all():
            self.friends.remove(account)
            # self.save()

    def unfriend(self, removee):
        """
        Initiate action of unfriending someone
        """
        remover_friends_list = self # person terminating friendship

        # Remove friend from remover friend list
        remover_friends_list.remove_friend(removee)

        # Remove friend from removee friend list
        friends_list = FriendList.objects.get(user=removee)
        friends_list.remove_friend(self.user)
        # if we want a mutual removal of friendship, i guess add that below

    def is_mutual_friend(self, friend):
        """
        Is this a friend
        """
        if friend in self.friends.all():
            return True
        return False

class FriendRequest(models.Model):
    """
    Friend consists of two parts, 
    1. Sender -- Person sending friend request
    2. Reciever -- Person recieving friend request
    """
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = "sender")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = "receiver")

    is_active = models.BooleanField(blank=True, null=False, default=True)

    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.sender.username
    
    def accept(self):
        """
        Accept a friend request
        Update both Sender and Receiver friend lists
        """
        receiver_friend_list = FriendList.objects.get(user=self.receiver)
        if receiver_friend_list:
            receiver_friend_list.add_friend(self.sender)
            sender_friend_list = FriendList.objects.get(user=self.sender)
            if sender_friend_list:
                sender_friend_list.add_friend(self.receiver)
                self.is_active = False
                self.save()

    def decline(self):
        """
        Decline a friend request.
        It is "declined" by setting the 'is_active' field to False
        """
        self.is_active = False
        self.save()

    def cancel(self):
        """
        Cancel a friend request
        It is 'cancelled' by setting the 'is_active' field to False.
        Only different from 'decline' with respect to "declining" through generated notification.
        """
        self.is_active = False
        self.save()

@receiver(post_save, sender=User)
def create_friend_list(sender, instance, created, **kwargs):
    if created:
        FriendList.objects.create(user=instance)
