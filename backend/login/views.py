from rest_framework import viewsets
from .serializers import TeacherSerializer, SubjectSerializer, TeacherSubjectSerializer,TeacherShortVersionSerializer
from .models import Teacher, CustomUser, Subject, Teacher_Subject
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
        newTeachers = Teacher.objects.filter(provided_information=True).filter(is_approved=False)
        return newTeachers
  
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
