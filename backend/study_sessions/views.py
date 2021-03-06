from django.shortcuts import render
from rest_framework import viewsets,status
from .serializers import StudySessionSerializer, ParticipantSerializer, ParticipantStudySessionSerializer, ParticipantListSerializer
from .models import Participant, StudySession
from login.models import Subject, Language, CustomUser, TeachingFacility, Teacher
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

    def retrieve(self, request, *args, **kwargs):
        study_session_id =  self.kwargs['pk'] 
        try:
            if request.user.role == "staff":
                study_session = StudySession.objects.get(pk = study_session_id)
                all_participants = Participant.objects.filter(study_session=study_session)
                if len(all_participants) > 0:
                    serializerStudySession = StudySessionSerializer(study_session)
                    serializerParticipants = ParticipantListSerializer(all_participants, many=True)
                    response_data = {"studySession": serializerStudySession.data, "studySessionParticipants": serializerParticipants.data}
                else: 
                    serializer = StudySessionSerializer(study_session)
                    response_data = {"studySession": serializer.data}
            else:
                study_session = StudySession.objects.get(pk = study_session_id)
                serializer = StudySessionSerializer(study_session)
                response_data = {"studySession": serializer.data}
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(response_data)

    def create(self, request): 
        try:
            user = CustomUser.objects.get(email=request.user)
            if user.role == "teacher" or user.role == "staff":
                if user.role == "teacher":
                    teacher = Teacher.objects.get(pk=user.id)

                current_date = datetime.datetime.now()
                current_date = current_date.date()

                already_class = StudySession.objects.filter(teacher=teacher).filter(date=request.data["formattedDate"]).filter(start_time=request.data["startTime"]).exists()
                if already_class == True: 
                    raise ValueError('Already class')
            
                if current_date > datetime.datetime.strptime(request.data["formattedDate"], "%Y-%m-%d").date():
                    raise ValueError('Date needs to be in future')
                subject = request.data["subject"]
                subject = Subject.objects.get(name=subject)
                language = request.data["language"]
                language = Language.objects.get(language=language)        
                location = TeachingFacility.objects.get(pk=1)
                study_session = StudySession.objects.create(
                    subject = subject,
                    language = language,
                    start_time = request.data["startTime"], 
                    end_time = request.data["endTime"], 
                    date = request.data["formattedDate"], 
                    location=location,
                    teacher = teacher,
                    available_spots = request.data["spots"],
                    description = request.data["description"]
                )

                if(study_session):
                    response_data = {}
            else:
                raise ValueError('No access right')
        except Exception as e:
            print(e, "err")
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(response_data)

    def partial_update(self, request, **kwargs):
        study_session_id =  self.kwargs['pk'] 
        try:
            if request.user.role == "teacher" or request.user.role == "staff":
                study_session = StudySession.objects.get(pk = study_session_id)
                data = json.loads(request.body)    
                if data["isActive"] == False:
                    study_session.is_active = False
                    study_session.save()
                else:
                    if request.user.role == "teacher":
                        teacher = Teacher.objects.get(pk=request.user.id)
                        if not study_session.teacher == teacher:
                            raise ValueError('No access right')
               
                    subject = data["subject"]
                    subject = Subject.objects.get(name=subject)
                    language = data["language"]
                    language = Language.objects.get(language=language)
                    study_session.language = language
                    study_session.subject = subject
                    study_session.start_time = data["startTime"]
                    study_session.end_time = data["endTime"]
                    study_session.description = data["description"]
                    study_session.was_updated = True
                    study_session.save()
            else:
                raise ValueError('No access right')
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response({"status": "ok"})
    

