from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()                     
#router.register(r'studysessions', views.StudySessionsView, 'studysessions') 

urlpatterns = [
    path("studysessions/", views.StudySessionsView.as_view({ 'post': 'list'})),
] + router.urls 