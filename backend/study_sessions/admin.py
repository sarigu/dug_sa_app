from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models
from .models import StudySession, Participant

admin.site.register(StudySession)
admin.site.register(Participant)