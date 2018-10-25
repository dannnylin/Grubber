import random
from flask import Flask, render_template, request
from yelp import YelpAPI
import json

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

yelp = YelpAPI()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/restaurants', methods=['POST'])
def getRestaurants():
    data = json.loads(request.data)
    cuisines = ",".join([cuisine for (cuisine, selected) in data['cuisines'].items() if selected])
    print(cuisines)
    prices = ",".join([price for (price, selected) in data['prices'].items() if selected])
    print(prices)
    address = data['address'].replace(" ", "%20")
    print(address)
    distances = [float(distance) * 1609.34 for (distance, selected)
                 in data['distances'].items() if selected]
    print(distances)
    response = yelp.search(address, cuisines, price=prices)
    return json.dumps(response)

if __name__ == '__main__':
    app.run()
