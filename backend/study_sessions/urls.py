from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()                     
router.register(r'studysessions', views.StudySessionView, 'studysessions') 

urlpatterns = [
] + router.urls 