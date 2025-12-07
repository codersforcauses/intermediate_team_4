from django.db import models
from django.contrib.auth import get_user_model 


# Create your models here.


User = get_user_model() 


class Users(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="account",
    )
    rating = models.SmallIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)    



class Organisation(models.Model): 
    host = models.ForeignKey(User, on_delete=models.CASCADE) 
    created_at = models.DateTimeField(auto_now_add=True)  



class Members(models.Model): 
    owner = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    member = models.ForeignKey(Users, on_delete=models.CASCADE) 






