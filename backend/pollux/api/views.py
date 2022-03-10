from django.dispatch import receiver
from django.http import JsonResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import UserProfile,Message, ChatRequest
from accounts.models import User
from .serializers import FeedbackSerializer, UserProfileSerializer, MessageSerializer, ChatRequestSerializer


class FeedbackAPI(GenericAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        user = request.user
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = user)
            return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)
        return JsonResponse(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE, safe = False)

class ProfileAPI(GenericAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        user = request.user
        profile = UserProfile.objects.get(user = user)
        serializer = self.serializer_class(profile)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    def post(self,request):
        user = request.user
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = user)
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED, safe = False)
        return JsonResponse(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE, safe = False)

    def put(self,request):
        user = request.user
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = user)
            return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)
        return JsonResponse(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE, safe = False)

    def delete(self,request):
        user = request.user
        profile = UserProfile.objects.get(user = user)
        profile.delete()

'''  
class StackAPI(GenericAPIView):
    serializer_class = StackSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        user = request.user
        stack = Stack.objects.filter(user = user)
        serializer = self.serializer_class(stack, many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    def post(self,request):
        user = request.user
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = user)
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED, safe = False)
        return JsonResponse(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE, safe = False)

    def put(self,request):
        user = request.user
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = user)
            return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)
        return JsonResponse(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE, safe = False)

    def delete(self,request):
        user = request.user
        stack = Stack.objects.get(user = user)
        stack.delete()'''

class ProfileList(GenericAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        profiles = UserProfile.objects.all()
        serializer = self.serializer_class(profiles, many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

class ProfileView(GenericAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request,pk):
        profile = UserProfile.objects.get(id=pk)
        serializer = self.serializer_class(profile)
        #user = profile.user
        #stack = Stack.objects.filter(user = user)
        #stack_serializer = StackSerializer(stack, many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

class RequestAPI(GenericAPIView):
    serializer_class = ChatRequestSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        user = request.user
        requests = ChatRequest.objects.filter(receiver=user, accepted = False)
        serializer = self.serializer_class(requests,many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    def post(self,request):
        pk = request.query_params['reciever']
        other_user = User.objects.get(email=pk)
        data = request.data['accepted']
        message = ChatRequest.objects.get(sender = other_user, receiver = request.user,accepted = False)
        if data == True:
            message.accepted = True
            message.save()
            return JsonResponse({'link':f'{message.link}'},status = status.HTTP_200_OK, safe = False)
        else:
            message.delete()
            return JsonResponse({'rejected':'rejected'}, status = status.HTTP_200_OK, safe = False)

class Chat(GenericAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        pk = request.query_params['reciever']
        other_user = User.objects.get(email=pk)
        messages = Message.objects.filter(receiver = request.user, sender = other_user)
        messages.update(seen = True)
        messages = messages | Message.objects.filter(receiver = other_user, sender = request.user)
        serializer = self.serializer_class(messages,many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    def post(self,request):
        pk = request.query_params['reciever']
        other_user = User.objects.get(email=pk)
        data = request.data['message']
        message = Message.objects.create(sender = request.user, receiver = other_user, message = data)
        message.save()
        return JsonResponse({'sent':'sent'}, status = status.HTTP_200_OK, safe = False)

class CreateRequest(GenericAPIView):
    serializer_class = ChatRequestSerializer
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        pk = request.query_params['reciever']
        other_user = User.objects.get(email=pk)
        profile = UserProfile.objects.get(user = request.user)
        request = ChatRequest.objects.create(sender = request.user, receiver = other_user, link = 'www.chat.com', sender_stack = profile.stack, name = profile.name)
        request.save()
        serializer = self.serializer_class(request)
        return JsonResponse({'sent':'sent'}, status = status.HTTP_200_OK, safe = False)
