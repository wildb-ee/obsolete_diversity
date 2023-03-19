from django.db import models
import string 
import random


UNIQUE_CODE_LENGTH = 8

def generate_unique_code():
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=UNIQUE_CODE_LENGTH))
        if Fight.objects.filter(code = code).count() == 0:
            break
    
    return code


# Create your models here.
class Fight(models.Model):
    code = models.CharField(max_length=UNIQUE_CODE_LENGTH, default='', unique=True)
    
    #additional variables for storing the information about the fight
    first_user = models.CharField(max_length=50,unique=True)
    second_user = models.CharField(max_length=50,unique=True)

    
    created_at= models.DateTimeField(auto_now_add=True)