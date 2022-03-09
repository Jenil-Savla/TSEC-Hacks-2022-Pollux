from django.urls import path
from . import views

urlpatterns = [
    path('feedback/', views.FeedbackAPI.as_view(),name = 'feedback'),
    path('profile/', views.ProfileAPI.as_view(),name = 'profile'),
    path('profile-list/', views.ProfileList.as_view(),name = 'profile-list'),
    path('profile-view/<str:pk>', views.ProfileView.as_view(),name = 'profile-view'),
    path('stack/',views.StackAPI.as_view(),name = 'stack'),
    path('load-messages',views.Chat.as_view(),name = 'load-messages')
]