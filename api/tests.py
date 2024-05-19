from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch, MagicMock
from rest_framework import status
import requests  # Add this import

class RandomUsersAPITestCase(TestCase):
    @patch('api.views.requests.get')
    def test_get_random_users_success(self, mock_get):
        mock_response = {
            'results': [
                {
                    'gender': 'male',
                    'name': {'first': 'John', 'last': 'Doe'},
                    'email': 'john.doe@example.com',
                    'dob': {'age': 30},
                    'phone': '123-456-7890',
                    'location': {
                        'street': {'number': 123, 'name': 'Main St'},
                        'city': 'Somewhere',
                        'state': 'CA',
                        'postcode': '90210'
                    }
                }
            ]
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response

        url = reverse('random-users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), mock_response)

    @patch('api.views.requests.get')
    def test_get_random_users_failure(self, mock_get):
        # Simulate a failed API call by setting status_code to 500
        mock_response = MagicMock()
        mock_response.raise_for_status.side_effect = requests.exceptions.RequestException
        mock_get.return_value = mock_response

        url = reverse('random-users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.json(), {'detail': 'Internal Server Error'})
