from django.db import models
from accounts.models import Users, Organisation
# Create your models here.




class Inventory(models.Model): 
    owner = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.SmallIntegerField(null=False) 
    avaliable = models.BooleanField(default=True)


class Loan(models.Model): 
    host = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    requester = models.ForeignKey(Users, on_delete=models.CASCADE)
    item = models.ForeignKey(Inventory, on_delete=models.CASCADE) 
    loan_start = models.DateTimeField(auto_now_add=True)
    loan_end = models.DateTimeField(null=False, blank=False) 





