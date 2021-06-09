from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models
from .models import CustomUser, AccessCode, Teacher, Subject, Teacher_Subject


admin.site.register(CustomUser)
admin.site.register(AccessCode)
admin.site.register(Teacher)
admin.site.register(Subject)
admin.site.register(Teacher_Subject)
