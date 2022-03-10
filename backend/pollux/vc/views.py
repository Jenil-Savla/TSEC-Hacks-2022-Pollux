from django.shortcuts import render

import os
import time
import json

from django.http.response import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

from django.shortcuts import render

from .agora_key.RtcTokenBuilder import RtcTokenBuilder, Role_Attendee

import environ

env = environ.Env()
environ.Env.read_env()

'''def index(request):
    return render(request, 'index.html', {})'''


def room(request, room_name):
    return render(request, 'chatroom.html', {
        'room_name': room_name
    })

pusher_client = Pusher(app_id=env('PUSHER_APP_ID'),
                       key=env('PUSHER_KEY'),
                       secret=env('PUSHER_SECRET'),
                       ssl=True,
                       cluster=env('PUSHER_CLUSTER')
                       )

@login_required(login_url='/accounts/login/')
def index(request):
    User = get_user_model()
    all_users = User.objects.exclude(pk=request.user.pk).only('username')
    return render(request, 'index.html', {'allUsers': all_users})


def pusher_auth(request):
    payload = pusher_client.authenticate(
        channel=request.POST['channel_name'],
        socket_id=request.POST['socket_id'],
        custom_data={
            'user_id': request.user.phone,
            'user_info': {
                'id': request.user.phone,
                'name': request.user.username
            }
        })
    return JsonResponse(payload)


def generate_agora_token(request):
    appID = env('AGORA_APP_ID')
    appCertificate = env('AGORA_APP_CERTIFICATE')
    channelName = json.loads(request.body.decode(
        'utf-8'))['channelName']
    userAccount = request.user.username
    expireTimeInSeconds = 3600
    currentTimestamp = int(time.time())
    privilegeExpiredTs = currentTimestamp + expireTimeInSeconds

    token = RtcTokenBuilder.buildTokenWithAccount(
        appID, appCertificate, channelName, userAccount, Role_Attendee, privilegeExpiredTs)

    return JsonResponse({'token': token, 'appID': appID})


def call_user(request):
    body = json.loads(request.body.decode('utf-8'))

    user_to_call = body['user_to_call']
    channel_name = body['channel_name']
    caller = request.user.id

    pusher_client.trigger(
        'presence-online-channel',
        'make-agora-call',
        {
            'userToCall': user_to_call,
            'channelName': channel_name,
            'from': caller
        }
    )
    return JsonResponse({'message': 'call has been placed'})