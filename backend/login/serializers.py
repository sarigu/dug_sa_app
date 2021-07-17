from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Teacher, Subject, Teacher_Subject, Language, Bookmarked_Teacher

User = get_user_model()

class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'role')

class UserShortVersionSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')

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
    user = UserShortVersionSerializer()
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

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class FindTeacherSerializer(serializers.Serializer):
    user = UserShortVersionSerializer()
    city = serializers.CharField(max_length=255)
    profile_image = serializers.ImageField()
    subjects = SubjectSerializer(many=True)
    languages = LanguageSerializer(many=True)
    isBookmarked = serializers.BooleanField()

class BookmarkedTeachersSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    teacher = TeacherShortVersionSerializer()
    class Meta:
        model = Bookmarked_Teacher
        fields = '__all__'