class StudySessionsView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def retrieve(self, request):
        try: 
            if request.user.role == "student":
                #get all study sessions for that teacher
                all_booked_study_sessions = []
                all_study_sessions = []
                teacherId = request.data["teacherId"]
                teacher = Teacher.objects.get(pk=teacherId)
                study_sessions = StudySession.objects.filter(teacher = teacher)
                #get all study sessions for that student
                booked_study_sessions = Participant.objects.filter(user = request.user)
                if len(booked_study_sessions) > 0:
                    for booked_session in booked_study_sessions:
                        session_data = StudySession.objects.get(pk=booked_session.study_session.pk)
                        all_booked_study_sessions.append(session_data)
                if len(study_sessions) > 0: 
                    for study_session in study_sessions:
                        if study_session in all_booked_study_sessions:
                            continue
                        else:
                            all_study_sessions.append(study_session)

                serializer_all_study_sessions = StudySessionSerializer(all_study_sessions, many=True)
                serializer_booked_study_sessions = StudySessionSerializer(all_booked_study_sessions, many=True)
                return Response({'bookedSessions': serializer_booked_study_sessions.data, 'teachersSessions':serializer_all_study_sessions.data  })
            
            elif request.user.role == "teacher":
                teacherId = request.data["teacherId"]
                teacher = Teacher.objects.get(pk=teacherId)
                study_sessions = StudySession.objects.filter(teacher = teacher)
                serializer = StudySessionSerializer(study_sessions, many=True)
                return Response({ 'teachersSessions':serializer.data  })
            elif request.user.role == "staff": 
                study_sessions = StudySession.objects.all()
                serializer = StudySessionSerializer(study_sessions, many=True)
                return Response({ 'teachersSessions':serializer.data  })
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response()

    def list(self, request):
        user = CustomUser.objects.get(email=request.user)
        try:
            if user.role == "teacher":
                teacher = Teacher.objects.get(pk=user.id)
                current_date = datetime.datetime.now()
                current_date = current_date.date()
                type = request.GET.get('type')
                if type:
                    if type == "upcoming":
                        upcoming_study_sessions = StudySession.objects.filter(teacher=teacher).filter(date__gte = current_date).order_by('-date').reverse()
                      
                    elif type == "previous":
                        upcoming_study_sessions = StudySession.objects.filter(teacher=teacher).filter(date__lt = current_date).order_by('-date').reverse()
                    
                    if(len(upcoming_study_sessions) > 0): 
                        paginator = Paginator(upcoming_study_sessions, PAGINATION_LIMIT) 
                    
                        page_number = self.request.GET.get('page')
                        total_pages = paginator.num_pages

                        if int(page_number) <= total_pages:
                            page_obj = paginator.get_page(page_number)         
                            serializer = StudySessionSerializer(page_obj, many=True)
                            response_data = {"status": "ok", 'total_pages': total_pages, 'allStudySessions': serializer.data}
                else: 
                    study_sessions = StudySession.objects.filter(teacher=teacher).filter(date__gte = current_date).order_by('-date').reverse()[:5]
                    serializer = StudySessionSerializer(study_sessions, many=True)
                    response_data = {"status": "ok", "upcomingStudySessions": serializer.data}
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(response_data)
 


class ParticipantView(viewsets.ViewSet):    
    permissions_classes=[IsAuthenticated]
    serializer_class = ParticipantSerializer

    def create(self, request):
        study_session_id = request.data["studySessionId"]
        user = CustomUser.objects.get(email=request.user)
        study_session = StudySession.objects.get(pk=study_session_id)
        current_date = datetime.datetime.now()
        already_participant = Participant.objects.filter(user=user).filter(study_session=study_session).exists()
        already_class = Participant.objects.filter(user=user).filter(study_session__date=study_session.date).filter(study_session__start_time=study_session.start_time).exists()
        try:
            if study_session.taken_spots < study_session.available_spots and user.role == "student" and study_session.date >= current_date.date() and already_participant == False and study_session.is_active == True and already_class == False:
                study_session.taken_spots += 1
                study_session.save()
                participant = Participant()
                participant.user = user
                participant.study_session = study_session
                participant.save()
                response_data = {"status": "ok"}
            else: 
                raise ValueError('Already class or no spots or class in past or already participant')
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(response_data)
    

    def destroy(self, request, pk=None):
        try:
            study_session = request.GET.get('session')
            user = CustomUser.objects.get(email=request.user)
            study_session_participation = Participant.objects.filter(study_session=study_session).filter(user=user)
            study_session_participation.delete()
            response_data = {"status": "ok"}
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(response_data)

    def list(self, request):
        try:
            user = CustomUser.objects.get(email=request.user)
            if user.role == "student":
                current_date = datetime.datetime.now()
                current_date = current_date.date()
                type = request.GET.get('type')
                if type:
                    if type == "upcoming":
                        upcoming_study_sessions = Participant.objects.filter(user=user).filter(study_session__date__gte = current_date).order_by('-study_session__date').reverse()
                      
                    elif type == "previous":
                        upcoming_study_sessions = Participant.objects.filter(user=user).filter(study_session__date__lt = current_date).order_by('-study_session__date').reverse()
                    
                    if(upcoming_study_sessions): 
                        paginator = Paginator(upcoming_study_sessions, PAGINATION_LIMIT) 
                        page_number = self.request.GET.get('page')
                        total_pages = paginator.num_pages

                        if int(page_number) <= total_pages:
                            page_obj = paginator.get_page(page_number)          
                            serializer = ParticipantStudySessionSerializer(page_obj, many=True)
                            response_data = {"status": "ok", 'total_pages': total_pages, 'allStudySessions': serializer.data}
                else: 
                    study_session_participations = Participant.objects.filter(user=user).filter(study_session__date__gte = current_date).order_by('-study_session__date').reverse()[:5]
                    serializer = ParticipantStudySessionSerializer(study_session_participations, many=True)
                    response_data = {"status": "ok", "upcomingStudySessions": serializer.data}
            else:
                raise ValueError('Only for students')
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(response_data)



      