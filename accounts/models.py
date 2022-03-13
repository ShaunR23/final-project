from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    questions_right = models.IntegerField(default=0)
    questions_total = models.IntegerField(default=0)
    # profile_img = models.ImageField(
    #     upload_to='account/', default='account/default-user.png')
    
    
    def __str__(self):
        return self.user.username
