from django.http import JsonResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from .models import User
from .serializers import LoginSerializer, RegisterSerializer
from django.contrib.auth import login, authenticate

from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class RegisterAPI(GenericAPIView):
	
	serializer_class = RegisterSerializer
	
	def post(self,request,*args,**kwargs):
		data = request.data
		serializer = self.serializer_class(data=data)
		serializer.is_valid(raise_exception = True)
		user = serializer.save()
		token = Token.objects.create(user=user)
		return Response({'Success':'Your account is successfully created'},status=status.HTTP_201_CREATED)

class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self,request,*args,**kwargs ):
        password = request.data['password']
        email = request.data['email']
        user = authenticate(email = email, password = password)
        if user:
            serializer = self.serializer_class(user)
            token = Token.objects.get(user=user)
            return JsonResponse({"token" : token.key,"username" : user.username, "email" : user.email, "name" : f"{user.first_name} {user.last_name}"},status = status.HTTP_200_OK)
        return JsonResponse({"error" : "Invalid Credentials"},status = status.HTTP_404_NOT_FOUND)
