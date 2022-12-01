from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
# from rest_framework.routers import DefaultRouter
from assignment2.views import User_logout

# router = DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("assignment2.urls")),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', obtain_auth_token),
    path("logout/", User_logout),

]

