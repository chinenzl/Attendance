# Generated by Django 4.1.1 on 2022-11-12 01:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("assignment2", "0002_remove_attendance_lecturer_and_more"),
    ]

    operations = [
        migrations.RemoveField(model_name="collegeday", name="attendance_rate",),
    ]
