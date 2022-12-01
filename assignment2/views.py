from django.contrib.auth import logout
from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from assignment2.models import Student, Lecturer, Semester, Course, Class, CollegeDay
from assignment2.permissions import IsAdmin, IsAdminOrReadOnly
from assignment2.serializers import StudentSerializer, LecturerSerializer, SemesterSerializer, ClassSerializer, \
    CourseSerializer, CollegeDaySerializer, UserSerializer


# Create your views here.


def index(request):
    return HttpResponse("hello world")


# -------------------------User-------------------------
@csrf_exempt
def user_list(request):
    if request.method == "GET":
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


# @api_view(['GET', 'POST'])
# def user_list(request):
#     if request.method == "GET":
#         user = User.objects.all()
#         serializer = UserSerializer(user, many=True)
#         return Response(serializer.data)
#
#     if request.method == "PUT":
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#
# class SemesterViewSet(viewsets.ModelViewSet):
#     queryset = Semester.objects.all()
#     serializer_class = SemesterSerializer
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = [IsAuthenticated, IsAuthor]


@api_view(["GET", "PUT", "DELETE"])
def user_detail(request, pk):
    try:
        users = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UserSerializer(users)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = UserSerializer(users, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        users.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# -------------------------Student-------------------------

# @csrf_exempt
# def student_list(request):
#     if request.method == "GET":
#         students = Student.objects.all()
#         serializer = StudentSerializer(students, many=True)
#         return JsonResponse(serializer.data, safe=False)
#     elif request.method == "POST":
#         data = JSONParser().parse(request)
#         serializer = StudentSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def student_list(request):
    if request.method == "GET":
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET",  "PUT", "DELETE"])
def student_detail(request, pk):
    try:
        students = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = StudentSerializer(students)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = StudentSerializer(students, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        students.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    authentication_classes = (TokenAuthentication,)
    # permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    permission_classes = [IsAuthenticated, ]


class LecturerViewSet(viewsets.ModelViewSet):
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

class CollegeDayViewSet(viewsets.ModelViewSet):
    queryset = CollegeDay.objects.all()
    serializer_class = CollegeDaySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

# -------------------------Lecturer-------------------------
@api_view(['GET', 'POST'])
def lecturer_list(request):
    if request.method == "GET":
        lecturers = Lecturer.objects.all()
        serializer = LecturerSerializer(lecturers, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = LecturerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([TokenAuthentication])
def lecturer_detail(request, pk):
    try:
        lecturers = Lecturer.objects.get(pk=pk)
    except Lecturer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = LecturerSerializer(lecturers)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = LecturerSerializer(lecturers, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        lecturers.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# -------------------------Semester-------------------------
@api_view(['GET', 'POST'])
def semester_list(request):
    if request.method == "GET":
        semesters = Semester.objects.all()
        serializer = SemesterSerializer(semesters, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = SemesterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([TokenAuthentication])
def semester_detail(request, pk):
    try:
        semesters = Semester.objects.get(pk=pk)
    except Semester.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = SemesterSerializer(semesters)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = SemesterSerializer(semesters, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        semesters.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# -------------------------Class-------------------------
@api_view(['GET', 'POST'])
def class_list(request):
    if request.method == "GET":
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([TokenAuthentication])
def class_detail(request, pk):
    try:
        classes = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ClassSerializer(classes)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ClassSerializer(classes, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        classes.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
# -------------------------Course-------------------------
@api_view(['GET', 'POST'])
def course_list(request):
    if request.method == "GET":
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([TokenAuthentication])
def course_detail(request, pk):
    try:
        courses = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CourseSerializer(courses)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = CourseSerializer(courses, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        courses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
# -------------------------College Day-------------------------
@api_view(['GET', 'POST'])
def collegeday_list(request):
    if request.method == "GET":
        collegedays = CollegeDay.objects.all()
        serializer = CollegeDaySerializer(collegedays, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = CollegeDaySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([TokenAuthentication])
def collegeDay_detail(request, pk):
    try:
        collegedays = CollegeDay.objects.get(pk=pk)
    except CollegeDay.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CollegeDaySerializer(collegedays)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = CollegeDaySerializer(collegedays, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        collegedays.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def User_logout(request):
    request.user.auth_token.delete()
    logout(request)
    return Response('User logout successfully')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def User_ID_Search(request):
    return Response({'userid': request.user.id})