import requests
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_random_users(request):
    try:
        response = requests.get('https://randomuser.me/api/?results=5')
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()
        return JsonResponse(data, safe=False)  # Set safe to False
    except requests.exceptions.RequestException as e:
        return JsonResponse({'detail': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
