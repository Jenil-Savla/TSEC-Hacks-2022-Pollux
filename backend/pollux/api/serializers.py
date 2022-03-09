from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Feedback, UserProfile, Message, ChatRequest

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
		fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Message
		fields = '__all__'

class ChatRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = ChatRequest
		fields = '__all__'