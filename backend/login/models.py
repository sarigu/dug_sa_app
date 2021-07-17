from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.dispatch import receiver
from djoser.signals import user_registered
from phonenumber_field.modelfields import PhoneNumberField

class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, user_name, first_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        code = extra_fields.get('access_code')
        if AccessCode.objects.filter(code=code).filter(is_active=True).exists():
            email = self.normalize_email(email)
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save()       
        else:
            raise ValueError('Wrong access code')

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=25)
    access_code = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role', 'access_code']
    
    def __str__(self):
        return self.email


class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    phone = PhoneNumberField(blank=True)
    #address
    street = models.CharField(max_length=255, blank=True, null=True)
    postal_code = models.CharField( max_length=50, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    proof_of_address = models.ImageField( upload_to="teachers/addressProof/" , blank=True, null=True)
    #education
    degree = models.CharField(max_length=255, blank=True, null=True)
    university = models.CharField(max_length=255, blank=True, null=True)
    year_of_graduation = models.DateField( blank=True, null=True)
    #experience
    years_of_experience = models.IntegerField( blank=True, null=True)
    last_workplace = models.CharField(max_length=255, blank=True, null=True)
    last_position = models.CharField(max_length=255, blank=True, null=True)
    #profile image
    profile_image = models.ImageField( upload_to="teachers/profileImages/" , blank=True, null=True)
    #others
    is_retired = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    provided_information = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.user}"

@receiver(user_registered)
def create_teacher(user, sender, request, **kwargs):
    if user.role == "teacher":
        teacher = Teacher()
        teacher.user = user
        teacher.id = user.id
        teacher.save()


class Subject(models.Model):
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    def __str__(self):
        return f"{self.name} - {self.color}"

class Teacher_Subject(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('teacher', 'subject',)

    def __str__(self):
        return f"{self.teacher} - {self.subject}"

class AccessCode(models.Model):
    code = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.code}"


class Language(models.Model):
    language = models.CharField(max_length=255)
    def __str__(self):
        return f"{self.language}"

class Teacher_Language(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('teacher', 'language',)

    def __str__(self):
        return f"{self.teacher} - {self.language}"


class Bookmarked_Teacher(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'teacher',)

    def __str__(self):
        return f"{self.user} - {self.teacher}"