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
from login.models import Teacher

# Create your views here.
class StudySessionsView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def list(self, request):
        if request.user.role == "student":
            #get all study sessions for that teacher
            all_booked_study_sessions = []
            all_study_sessions = []
            teacherId = request.data["teacherId"]
            teacher = Teacher.objects.get(pk=teacherId)
            print("teacherId--", teacherId, request.user, teacher)
            study_sessions = StudySession.objects.filter(teacher = teacher)
            print(study_sessions, "study sessions")
            #get all study sessions for that student
            booked_study_sessions = Participant.objects.filter(user = request.user)
            for booked_session in booked_study_sessions:
                session_data = StudySession.objects.get(pk=booked_session.pk)
                print("-------------", session_data)
                all_booked_study_sessions.append(session_data)
            for study_session in study_sessions:
                print(">>>>", study_session)
                if study_session in all_booked_study_sessions:
                    print("schon drin")
                    continue
                else:
                    print("noch nicht")
                    all_study_sessions.append(study_session)
            
            print("END", all_study_sessions)
            serializer_all_study_sessions = StudySessionSerializer(all_study_sessions, many=True)
            serializer_booked_study_sessions = StudySessionSerializer(all_booked_study_sessions, many=True)

            return Response({'bookedSessions': serializer_booked_study_sessions.data, 'teachersSessions':serializer_all_study_sessions.data  })
        return Response()
 