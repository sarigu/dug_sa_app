from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()                     
router.register(r'teacher', views.TeacherView, 'teacher') 
router.register(r'accessCodes', views.AccessCodesView, 'accessCodes') 
router.register(r'subjects', views.SubjectView, 'subjects') 
router.register(r'languages', views.LanguageView, 'languages') 

urlpatterns = [
    path("new/teachers/", views.NewTeachersView.as_view()),
    path("teachers/", views.TeachersView.as_view({'get': 'list'})),
    path("rejected/teachers/", views.RejectedTeachersView.as_view({'get': 'list'})),
    path("bookmarked/teachers/", views.BookmarkedTeachersView.as_view({'get': 'list', 'post': 'create'})),
    path("filter/teachers/", views.FilterTeachersView.as_view({ 'post': 'list'})),
    path("inactive/accessCodes/", views.InactiveAccessCodesView.as_view({ 'get': 'list'})),
] + router.urls 