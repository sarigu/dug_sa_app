from .models import StudySession, Participant
from login.models import Teacher, CustomUser, AccessCode, Subject, Language, TeachingFacility
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError

# Create your tests here.
USER_MODEL = get_user_model()

class StudySessionAndParticipantModel(TestCase):

    @classmethod
    def setUpTestData(cls):

        cls.accessCode = AccessCode.objects.create(
            code="dug teacher test code",
            is_active = True
        )

        cls.user = USER_MODEL.objects.create_user(
            email='janedoe@test.com',
            first_name='Jane',
            last_name='Doe',
            password='password456',
            role="teacher",
            access_code="dug teacher test code",
            is_active = True
        )

        cls.teacher = Teacher.objects.create(
            user=cls.user
        )

        cls.subject = Subject.objects.create(
            name='Math',
            color='Blue'
        )

        cls.langauge = Language.objects.create(
            language='English',
        )

        cls.facility = TeachingFacility.objects.create(
            name = 'Test Center'
        )

        cls.study_session = StudySession.objects.create(
            is_active = True,
            subject = cls.subject,
            language = cls.langauge,
            start_time = "11:00:00",
            end_time = "12:00:00",
            date = "2021-09-04",
            location = cls.facility,
            teacher = cls.teacher,
        )

        cls.participation = Participant.objects.create(
            user=cls.user,
            study_session=cls.study_session
        )

    def test_create_study_session_with_only_mandatory_fields(self):
        "expect that user will be created with default values for not passed data"
        self.assertEqual(self.study_session.date, '2021-09-04')
        self.assertEqual(self.study_session.start_time, '11:00:00')
        self.assertEqual(self.study_session.end_time, '12:00:00')
        self.assertTrue(hasattr(self.study_session, 'available_spots'))
        self.assertTrue(hasattr(self.study_session, 'taken_spots'))
        self.assertTrue(hasattr(self.study_session, 'description'))
        self.assertTrue(hasattr(self.study_session, 'was_updated'))
        self.assertTrue(hasattr(self.study_session, 'is_active'))


    def test_create_study_session_participation(self):
        "expect that an object will be created"
        another_study_session = StudySession.objects.create(
            is_active = True,
            subject = self.subject,
            language = self.langauge,
            start_time = "13:00:00",
            end_time = "14:00:00",
            date = "2021-11-05",
            location = self.facility,
            teacher = self.teacher,
        )
        
        new_participation = Participant.objects.create(
            user=self.user,
            study_session= another_study_session
        )
        self.assertEqual(new_participation.user, self.user)
        self.assertEqual(new_participation.study_session, another_study_session)
    

    def test_create_same_study_session_participation(self):
        "expect that no new object will be created"
        with self.assertRaises(Exception) as raised:  
            same_participation = Participant.objects.create(
                user=self.user,
                study_session=self.study_session
            )
        self.assertEqual(IntegrityError, type(raised.exception))
      
   