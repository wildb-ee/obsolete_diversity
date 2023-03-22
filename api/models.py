import random
import string
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

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
    host = models.CharField(max_length=50, default='none')
    opponent = models.CharField(max_length=50, default='')
    section = models.CharField(max_length=50, default='all', null=True)
    IsRanked = models.BooleanField(default=False, null=True)


    created_at = models.DateTimeField(auto_now_add=True)


#ADDED DKB
# class AppUserManager(BaseUserManager):
# 	def create_user(self, email, password=None):
# 		if not email:
# 			raise ValueError('An email is required.')
# 		if not password:
# 			raise ValueError('A password is required.')
# 		email = self.normalize_email(email)
# 		user = self.model(email=email)
# 		user.set_password(password)
# 		user.save()
# 		return user
# 	def create_superuser(self, email, password=None):
# 		if not email:
# 			raise ValueError('An email is required.')
# 		if not password:
# 			raise ValueError('A password is required.')
# 		user = self.create_user(email, password)
# 		user.is_superuser = True
# 		user.save()
# 		return user


# class AppUser(AbstractBaseUser, PermissionsMixin):
# 	user_id = models.AutoField(primary_key=True)
# 	email = models.EmailField(max_length=50, unique=True)
# 	username = models.CharField(max_length=50)
# 	USERNAME_FIELD = 'email'
# 	REQUIRED_FIELDS = ['username']
# 	objects = AppUserManager()
# 	def __str__(self):
# 		return self.username