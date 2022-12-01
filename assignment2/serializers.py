from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token

from assignment2.models import Student, Lecturer, Semester, Class, Course, CollegeDay

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', ]


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password', "groups"]

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True,
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        user.groups.add(1)
        return user


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["student_id", 'first_name', 'last_name', "DOB"]

    def create(self, validated_data):
        student = Student.objects.create(**validated_data)
        return student


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = ["staff_id", 'first_name', 'last_name', "DOB"]

    def create(self, validated_data):
        lecturer = Lecturer.objects.create(**validated_data)
        return lecturer

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ["id", "year", "semester"]


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ["id", "number"]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["code", "course_name"]

    # def create(self, validated_data):
    #     return Course(**validated_data)

class CollegeDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeDay
        fields = ["data"]

