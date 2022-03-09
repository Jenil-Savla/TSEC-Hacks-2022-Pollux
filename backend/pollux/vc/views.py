'''import jwt
import json
import sys
import http.client
import datetime
import requests
import environ

env = environ.Env()
environ.Env.read_env()

# Enter your API key and your API secret
api_key = '5R6spKbrQwmbrefKAZIFyg'#env('ZOOM_API_KEY')
api_sec = '6s7UkvEKg4LibfdzYCkkiaqLh2pF6jyuIbOX'#env('ZOOM_API_SECRET')
 
payload = {
'iss':api_key,
'exp': datetime.datetime.now() + datetime.timedelta(hours=2)
}

jwt_encoded = str(jwt.encode(payload, api_sec), 'utf-8')

conn = http.client.HTTPSConnection("api.zoom.us")
headers = {
'authorization': "Bearer %s" % jwt_encoded,
'content-type': "application/json"
}

conn.request("GET", "/v2/users/savlajenil480@gmail.com/meetings", headers=headers)
res = conn.getresponse()
response_string = res.read().decode('utf-8')
response_obj = json.loads(response_string)
print(response_obj)

def generateToken():
    token = jwt.encode(
 
        # Create a payload of the token containing
        # API Key & expiration time
        {'iss': api_key, 'exp': datetime.time() + 5000},
 
        # Secret used to generate token signature
        api_sec,
 
        # Specify the hashing alg
        algorithm='HS256'
    )
    return token.decode('utf-8')

meetingdetails = {"topic": "The title of your zoom meeting",
                  "type": 2,
                  "start_time": "2019-03-22T10: 21: 57",
                  "duration": "40",
                  "timezone": "Europe/Madrid",
                  "agenda": "test",
 
                  "recurrence": {"type": 1,
                                 "repeat_interval": 1
                                 },
                  "settings": {"host_video": "true",
                               "participant_video": "true",
                               "join_before_host": "False",
                               "mute_upon_entry": "False",
                               "watermark": "true",
                               "audio": "voip",
                               "auto_recording": "cloud"
                               }
                  }
 
# send a request with headers including
# a token and meeting details
 
 
def createMeeting():
    r = conn.request("POST", "/v2/users/savlajenil480@gmail.com/meetings", headers=headers, data=json.dumps(meetingdetails))
 
    print("\n creating zoom meeting ... \n")
    # print(r.text)
    # converting the output into json and extracting the details
    y = json.loads(r.text)
    join_URL = y["join_url"]
    meetingPassword = y["password"]
 
    print(
        f'\n here is your zoom meeting link {join_URL} and your \
        password: "{meetingPassword}"\n')
 
 
# run the create meeting function
createMeeting()'''