# Generated by Django 3.2.12 on 2022-03-21 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trivia', '0022_remove_question_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='date',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
