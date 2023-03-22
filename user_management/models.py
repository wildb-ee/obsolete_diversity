from django.db import models

# models.py

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    rank = models.IntegerField(default=False)
    room = models.CharField(max_length=8, default='')
    
