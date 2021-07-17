from rest_framework import viewsets
from .serializers import TeacherSerializer, SubjectSerializer, TeacherSubjectSerializer,TeacherShortVersionSerializer, FindTeacherSerializer
from .models import Teacher, CustomUser, Subject, Teacher_Subject, Teacher_Language, Language
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.generics import ListAPIView, RetrieveAPIView

# Create your views here.
class TeacherView(viewsets.ModelViewSet):
    permissions_classes=[DjangoModelPermissions]
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()

class newTeachers(ListAPIView):
    serializer_class = TeacherShortVersionSerializer
    def get_queryset(self):
        all_new_teachers = Teacher.objects.filter(provided_information=True).filter(is_approved=False)
        return all_new_teachers

class findTeachers(ListAPIView):
    serializer_class = FindTeacherSerializer
    def get_queryset(self):
        all_teachers = []
        teachers = Teacher.objects.filter(is_approved=True)
        for teacher in teachers:
            teachers_subjects = Teacher_Subject.objects.filter(teacher=teacher)
            teachers_languages = Teacher_Language.objects.filter(teacher=teacher)
            subjects = []
            languages = []
            for subject in teachers_subjects:
                print(subject)
                subjectData = Subject.objects.get(pk=subject.subject.pk)
                print(subjectData)
                subjects.append(subjectData)
            for language in teachers_languages:
                print(language)
                languageData = Language.objects.get(pk=language.language.pk)
                languages.append(languageData)
            data = {'first_name': teacher.user.first_name,'last_name': teacher.user.last_name, 'city': teacher.city, 'profile_image': teacher.profile_image, 'subjects':subjects , 'languages': languages}
            all_teachers.append(data)

        print(all_teachers)
        return all_teachers
  
class SubjectView(viewsets.ModelViewSet):
    permissions_classes=[DjangoModelPermissions]
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()

class TeacherSubjectView(viewsets.ViewSet):
    permissions_classes=[DjangoModelPermissions]
    serializer_class = TeacherSubjectSerializer

    def create(self, request):
        subjects = request.data["subjects"]
        user = CustomUser.objects.get(email=self.request.user)
        teacher = Teacher.objects.get(user=user)
        for elem in subjects:
            subject = Subject.objects.get(pk=elem)
            if Teacher_Subject.objects.filter(subject=subject).filter(teacher=teacher).exists():
                continue
            else:
                teachers_subject = Teacher_Subject()
                teachers_subject.teacher = teacher
                teachers_subject.subject = subject
                teachers_subject.save()

        return Response({'status': 'ok'})
