from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers                    
from login import views                            
        
router = routers.DefaultRouter()                     
router.register(r'teachers', views.TeacherView, 'teacher') 
router.register(r'subjects', views.SubjectView, 'subjects') 
router.register(r'subjects_to_teach', views.TeacherSubjectView, 'subjects_to_teach') 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

