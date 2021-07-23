from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models
from .models import CustomUser, AccessCode, Teacher, Subject, Teacher_Subject, Language, Teacher_Language, BookmarkedTeacher,TeachingFacility, Teacher_TeachingFacility


admin.site.register(CustomUser)
admin.site.register(AccessCode)
admin.site.register(Teacher)
admin.site.register(Subject)
admin.site.register(Teacher_Subject)
admin.site.register(Language)
admin.site.register(Teacher_Language)
admin.site.register(BookmarkedTeacher)
admin.site.register(TeachingFacility)
admin.site.register(Teacher_TeachingFacility)
