from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

# Create your models here.
class User(AbstractUser, models.Model):
    complete_name = models.CharField(max_length=100, blank=True, null=True)
    username = models.CharField(max_length=50, blank=True, null=True, default='my_name', unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100, default='12345678')
    image = models.ImageField(default='users_images/user_image_default.png', upload_to='users_images/')
    def __str__(self):
        return f"{self.username}"
    def serialize(self):
        return {
            "id":              self.id,
            "complete_name":   self.complete_name,
            "username":        self.username,
            "image":        f'{self.image}',
            "email":        f'{self.email}',
        }



class List(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo = models.CharField(max_length=300, blank=False, default="To Do")
    situation = models.CharField(max_length=5, blank=False, default="To Do")
    timestamp  = models.CharField(max_length=300, default="01/01/2001 01:01")

allModels = [
    User,
    List
]