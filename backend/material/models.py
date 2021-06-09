from django.db import models
from login.models import CustomUser

class MotivationalQuote(models.Model):
    quote = models.CharField(max_length=350, blank=True, null=True)
    author = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.quote}"
