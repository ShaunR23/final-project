# Generated by Django 3.2.12 on 2022-03-13 02:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='questions_right',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='profile',
            name='questions_total',
            field=models.IntegerField(default=0),
        ),
    ]