from django_zoom_meetings import ZoomMeetings

import environ

env = environ.Env()
environ.Env.read_env()

client = ZoomMeetings(env('ZOOM_API_KEY'), env('ZOOM_API_SECRET'))