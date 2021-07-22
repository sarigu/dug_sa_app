from rest_framework import viewsets
from .serializers import TeacherSerializer, SubjectSerializer, TeacherSubjectSerializer,TeacherShortVersionSerializer, FindTeacherSerializer, BookmarkedTeachersSerializer, LanguageSerializer
from .models import Teacher, CustomUser, Subject, Teacher_Subject, Teacher_Language, Language, Bookmarked_Teacher
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.generics import ListAPIView, RetrieveAPIView 
import json
from django.core.paginator import Paginator


class TeacherView(viewsets.ModelViewSet):
    permissions_classes=[IsAuthenticated]
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()

class NewTeachersView(ListAPIView):
    permissions_classes=[IsAuthenticated]
    serializer_class = TeacherShortVersionSerializer
    def get_queryset(self):
        all_new_teachers = Teacher.objects.filter(provided_information=True).filter(is_approved=False)
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

class FindTeachersView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def list(self, request):
        all_teachers = []
        teachers = Teacher.objects.filter(is_approved=True)
        for teacher in teachers:
            teachers_subjects = Teacher_Subject.objects.filter(teacher=teacher)
            teachers_languages = Teacher_Language.objects.filter(teacher=teacher)
            subjects = []
            languages = []
            for subject in teachers_subjects:
                subjectData = Subject.objects.get(pk=subject.subject.pk)
                subjects.append(subjectData)
            for language in teachers_languages:
                languageData = Language.objects.get(pk=language.language.pk)
                languages.append(languageData)
            
            bookmark = Bookmarked_Teacher.objects.filter(user=self.request.user).filter(teacher=teacher)
            isBookmarked = False
            if(bookmark):
                isBookmarked = True

            data = {'user': teacher.user, 'city': teacher.city, 'profile_image': teacher.profile_image, 'subjects':subjects , 'languages': languages, 'isBookmarked': isBookmarked}
            all_teachers.append(data)

        paginator = Paginator(all_teachers, 2) 
        page_number = self.request.GET.get('page')
        total_pages = paginator.num_pages
        print("total_pages--", total_pages)

        if int(page_number) <= total_pages:
            page_obj = paginator.get_page(page_number)       
            serializer = FindTeacherSerializer(page_obj, many=True)
            return Response({'total_pages': total_pages, 'data': serializer.data})

        return Response([])

class BookmarkedTeachersView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def list(self, request):
        all_teachers = []
        bookmarked_teachers = Bookmarked_Teacher.objects.filter(user=request.user)
        print("bookmarked_teachers", bookmarked_teachers)
        if bookmarked_teachers:
            for elem in bookmarked_teachers:
                print("teacher in bookmarked_teachers", elem.teacher, elem.teacher.pk)
                teacher = Teacher.objects.get(pk = elem.teacher.pk)
                if teacher.is_approved: 
                    teachers_subjects = Teacher_Subject.objects.filter(teacher=teacher)
                    teachers_languages = Teacher_Language.objects.filter(teacher=teacher)
                    subjects = []
                    languages = []
                    for subject in teachers_subjects:
                        subjectData = Subject.objects.get(pk=subject.subject.pk)
                        subjects.append(subjectData)
                    for language in teachers_languages:
                        languageData = Language.objects.get(pk=language.language.pk)
                        languages.append(languageData)

                    isBookmarked = True
                    data = {'user': teacher.user, 'city': teacher.city, 'profile_image': teacher.profile_image, 'subjects':subjects , 'languages': languages, 'isBookmarked': isBookmarked}
                    all_teachers.append(data)
        if all_teachers:
            serializer = FindTeacherSerializer(all_teachers, many=True)
            return Response(serializer.data)
        return Response([])

    def create(self, request):
        try: 
            json_data = json.loads(request.body)
            teacherId = json_data["teacherId"]
            teacher = Teacher.objects.get(pk=teacherId)
            if Bookmarked_Teacher.objects.filter(teacher=teacher).filter(user=request.user).exists():
                Bookmarked_Teacher.objects.get(teacher=teacher, user=request.user).delete()
            else: 
                new_bookmark = Bookmarked_Teacher(user = request.user, teacher = teacher)
                new_bookmark.save()
            response_data = {"status": "ok"}
        except Exception as e:
            response_data = {"status": "error"}

        return Response(response_data)


class FilterTeachersView(viewsets.ViewSet):
    permissions_classes=[IsAuthenticated]
    def list(self, request):
        selectedOptions = request.data["selectedOptions"]
        filteredBy = request.data["filterBy"]
        filteredList = []
        teacher_id_list = []
        all_teachers = []
        print("hello", selectedOptions, filteredBy)
        if filteredBy == "subjects": 
            for subjectId in selectedOptions: 
                print("---------")
                subject = Subject.objects.get(pk = subjectId)
                print(subject)
                teacher_subjects = Teacher_Subject.objects.filter(subject=subject)
                ids = teacher_subjects.values_list('teacher', flat=True).distinct()
                for elem in ids:
                    teacher_id_list.append(elem)
        elif filteredBy == "languages": 
            print("languages")
            for languageId in selectedOptions: 
                print("---------")
                language = Language.objects.get(pk =languageId)
                print(language)
                teacher_language = Teacher_Language.objects.filter(language=language)
                ids = teacher_language.values_list('teacher', flat=True).distinct()
                for elem in ids:
                    teacher_id_list.append(elem)
        teacher_id_list = list(set(teacher_id_list))
        for elem in teacher_id_list:
            teacher = Teacher.objects.get(pk = elem)
            if teacher.is_approved: 
                print(teacher)
                teachers_subjects = Teacher_Subject.objects.filter(teacher=teacher)
                teachers_languages = Teacher_Language.objects.filter(teacher=teacher)
                subjects = []
                languages = []
                for subject in teachers_subjects:
                    subjectData = Subject.objects.get(pk=subject.subject.pk)
                    subjects.append(subjectData)
                for language in teachers_languages:
                    languageData = Language.objects.get(pk=language.language.pk)
                    languages.append(languageData)

                bookmark = Bookmarked_Teacher.objects.filter(user=self.request.user).filter(teacher=teacher)
                isBookmarked = False
                if(bookmark):
                    isBookmarked = True

                data = {'user': teacher.user, 'city': teacher.city, 'profile_image': teacher.profile_image, 'subjects':subjects , 'languages': languages, 'isBookmarked': isBookmarked}
                all_teachers.append(data)
        print(all_teachers, "all_teachers")
        if(all_teachers): 
            paginator = Paginator(all_teachers, 2) 
            page_number = self.request.GET.get('page')
            total_pages = paginator.num_pages
            print("total_pages--", total_pages)

            if int(page_number) <= total_pages:
                print("send")
                page_obj = paginator.get_page(page_number)       
                serializer = FindTeacherSerializer(page_obj, many=True)
                return Response({'total_pages': total_pages, 'data': serializer.data})

        return Response([])
       
       