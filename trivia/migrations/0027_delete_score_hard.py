# Generated by Django 3.2.12 on 2022-03-21 21:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trivia', '0026_score_hard'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Score_Hard',
        ),
    ]