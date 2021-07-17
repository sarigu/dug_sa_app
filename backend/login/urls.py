from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()                     
router.register(r'teachers', views.TeacherView, 'teacher') 
router.register(r'subjects', views.SubjectView, 'subjects') 
router.register(r'subjects_to_teach', views.TeacherSubjectView, 'subjects_to_teach') 

urlpatterns = [
    path("new_teachers", views.newTeachers.as_view()),
    path("find/teachers", views.findTeachers.as_view()),
    path("bookmarked/teachers/", views.bookmarkedTeachers.as_view({'get': 'list', 'post': 'create'})),
] + router.urls 