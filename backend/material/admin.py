from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models
from .models import MotivationalQuote

admin.site.register(MotivationalQuote)
