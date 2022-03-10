from django.http import JsonResponse
import jwt
import datetime
from pydantic import Json
import requests
import json
from rest_framework import status

import environ

env = environ.Env()
environ.Env.read_env()


def index(request):
    time_now = datetime.datetime.now()
    expiration_time = time_now+datetime.timedelta(seconds=20)
    rounded_off_exp_time = round(expiration_time.timestamp())
    headers = { "alg": "HS256", "typ": "JWT"}
    payload = { "iss": env("ZOOM_API_KEY"), "exp": rounded_off_exp_time}
    encoded_jwt = jwt.encode(payload, env("ZOOM_API_SECRET"), algorithm="HS256")
    email = env("EMAIL")
    url = 'https://api.zoom.us/v2/users/{}/meetings'.format(email)
    date = datetime.datetime(2022,2,10,12,0).strftime("%Y-%m-%dT%H:%M:%SZ")
    obj = {"topic":"Project Discussion","starttime":date,"duration":30,"password":"12345"}
    header = {"authorization":"Bearer {}".format(encoded_jwt)}
    create_meeting = requests.post(url,json=obj,headers=header)
    return JsonResponse({"meeting":"success"},status = status.HTTP_202_ACCEPTED)