from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()                     
router.register(r'studysession', views.StudySessionView, 'studysession') 

urlpatterns = [
    path("studysessions/", views.StudySessionsView.as_view({ 'post': 'list'})),
] + router.urls 