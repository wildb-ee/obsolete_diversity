import random
import string
from django.db import models

MAX_CODE_LENGTH = 8

def generate_unique_code():

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=MAX_CODE_LENGTH))
        if Fight.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.
class Fight(models.Model):
    code = models.CharField(max_length=MAX_CODE_LENGTH, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    opponent = models.CharField(max_length=50, unique=True)
    section = models.CharField(max_length=50, default='all')


    created_at = models.DateTimeField(auto_now_add=True)
