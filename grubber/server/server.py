import random
from flask import Flask, render_template, request, make_response, redirect, url_for
from flask_pymongo import PyMongo
import bcrypt
from yelp import YelpAPI
import json
from bson.objectid import ObjectId

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
app.config["MONGO_URI"] = "mongodb://admin:password123@ds121262.mlab.com:21262/grubber"
mongo = PyMongo(app)
yelp = YelpAPI()
users_db = mongo.db.users
restaurants_db = mongo.db.restaurants

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/restaurantsView')
def restaurants():
    return render_template('index.html')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.form
    encodedPassword = bytes(data['password'], encoding="utf-8")
    result = users_db.find_one({"email": data["email"]})
    if result:
        return "you already have an account"
    else:
        hashedPassword = bcrypt.hashpw(encodedPassword, bcrypt.gensalt())
        user = {"email": data['email'], "password": hashedPassword, "favorites": []}
        result = users_db.insert_one(user)
        return redirect('/')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.form
    encodedPassword = bytes(data['password'], encoding="utf-8")
    result = users_db.find_one({"email": data["email"]}) 
    if result:
        id = result["_id"]
        hashedPassword = result["password"]
        if bcrypt.checkpw(encodedPassword, hashedPassword):
            res = make_response(redirect('/'))
            res.set_cookie('uuid', str(id), max_age=60*60*24)
            return res
        else:
            print("incorrect password")
    else:
        print("user not found")

@app.route('/api/addFavorite', methods=['POST'])
def favoriteRestaurant():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    del data["uuid"]
    result = users_db.find_one_and_update({"_id": userId}, {"$addToSet": {"favorites": data}})
    return "Done"

@app.route('/api/getFavorites', methods=['POST'])
def getFavorites():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    result = users_db.find_one({"_id": userId})
    response = result["favorites"]
    return json.dumps(response)

@app.route('/api/addSeenRestaurants', methods=['POST'])
def addSeenRestaurants():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    del data["uuid"]
    for restaurant in data["restaurants"]:
        users_db.find_one_and_update({"_id": userId}, {"$addToSet": {"seen": restaurant["id"]}})
    return "Done"

@app.route('/api/logout')
def logout():
    res = make_response(redirect('/'))
    res.delete_cookie('uuid')
    return res

@app.route('/api/restaurant/<restaurantId>')
def getRestaurantInfo(restaurantId):
    result = restaurants_db.find_one({"_id": restaurantId})
    return json.dumps(result)

@app.route('/api/restaurants', methods=['POST'])
def getRestaurants():
    data = json.loads(request.data)
    cuisines = ",".join([cuisine for (cuisine, selected) in data['cuisines'].items() if selected])
    prices = ",".join([price for (price, selected) in data['prices'].items() if selected])
    address = data['address'].replace(" ", "%20")
    distances = [float(distance) * 1609.34 for (distance, selected)
                 in data['distances'].items() if selected]
    response = yelp.search(address, cuisines, price=prices)
    businesses =  response["businesses"]
    for restaurant in businesses:
        restaurant["_id"] = restaurant.pop("id")
        try:
            restaurants_db.insert_one(restaurant)
        except Exception as e:
            pass
    return json.dumps(response)

if __name__ == '__main__':
    app.run()
