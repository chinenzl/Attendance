# Generated by Django 4.1.1 on 2022-11-12 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("assignment2", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="attendance", name="lecturer",),
        migrations.AlterField(
            model_name="attendance", name="attendance", field=models.FloatField(),
        ),
    ]
