# Generated by Django 3.2.3 on 2021-05-20 15:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='about',
        ),
    ]
