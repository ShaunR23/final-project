# Generated by Django 3.2.12 on 2022-03-21 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trivia', '0024_alter_question_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='score',
            name='score_hard',
        ),
        migrations.AlterField(
            model_name='question',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
    ]