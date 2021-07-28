from django.shortcuts import render
from rest_framework import viewsets
from .serializers import StudySessionSerializer, ParticipantSerializer, ParticipantStudySessionSerializer
from .models import Participant, StudySession
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView 
import json
from django.core.paginator import Paginator
from login.models import Teacher, CustomUser
import datetime

PAGINATION_LIMIT = 15; 

# Create your views here.

class StudySessionView(viewsets.ModelViewSet):
    permissions_classes=[IsAuthenticated]
    serializer_class = StudySessionSerializer
    queryset = StudySession.objects.all()
    
class StudySessionsView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def retrieve(self, request):
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

    def list(self, request):
        user = CustomUser.objects.get(email=request.user)
        try:
            if user.role == "teacher":
                teacher = Teacher.objects.get(pk=user.id)
                print("its a teacher")
                current_date = datetime.datetime.now()
                current_date = current_date.date()
                type = request.GET.get('type')
                if type:
                    if type == "upcoming":
                        print("all upcoming")
                        upcoming_study_sessions = StudySession.objects.filter(teacher=teacher).filter(date__gte = current_date).order_by('-date').reverse()
                        print("up---------", upcoming_study_sessions)
                      
                    elif type == "previous":
                        print("prev")
                        upcoming_study_sessions = StudySession.objects.filter(teacher=teacher).filter(date__lt = current_date).order_by('-date').reverse()
                        print("prev-------", upcoming_study_sessions)
                    
                    if(upcoming_study_sessions): 
                        print("yes", request.GET.get('page'))
                        paginator = Paginator(upcoming_study_sessions, PAGINATION_LIMIT) 
                    
                        page_number = self.request.GET.get('page')
                        print(page_number, "page_number")
                        total_pages = paginator.num_pages

                        if int(page_number) <= total_pages:
                            print(page_number, total_pages, "page_number, total_pages")
                            page_obj = paginator.get_page(page_number)     
                            print(page_obj, "page-obj")      
                            serializer = StudySessionSerializer(page_obj, many=True)
                   
                            response_data = {"status": "ok", 'total_pages': total_pages, 'allStudySessions': serializer.data}
                else: 
                    print("no type")
                    study_sessions = StudySession.objects.filter(teacher=teacher).filter(date__gte = current_date).order_by('-date').reverse()[:5]
                    print("teacher 5 sessions", study_sessions)
                    serializer = StudySessionSerializer(study_sessions, many=True)
                    response_data = {"status": "ok", "upcomingStudySessions": serializer.data}
        except Exception as e:
            print(e)
            response_data = {"status": "error"}
        return Response(response_data)
 
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

    def list(self, request):
        try:
            user = CustomUser.objects.get(email=request.user)
            if user.role == "student":
                current_date = datetime.datetime.now()
                current_date = current_date.date()
                print(user, current_date)
                type = request.GET.get('type')
                if type:
                    if type == "upcoming":
                        print("upcoming")
                        upcoming_study_sessions = Participant.objects.filter(user=user).filter(study_session__date__gte = current_date).order_by('-study_session__date').reverse()
                        print("up---------", upcoming_study_sessions)
                      
                    elif type == "previous":
                        print("prev")
                        upcoming_study_sessions = Participant.objects.filter(user=user).filter(study_session__date__lt = current_date).order_by('-study_session__date').reverse()
                        print("prev-------", upcoming_study_sessions)
                    
                    if(upcoming_study_sessions): 
                        print("yes", request.GET.get('page'))
                        paginator = Paginator(upcoming_study_sessions, PAGINATION_LIMIT) 
                        print(paginator, "paginator")
                        page_number = self.request.GET.get('page')
                        print(page_number, "page_number")
                        total_pages = paginator.num_pages

                        if int(page_number) <= total_pages:
                            print(page_number, total_pages, "page_number, total_pages")
                            page_obj = paginator.get_page(page_number)     
                            print(page_obj, "page-obj")      
                            serializer = ParticipantStudySessionSerializer(page_obj, many=True)
                            print(serializer.data, "serializer")
                            response_data = {"status": "ok", 'total_pages': total_pages, 'allStudySessions': serializer.data}
                else: 
                    print("no type")
                    study_session_participations = Participant.objects.filter(user=user).filter(study_session__date__gte = current_date).order_by('-study_session__date').reverse()[:5]
                    print("1", study_session_participations)
                    serializer = ParticipantStudySessionSerializer(study_session_participations, many=True)
                    response_data = {"status": "ok", "upcomingStudySessions": serializer.data}
            else:
                response_data = {"status": "error"}
        except Exception as e:
            print(e)
            response_data = {"status": "error"}
        return Response(response_data)



      