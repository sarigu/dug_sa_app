# Generated by Django 3.2.3 on 2021-05-29 16:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0013_rename_accesscodes_accesscode'),
    ]

    operations = [
        migrations.RenameField(
            model_name='teacher_subject',
            old_name='subject_id',
            new_name='subject',
        ),
        migrations.RenameField(
            model_name='teacher_subject',
            old_name='teacher_id',
            new_name='teacher',
        ),
    ]