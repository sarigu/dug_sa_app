from django.shortcuts import render
from rest_framework import viewsets
from .serializers import StudySessionSerializer, ParticipantSerializer
from .models import Participant, StudySession
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView 
import json
from django.core.paginator import Paginator

# Create your views here.
class StudySessionView(viewsets.ModelViewSet):
    permissions_classes=[IsAuthenticated]
    serializer_class = StudySessionSerializer
    queryset = StudySession.objects.all()
    print(queryset, "study sessions")