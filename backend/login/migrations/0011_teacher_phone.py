# Generated by Django 3.2.3 on 2021-05-29 15:57

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0010_remove_teacher_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region=None),
        ),
    ]
