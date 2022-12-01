# Generated by Django 4.1.1 on 2022-11-23 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("assignment2", "0005_alter_class_lecturer_alter_class_student"),
    ]

    operations = [
        migrations.AddField(
            model_name="lecturer",
            name="first_name",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="lecturer",
            name="last_name",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="semester",
            name="course",
            field=models.ManyToManyField(
                blank=True, related_name="semester_course", to="assignment2.course"
            ),
        ),
        migrations.AddField(
            model_name="student",
            name="first_name",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="last_name",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
