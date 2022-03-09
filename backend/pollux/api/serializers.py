from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Feedback, UserProfile, Message

class FeedbackSerializer(serializers.ModelSerializer):
	class Meta:
		model = Feedback
		fields = '__all__'

'''
class StackSerializer(serializers.ModelSerializer):
	class Meta:
		model = Stack
		fields = ['stack',]'''

class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ['gender','age','stack','description','projects','experience','photo','github_link']

class MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Message
		fields = '__all__'
