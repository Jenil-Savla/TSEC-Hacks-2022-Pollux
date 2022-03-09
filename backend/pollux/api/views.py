from django.http import JsonResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import FeedbackSerializer

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
