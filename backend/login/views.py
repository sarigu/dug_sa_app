from rest_framework import viewsets, status
from .serializers import TeacherSerializer, SubjectSerializer, TeacherSubjectSerializer,TeacherShortVersionSerializer, FindTeacherSerializer, BookmarkedTeachersSerializer, LanguageSerializer
from .models import Teacher, CustomUser, Subject, Teacher_Subject, Teacher_Language, Language, BookmarkedTeacher,TeachingFacility, Teacher_TeachingFacility
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.generics import ListAPIView, RetrieveAPIView 
import json
from django.core.paginator import Paginator

PAGINATION_LIMIT = 15; 

class TeacherView(viewsets.ModelViewSet):
    permissions_classes=[IsAuthenticated]
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()

    def retrieve(self, request, *args, **kwargs):
        teacher_id =  self.kwargs['pk'] 
        try:
            if request.user.role == "staff" or request.user.role == "teacher":
                teacher = Teacher.objects.get(pk = teacher_id)
                serializer = TeacherSerializer(teacher)
                return Response(serializer.data)
            else:
                raise ValueError('Already class')
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response()

    def partial_update(self, request, **kwargs):
        teacher_id =  self.kwargs['pk'] 
        print("partial update", teacher_id)
        try:
            if request.user.role == "staff":
                teacher = Teacher.objects.get(pk = teacher_id)
                data = json.loads(request.body)    
                print("data", data, "teacher", teacher)
                if data["isApproved"] == True:
                    teacher.is_approved = True
                    teacher.is_reviewed = True
                    teacher.save()
                elif data["isApproved"] == False:
                    teacher.is_approved = False
                    teacher.is_reviewed = True
                    teacher.save()
            else:
                raise ValueError('No access right')
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response({"status": "ok"})
    


class NewTeachersView(ListAPIView):
    permissions_classes=[IsAuthenticated]
    serializer_class = TeacherShortVersionSerializer
    def get_queryset(self):
        all_new_teachers = Teacher.objects.filter(provided_information=True).filter(is_approved=False).filter(is_reviewed=False)
        return all_new_teachers
  
