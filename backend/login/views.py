from rest_framework import viewsets
from .serializers import TeacherSerializer
from .models import Teacher, CustomUser
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissions


# Create your views here.
class TeacherView(viewsets.ModelViewSet):
    permissions_classes=[DjangoModelPermissions]
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()