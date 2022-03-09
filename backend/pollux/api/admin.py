from django.contrib import admin

from .models import Feedback,Profile,Message

# Register your models here.
admin.site.register(Feedback)
admin.site.register(Profile)
admin.site.register(Message)
#admin.site.register(Stack)