
from datetime import datetime
from django.db import models
from django.conf import settings
from django.forms import DateField, ValidationError

PHASES = (
    ('DRAFT', 'Draft'),
    ('SUBMITTED', 'Submitted'),
    ('REJECTED', 'Rejected'),
    ('ACCEPTED', 'Accepted')
)


class Question(models.Model):
    question = models.CharField(max_length=255)
    incorrectAnswer1 = models.CharField(max_length=255, blank=True)
    incorrectAnswer2 = models.CharField(max_length=255, blank=True)
    incorrectAnswer3 = models.CharField(max_length=255, blank=True)
    correctAnswer = models.CharField(max_length=255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    phase = models.CharField(max_length=10, choices=PHASES, default='DRAFT')
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.question


class Score(models.Model):

    score = models.IntegerField()
    # score_hard = models.IntegerField(default=0)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField(auto_now_add=True, blank=True, null=True)

class Score_Hard(models.Model):

    score_hard = models.IntegerField()
    # score_hard = models.IntegerField(default=0)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField(auto_now_add=True, blank=True, null=True)

    # def __str__(self):
    #     return self.user
    # def natural_key(self):
    #     return (self.user)

    # def __unicode__(self):
    #     return self.user
