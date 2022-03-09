from django.db import models
from django.conf import settings

# Create your models here.
class Feedback(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null = True, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.subject