from django.contrib import admin
from .models import Student, Lecturer, Course, Semester, Class, CollegeDay

# Register your models here.

admin.site.register(Student)
admin.site.register(Lecturer)
admin.site.register(Course)
admin.site.register(Semester)
admin.site.register(Class)
admin.site.register(CollegeDay)

