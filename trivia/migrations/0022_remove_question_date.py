# Generated by Django 3.2.12 on 2022-03-21 18:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trivia', '0021_score_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='date',
        ),
    ]