from .models import Subject, Teacher_Subject,AccessCode, Teacher, CustomUser
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError

# Create your tests here.
USER_MODEL = get_user_model()

class UserModel(TestCase):

    @classmethod
    def setUpTestData(cls):

        cls.accessCode = AccessCode.objects.create(
            code="dug teacher test code",
            is_active = True
        )

        cls.inactiveAccessCode = AccessCode.objects.create(
            code="dug test code",
            is_active = False
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

        cls.subject2 = Subject.objects.create(
            name='Biology',
            color='green'
        )

        cls.teacher_subject_relation = Teacher_Subject.objects.create(
            teacher=cls.teacher,
            subject=cls.subject
        )

    def test_create_user_with_wrong_access_code(self):
        "expect that value error will be raised"
        with self.assertRaises(Exception) as raised:
            user = CustomUser.objects.create_user(
                email='jessie@test.com',
                first_name='Jessie',
                last_name='Reyez',
                password='password456',
                role="student",
                access_code="wrong test access code 1234",
                is_active = True
            )
        self.assertEqual(ValueError, type(raised.exception))

    def test_create_user_with_inactive_access_code(self):
        "expect that value error will be raised"
        with self.assertRaises(Exception) as raised:
            user = CustomUser.objects.create_user(
                email='jessie@test.com',
                first_name='Jessie',
                last_name='Reyez',
                password='password456',
                role="student",
                access_code="dug test code",
                is_active = True
            )
        self.assertEqual(ValueError, type(raised.exception))

    def test_create_user_with_no_access_code(self):
        "expect that value error will be raised"
        with self.assertRaises(Exception) as raised:
            user = CustomUser.objects.create_user(
                email='jessie@test.com',
                first_name='Jessie',
                last_name='Reyez',
                password='password456',
                role="student",
                access_code="",
                is_active = True
            )
        self.assertEqual(ValueError, type(raised.exception))

    def test_create_user_with_active_access_code(self):
        "expect that user will be created"
        user = CustomUser.objects.create_user(
            email='jessie@test.com',
            first_name='Jessie',
            last_name='Reyez',
            password='password456',
            role="student",
            access_code="dug teacher test code",
            is_active = True
            )
        self.assertEqual(user.email, 'jessie@test.com')
        self.assertEqual(user.first_name, 'Jessie')
        self.assertEqual(user.last_name, 'Reyez')
        self.assertEqual(user.role, 'student')
        self.assertNotEqual(user.password, 'password456')
        self.assertEqual(user.access_code, 'dug teacher test code')
        self.assertEqual(user.is_active, True)
