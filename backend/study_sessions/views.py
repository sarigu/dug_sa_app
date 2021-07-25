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
from login.models import Teacher, CustomUser
import datetime

# Create your views here.

class StudySessionView(viewsets.ModelViewSet):
    permissions_classes=[IsAuthenticated]
    serializer_class = StudySessionSerializer
    queryset = StudySession.objects.all()
    
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
            print(booked_study_sessions, "booked_study_sessions")
            if booked_study_sessions:
                print("in if")
                for booked_session in booked_study_sessions:
                    print(booked_session, "booked_session")
                    session_data = StudySession.objects.get(pk=booked_session.study_session.pk)
                    print("-------------", session_data)
                    all_booked_study_sessions.append(session_data)
            if study_sessions: 
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
 
class ParticipantView(viewsets.ViewSet):    
    permissions_classes=[IsAuthenticated]
    serializer_class = ParticipantSerializer

    def create(self, request):
        study_session_id = request.data["studySessionId"]
        user = CustomUser.objects.get(email=request.user)
        study_session = StudySession.objects.get(pk=study_session_id)
        current_date = datetime.datetime.now()
        print("study_session.date >= current_date.date()", study_session.date >= current_date.date())
        already_participant = Participant.objects.filter(user=user).filter(study_session=study_session).exists()
        print(already_participant, "already_participant")
        
        try:
            if study_session.taken_spots < study_session.available_spots and user.role == "student" and study_session.date >= current_date.date() and already_participant == False:
                study_session.taken_spots += 1
                study_session.save()
                print(user, study_session)
                participant = Participant()
                participant.user = user
                participant.study_session = study_session
                participant.save()
                print("success")
                response_data = {"status": "ok"}
            else: 
                print("no more spots or no student", study_session.taken_spots, study_session.available_spots, user)
                response_data = {"status": "error"}
        except Exception as e:
            response_data = {"status": "error"}

        return Response(response_data)

    def destroy(self, request, pk=None):
        try:
            study_session = request.GET.get('session')
            user = CustomUser.objects.get(email=request.user)
            study_session_participation = Participant.objects.filter(study_session=study_session).filter(user=user)
            print(study_session_participation, "study_session_participation")
            study_session_participation.delete()
            response_data = {"status": "ok"}
        except Exception as e:
            response_data = {"status": "error"}
        return Response(response_data)