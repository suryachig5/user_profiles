import requests
from django.http import JsonResponse

def get_random_users(request):
    response = requests.get('https://randomuser.me/api/?results=5')
    data = response.json()
    return JsonResponse(data)
