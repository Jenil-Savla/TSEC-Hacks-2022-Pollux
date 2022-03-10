from django_zoom_meetings import ZoomMeetings

import environ

env = environ.Env()
environ.Env.read_env()

my_zoom = ZoomMeetings(env('ZOOM_API_KEY'), env('ZOOM_API_SECRET'))
create_meeting = my_zoom.CreateMeeting(date,str_topic,str_meeting_duration,str_meeting_password)