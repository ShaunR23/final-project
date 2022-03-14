from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    questions_right = models.IntegerField(default=0)
    questions_total = models.IntegerField(default=0)
    game_score = models.IntegerField(default=0)
    avatar = models.ImageField(
        upload_to='user/', blank=True )


