# Generated by Django 3.2.12 on 2022-03-21 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trivia', '0020_remove_score_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='score',
            name='date',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
