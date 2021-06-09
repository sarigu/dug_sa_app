from django.db import models
from login.models import Subject, Teacher, CustomUser

# Create your models here.

class Location(models.Model):
    street = models.CharField(max_length=255, blank=True, null=True)
    postal_code = models.IntegerField( blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    facility = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.facility} - {self.city}"


class StudySession(models.Model):
    is_active = models.BooleanField(default=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    start_time = models.TimeField(auto_now=False)
    end_time = models.TimeField(auto_now=False)
    date = models.DateField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    available_spots = models.IntegerField( default=1)
    taken_spots = models.IntegerField( default=0)
    description = models.CharField(max_length=500, blank=True, null=True)
    
    def __str__(self):
        return f"{self.subject} - {self.date} - {self.start_time}"


class Participant(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    study_session = models.ForeignKey(StudySession, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user} - {self.study_session}"

