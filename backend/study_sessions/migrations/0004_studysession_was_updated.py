# Generated by Django 3.2.3 on 2021-07-30 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('study_sessions', '0003_studysession_language'),
    ]

    operations = [
        migrations.AddField(
            model_name='studysession',
            name='was_updated',
            field=models.BooleanField(default=False),
        ),
    ]
