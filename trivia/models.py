from django.db import models
from django.conf import settings

class Question(models.Model): 
    question = models.CharField(max_length = 255)
    incorrectAnswer1 = models.CharField(max_length = 255, blank=True)
    incorrectAnswer2 = models.CharField(max_length = 255, blank=True)
    incorrectAnswer3 = models.CharField(max_length = 255, blank=True)
    correctAnswer = models.CharField(max_length = 255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

def __str__(self):
        return self.question