# Generated by Django 3.2.3 on 2021-05-29 13:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0009_auto_20210529_1325'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='phone',
        ),
    ]