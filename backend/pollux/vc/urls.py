from django.urls import path

from . import views

urlpatterns = [
    path('meet',views.index,name = 'meet'),
]