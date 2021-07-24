from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import StudySession, Participant
from login.serializers import TeacherSerializer, SubjectSerializer, UserSerializer, TeachingFacilitySerializer

class StudySessionSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    subject = SubjectSerializer()
    location = TeachingFacilitySerializer()
    class Meta:
        model = StudySession
        fields = '__all__'
      
class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Participant
        fields = '__all__'
      