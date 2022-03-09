from django.db import models
from django.conf import settings

# Create your models here.
class Feedback(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null = True, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.subject

class UserProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null = True, on_delete=models.CASCADE)
    name = models.CharField(max_length = 50, null = True)
    gender = models.CharField(max_length = 10)
    age = models.PositiveIntegerField()
    description = models.CharField(max_length = 255)
    stack = models.CharField(max_length=50)
    projects = models.CharField(max_length = 255)
    experience = models.CharField(max_length = 255, null = True)
    photo = models.ImageField(blank = True)
    github_link = models.URLField(null = True,blank = True)

    def __str__(self):
        return self.user.username

'''
class Stack(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null = True, on_delete=models.CASCADE)
    stack = models.CharField(max_length = 40)

    def __str__(self):
        return self.stack'''

class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = "msg_sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = "msg_reciever", on_delete=models.CASCADE)
    message = models.CharField(max_length = 255)
    file = models.FileField(null = True)
    seen = models.BooleanField(default = False)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('date_created',)

class ChatRequest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = "req_sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = "req_reciever", on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    link = models.URLField(null=True)