class SubjectView(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()

class LanguageView(viewsets.ModelViewSet):
    serializer_class = LanguageSerializer
    queryset = Language.objects.all()

class TeacherSubjectView(viewsets.ViewSet):
    permissions_classes=[DjangoModelPermissions]
    serializer_class = TeacherSubjectSerializer

    def create(self, request):
        try: 
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
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response({'status': 'ok'})

class FindTeachersView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def list(self, request):
        try:
            all_teachers = []
            teachers = Teacher.objects.filter(is_approved=True)
            for teacher in teachers:
                teachers_subjects = Teacher_Subject.objects.filter(teacher=teacher)
                teachers_languages = Teacher_Language.objects.filter(teacher=teacher)
                teachers_facilities = Teacher_TeachingFacility.objects.filter(teacher=teacher)
                subjects = []
                languages = []
                teaching_facilities = []
                for elem in teachers_subjects:
                    subjectData = Subject.objects.get(pk=elem.subject.pk)
                    subjects.append(subjectData)
                for elem in teachers_languages:
                    languageData = Language.objects.get(pk=elem.language.pk)
                    languages.append(languageData)
                for elem in teachers_facilities:
                    facilityData = TeachingFacility.objects.get(pk=elem.teaching_facility.pk)
                    teaching_facilities.append(facilityData)
                
                bookmark = BookmarkedTeacher.objects.filter(user=self.request.user).filter(teacher=teacher)
                isBookmarked = False
                if(bookmark):
                    isBookmarked = True

                data = {'user': teacher.user, 'facilities': teaching_facilities, 'profile_image': teacher.profile_image, 'subjects':subjects , 'languages': languages, 'isBookmarked': isBookmarked, 'experience': teacher.years_of_experience}
                all_teachers.append(data)

            paginator = Paginator(all_teachers, PAGINATION_LIMIT) 
            page_number = self.request.GET.get('page')
            total_pages = paginator.num_pages

            if int(page_number) <= total_pages:
                page_obj = paginator.get_page(page_number)    
                serializer = FindTeacherSerializer(page_obj, many=True)
                return Response({'total_pages': total_pages, 'data': serializer.data})
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response([])

class BookmarkedTeachersView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def list(self, request):
        try:
            all_teachers = []
            BookmarkedTeachers = BookmarkedTeacher.objects.filter(user=request.user)
            if BookmarkedTeachers:
                for elem in BookmarkedTeachers:
                    teacher = Teacher.objects.get(pk = elem.teacher.pk)
                    if teacher.is_approved: 
                        teachers_subjects = Teacher_Subject.objects.filter(teacher=teacher)
                        teachers_languages = Teacher_Language.objects.filter(teacher=teacher)
                        teachers_facilities = Teacher_TeachingFacility.objects.filter(teacher=teacher)
                        subjects = []
                        languages = []
                        teaching_facilities = []
                        for elem in teachers_subjects:
                            subjectData = Subject.objects.get(pk=elem.subject.pk)
                            subjects.append(subjectData)
                        for elem in teachers_languages:
                            languageData = Language.objects.get(pk=elem.language.pk)
                            languages.append(languageData)
                        for elem in teachers_facilities:
                            facilityData = TeachingFacility.objects.get(pk=elem.teaching_facility.pk)
                            teaching_facilities.append(facilityData)

                        isBookmarked = True
                        data = {'user': teacher.user, 'facilities': teaching_facilities, 'profile_image': teacher.profile_image, 'subjects':subjects , 'languages': languages, 'isBookmarked': isBookmarked, 'experience': teacher.years_of_experience}
                        all_teachers.append(data)
            if all_teachers:
                serializer = FindTeacherSerializer(all_teachers, many=True)
                return Response(serializer.data)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response([])

    def create(self, request):
        try: 
            json_data = json.loads(request.body)
            teacherId = json_data["teacherId"]
            teacher = Teacher.objects.get(pk=teacherId)
            if BookmarkedTeacher.objects.filter(teacher=teacher).filter(user=request.user).exists():
                BookmarkedTeacher.objects.get(teacher=teacher, user=request.user).delete()
            else: 
                new_bookmark = BookmarkedTeacher(user = request.user, teacher = teacher)
                new_bookmark.save()
            response_data = {"status": "ok"}
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(response_data)


class FilterTeachersView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def list(self, request):
        try:
            subjectsFilter = request.data["subjectsFilter"]
            languageFilter = request.data["languageFilter"]
            filteredList = []
            teacher_id_list = []
            all_teachers = []
            if subjectsFilter and languageFilter:
                all_teacher_subjects = []
                all_teacher_languages= []
                for subjectId in subjectsFilter: 
                    subject = Subject.objects.get(pk = subjectId)
                    teacher_subjects = Teacher_Subject.objects.filter(subject=subject)
                    for elem in teacher_subjects:
                        all_teacher_subjects.append(elem)

                for languageId in languageFilter: 
                    language = Language.objects.get(pk =languageId)
                    teacher_languages = Teacher_Language.objects.filter(language=language)
                    for elem in teacher_languages:
                        all_teacher_languages.append(elem)


                for elemLanguage in all_teacher_languages:
                    for elemSubject in all_teacher_subjects:
                        if elemSubject.teacher.pk == elemLanguage.teacher.pk:
                            teacher_id_list.append(elemSubject.teacher.pk)

            elif subjectsFilter: 
                for subjectId in subjectsFilter: 
                    subject = Subject.objects.get(pk = subjectId)
                    teacher_subjects = Teacher_Subject.objects.filter(subject=subject)
                    ids = teacher_subjects.values_list('teacher', flat=True).distinct()
                    for elem in ids:
                        teacher_id_list.append(elem)
            elif languageFilter:
                for languageId in languageFilter: 
                    language = Language.objects.get(pk =languageId)
                    teacher_languages = Teacher_Language.objects.filter(language=language)
                    ids = teacher_languages.values_list('teacher', flat=True).distinct()
                    for elem in ids:
                        teacher_id_list.append(elem)
            else:
                return Response([])
        

            teacher_id_list = list(set(teacher_id_list))
            for elem in teacher_id_list:
                teacher = Teacher.objects.get(pk = elem)
                if teacher.is_approved: 
                    teachers_subjects = Teacher_Subject.objects.filter(teacher=teacher)
                    teachers_languages = Teacher_Language.objects.filter(teacher=teacher)
                    teachers_facilities = Teacher_TeachingFacility.objects.filter(teacher=teacher)
                    subjects = []
                    languages = []
                    teaching_facilities = []
                    for elem in teachers_subjects:
                        subjectData = Subject.objects.get(pk=elem.subject.pk)
                        subjects.append(subjectData)
                    for elem in teachers_languages:
                        languageData = Language.objects.get(pk=elem.language.pk)
                        languages.append(languageData)
                    for elem in teachers_facilities:
                        facilityData = TeachingFacility.objects.get(pk=elem.teaching_facility.pk)
                        teaching_facilities.append(facilityData)

                    bookmark = BookmarkedTeacher.objects.filter(user=self.request.user).filter(teacher=teacher)
                    isBookmarked = False
                    if(bookmark):
                        isBookmarked = True

                    data = {'user': teacher.user, 'facilities': teaching_facilities, 'profile_image': teacher.profile_image, 'subjects':subjects , 'languages': languages, 'isBookmarked': isBookmarked, 'experience': teacher.years_of_experience}
                    all_teachers.append(data)

            if(all_teachers): 
                paginator = Paginator(all_teachers, PAGINATION_LIMIT) 
                page_number = self.request.GET.get('page')
                total_pages = paginator.num_pages

                if int(page_number) <= total_pages:
                    page_obj = paginator.get_page(page_number)     
                    serializer = FindTeacherSerializer(page_obj, many=True)
                    return Response({'total_pages': total_pages, 'data': serializer.data})
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response([])
       
       