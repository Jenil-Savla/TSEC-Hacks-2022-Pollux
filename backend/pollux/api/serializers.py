from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Feedback, Profile, Message, Stack

class FeedbackSerializer(serializers.ModelSerializer):
	class Meta:
		model = Feedback
		fields = '__all__'

class StackSerializer(serializers.ModelSerializer):
	class Meta:
		model = Stack
		fields = ['stack',]

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Message
		fields = '__all__'
