from django.http import JsonResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Profile,Message, Stack

from .serializers import FeedbackSerializer, ProfileSerializer, MessageSerializer, StackSerializer

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
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        user = request.user
        profile = Profile.objects.get(user = user)
        return JsonResponse(profile, status = status.HTTP_200_OK, safe = False)

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
        profile = Profile.objects.get(user = user)
        profile.delete()
    
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
        stack.delete()

class ProfileList(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        profiles = Profile.objects.all()
        serializer = self.serializer_class(profiles, many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

class ProfileView(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated,]

    def get(self,request,pk):
        profile = Profile.objects.get(id=pk)
        serializer = self.serializer_class(profile)
        user = profile.user
        stack = Stack.objects.filter(user = user)
        stack_serializer = StackSerializer(stack, many = True)
        dict = {"profile": serializer.data, "stacks": stack_serializer.data}
        return JsonResponse(dict, status = status.HTTP_200_OK, safe = False)