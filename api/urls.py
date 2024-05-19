from django.urls import path
from .views import get_random_users

urlpatterns = [
    path('random-users/', get_random_users, name='random-users'),
]
