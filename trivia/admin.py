from django.contrib import admin
from .models import  Question, Score, Score_Hard

# Register your models here.
admin.site.register(Question)
admin.site.register(Score)
admin.site.register(Score_Hard)