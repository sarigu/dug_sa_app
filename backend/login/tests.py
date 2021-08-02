from .models import Subject, Teacher_Subject,AccessCode, Teacher
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError

# Create your tests here.
USER_MODEL = get_user_model()

class Teacher_SubjectModel(TestCase):

    @classmethod
    def setUpTestData(cls):

        cls.accessCode = AccessCode.objects.create(
            code="dug_teacher",
            is_active = True
        )

        cls.user = USER_MODEL.objects.create_user(
            email='janedoe@test.com',
            first_name='Jane',
            last_name='Doe',
            password='password456',
            role="teacher",
            access_code="dug_teacher",
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


    def test_create_teacher_subject_relation(self):
        new_subject_relation = Teacher_Subject.objects.create(
            teacher=self.teacher,
            subject=self.subject2
        )
        self.assertEqual(new_subject_relation.subject, self.subject2)
    

    def test_create_same_teacher_subject_relation(self):
        "expect that no new object will be created"
        with self.assertRaises(Exception) as raised:  # top level exception as we want to figure out its exact type
            same_subject_relation = Teacher_Subject.objects.create(
                teacher=self.teacher,
                subject=self.subject
            )
        self.assertEqual(IntegrityError, type(raised.exception))