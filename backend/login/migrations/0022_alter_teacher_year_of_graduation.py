# Generated by Django 3.2.3 on 2021-07-10 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0021_alter_teacher_year_of_graduation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='year_of_graduation',
            field=models.DateField(blank=True, null=True),
        ),
    ]
