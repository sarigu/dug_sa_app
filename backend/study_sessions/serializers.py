from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import StudySession, Participant
from login.serializers import TeacherSerializer, SubjectSerializer, UserSerializer, TeachingFacilitySerializer, LanguageSerializer

class StudySessionSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    subject = SubjectSerializer()
    location = TeachingFacilitySerializer()
    language = LanguageSerializer()
    class Meta:
        model = StudySession
        fields = '__all__'
      
class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    study_session = StudySessionSerializer()
    class Meta:
        model = Participant
        fields = '__all__'

class ParticipantStudySessionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    study_session = StudySessionSerializer()
    class Meta:
        model = Participant
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super(ParticipantStudySessionSerializer, self).to_representation(instance)
        study_session = data.pop('study_session')
        for key, val in study_session.items():
            data.update({key: val})
        return data
      
      