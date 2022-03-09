from django.urls import path
from . import views

urlpatterns = [
    path('feedback/', views.FeedbackAPI.as_view(),name = 'feedback'),
]