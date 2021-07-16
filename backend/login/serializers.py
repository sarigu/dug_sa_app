from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Teacher, Subject, Teacher_Subject

User = get_user_model()

class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'role')

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Teacher
        fields = '__all__'
      
    def to_representation(self, instance):
        data = super(TeacherSerializer, self).to_representation(instance)
        user = data.pop('user')
        for key, val in user.items():
            data.update({key: val})
        return data

class TeacherShortVersionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Teacher
        fields = ('user', 'profile_image', 'is_approved', 'provided_information')
      
    def to_representation(self, instance):
        data = super(TeacherShortVersionSerializer, self).to_representation(instance)
        user = data.pop('user')
        for key, val in user.items():
            data.update({key: val})
        return data

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class TeacherSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher_Subject
        fields = '__all__'