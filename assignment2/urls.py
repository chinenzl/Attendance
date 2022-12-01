from django.conf.urls.static import static
from django.urls import path, include
# from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from assignment2.views import index, user_list, user_detail, student_list, student_detail, lecturer_list, \
    lecturer_detail, semester_list, class_list, course_list, collegeday_list, StudentViewSet, LecturerViewSet, \
    SemesterViewSet, ClassViewSet, CourseViewSet, CollegeDayViewSet, semester_detail, course_detail, class_detail, \
    collegeDay_detail, UserViewSet, User_ID_Search

router = DefaultRouter()



router.register('user', UserViewSet, 'user')
router.register('student', StudentViewSet, 'student_model_viewset')
router.register('lecturer', LecturerViewSet, 'lecturer_model_viewset')
router.register('semester', SemesterViewSet, 'semester_model_viewset')
router.register('class', ClassViewSet, 'class_model_viewset')
router.register('course', CourseViewSet, 'course_model_viewset')
router.register('collegeday', CollegeDayViewSet, 'collegeday_model_viewset')
urlpatterns = router.urls

urlpatterns.append(path("", index)),
urlpatterns.append(path("user/<int:pk>/", user_detail)),
urlpatterns.append(path("user_id_search/", User_ID_Search)),
urlpatterns.append(path("student/<int:pk>/", student_detail)),
urlpatterns.append(path("lecturer/<int:pk>/", lecturer_detail)),
urlpatterns.append(path("semester/<int:pk>/", semester_detail)),
urlpatterns.append(path("course/<int:pk>/", course_detail)),
urlpatterns.append(path("class/<int:pk>/", class_detail)),
urlpatterns.append(path("collegeday/<int:pk>/", collegeDay_detail)),



# urlpatterns = [
#     path("", index, name="home"),
#     path('', include(router.urls)),
#
#     path("user/", user_list),
#     path("user/<int:pk>/", user_detail),
#
#     path("student/", student_list),
#     path("student/<int:pk>/", student_detail),
#
#     path("lecturer/", lecturer_list),
#     path("lecturer/<int:pk>/", lecturer_detail),
#
#     path("semester/", semester_list),
#
#     path("class/", class_list),
#
#     path("course/", course_list),
#
#     path("collegeday/", collegeday_list),
#
#     # ------------------ login and logout ------------------
#     path('login/', views.LoginView.as_view(), name="login"),
#     path('logout/', views.LogoutView.as_view(), name="logout"),
# ]
