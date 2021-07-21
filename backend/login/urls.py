from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()                     
router.register(r'teachers', views.TeacherView, 'teacher') 
router.register(r'subjects', views.SubjectView, 'subjects') 
router.register(r'languages', views.LanguageView, 'languages') 
router.register(r'subjects_to_teach', views.TeacherSubjectView, 'subjects_to_teach') 

urlpatterns = [
    path("new_teachers/", views.NewTeachersView.as_view()),
    path("find/teachers/", views.FindTeachersView.as_view({'get': 'list'})),
    path("bookmarked/teachers/", views.BookmarkedTeachersView.as_view({'get': 'list', 'post': 'create'})),
    path("filter/teachers/", views.FilterTeachersView.as_view({ 'post': 'list'})),
] + router.urls 