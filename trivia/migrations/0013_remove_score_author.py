# Generated by Django 3.2.12 on 2022-03-18 18:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trivia', '0012_score_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='score',
            name='author',
        ),
    ]