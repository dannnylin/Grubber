from __future__ import print_function

import argparse
import json
from pprint import pprint
import requests
import sys
import urllib

from urllib.error import HTTPError
from urllib.parse import quote
from urllib.parse import urlencode

API_KEY = "d6-6x_9A0cjGCoi2_HVu161vml3crMED86sfj_JGiVdmV1MLWBYTJfYKf8OA6Xn6efBiorTWeBFjjVtHrQbf76EHsaBRyNOZLJqilwXOXPVl4Zmb1wSMCvaOq_ieWnYx"

# API constants, you shouldn't have to change these.
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'

DEFAULT_TERM = 'restaurant'
DEFAULT_RADIUS = 32000  # 20 miles
SEARCH_LIMIT = 50


class YelpAPI(object):
    def request(self, path, url_params=None):
        url_params = url_params or {}
        url = '{0}{1}'.format(API_HOST, quote(path.encode('utf8')))
        headers = {
            'Authorization': 'Bearer %s' % API_KEY,
        }

        response = requests.request(
            'GET', url, headers=headers, params=url_params)

        return response.json()

    def search(self, location, categories, term=DEFAULT_TERM, price="1,2,3,4", radius=DEFAULT_RADIUS):
        """Query the Search API by a search term and location.

        Args:
            term (str): The search term passed to the API.
            location (str): The search location passed to the API.

        Returns:
            dict: The JSON response from the request.
        """

        url_params = {
            'term': term.replace(' ', '+'),
            'location': location.replace(' ', '+'),
            'categories': categories,
            'limit': SEARCH_LIMIT,
            'price': price,
            'radius': radius
        }

        return self.request(SEARCH_PATH, url_params=url_params)
