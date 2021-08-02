from django.db import models
from login.models import Subject, Teacher, CustomUser, TeachingFacility, Language

# Create your models here.

class StudySession(models.Model):
    is_active = models.BooleanField(default=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.PROTECT)
    start_time = models.TimeField(auto_now=False)
    end_time = models.TimeField(auto_now=False)
    date = models.DateField()
    location = models.ForeignKey(TeachingFacility, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    available_spots = models.IntegerField(default=1)
    taken_spots = models.IntegerField(default=0)
    description = models.CharField(max_length=500, blank=True, null=True)
    was_updated = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.subject} - {self.teacher} - {self.date} - {self.start_time}"


class Participant(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    study_session = models.ForeignKey(StudySession, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'study_session')
    
    def __str__(self):
        return f"{self.user} - {self.study_session}"

