from django.contrib import admin

from .models import Feedback,UserProfile,Message

# Register your models here.
admin.site.register(Feedback)
admin.site.register(UserProfile)
admin.site.register(Message)
#admin.site.register(Stack)