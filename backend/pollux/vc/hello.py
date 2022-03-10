from pyzoom import ZoomClient

import environ

env = environ.Env()
environ.Env.read_env()

client = ZoomClient(env('ZOOM_API_KEY'), env('ZOOM_API_SECRET'))