from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Student(models.Model):
    student_id = models.IntegerField(
        primary_key=True, verbose_name="student_id")
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    DOB = models.DateField(blank=True, null=True)
    user = models.OneToOneField(
        User,  on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        # return str(self.student_id)
        return self.first_name + " " + self.last_name


class Lecturer(models.Model):
    staff_id = models.IntegerField(primary_key=True, verbose_name="staff_id")
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    DOB = models.DateField(blank=True, null=True)
    user = models.OneToOneField(
        User, verbose_name="User", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.first_name + " " + self.last_name
        # return str(self.staff_id)


class Course(models.Model):
    # course_id = models.AutoField(verbose_name="CourseID",primary_key=True)
    code = models.CharField(verbose_name="course_code", max_length=150, blank=True)
    course_name = models.CharField(
        verbose_name="course_name", max_length=150, blank=True)

    def __str__(self):
        return self.code + " " + self.course_name

class Semester(models.Model):
    # semester_id = models.AutoField(verbose_name="SemesterID", primary_key=True)
    year = models.CharField(verbose_name="year", max_length=10)
    semester = models.CharField(verbose_name="semester", max_length=150)
    course = models.ManyToManyField(Course, related_name='semester_course', blank=True)

    def __str__(self):
        return self.year + " " + self.semester


class Class(models.Model):
    # class_id = models.AutoField(verbose_name="ClassID",primary_key=True)
    number = models.IntegerField(blank=True, null=True)
    course = models.ForeignKey(
        Course, verbose_name="course", null=True, blank=True, on_delete=models.SET_NULL)
    semester = models.ForeignKey(
        Semester, verbose_name="semester", null=True, blank=True, on_delete=models.SET_NULL)
    lecturer = models.ForeignKey(Lecturer, blank=True, null=True, on_delete=models.CASCADE)
    student = models.ManyToManyField(Student, null=True, blank=True)

    def __str__(self):
        return str(self.number)


class CollegeDay(models.Model):
    # collegeDay_id = models.AutoField(verbose_name="CollegeDay_ID",primary_key=True)
    date = models.DateField()
    classes = models.ManyToManyField(Class, verbose_name="day_class")
    student = models.ManyToManyField(
        Student, related_name='CollegeDay_student', null=True, blank=True)

    def __str__(self):
        return str(self.date), self.classes.name

