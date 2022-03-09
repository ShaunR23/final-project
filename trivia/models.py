from django.db import models
from django.conf import settings

PHASES = (
    ('DRAFT','Draft'),
    ('SUBMITTED', 'Submitted'),
    ('REJECTED', 'Rejected'),
    ('ACCEPTED', 'Accepted')
)

class Question(models.Model): 
    question = models.CharField(max_length = 255)
    incorrectAnswer1 = models.CharField(max_length = 255, blank=True)
    incorrectAnswer2 = models.CharField(max_length = 255, blank=True)
    incorrectAnswer3 = models.CharField(max_length = 255, blank=True)
    correctAnswer = models.CharField(max_length = 255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    phase = models.CharField(max_length=10, choices=PHASES, default='DRAFT')

def __str__(self):
        return self.question