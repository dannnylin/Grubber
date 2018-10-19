import random
from flask import Flask, render_template, request
from yelp import YelpAPI

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

yelp = YelpAPI()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/restaurants', methods=['POST'])
def getRestaurants():
    cuisines = request.form.getlist("cuisines[]")
    price = request.form.getlist("price[]")
    address = request.form.get("address", 0)
    distance = request.form.get("distance", 0)
    restaurants = yelp.search(location=address, categories=",".join(cuisines), price="4")
    return render_template('restaurants.html')

if __name__ == '__main__':
    app.run()
