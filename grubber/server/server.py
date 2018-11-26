import random
from flask import Flask, render_template, request, make_response
from flask_pymongo import PyMongo
import bcrypt
from yelp import YelpAPI
import json
from bson.objectid import ObjectId

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
app.config["MONGO_URI"] = "mongodb://admin:password123@ds121262.mlab.com:21262/grubber"
mongo = PyMongo(app)
yelp = YelpAPI()
users = mongo.db.users

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/restaurantsView')
def restaurants():
    return render_template('index.html')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.form
    encodedPassword = data['password'].encode("utf-8")
    hashedPassword = bcrypt.hashpw(encodedPassword, bcrypt.gensalt())
    user = {"email": data['email'], "password": hashedPassword, "favorites": []}
    result = users.insert_one(user)
    print(result.inserted_id)
    return "done"

@app.route('/api/login', methods=['POST'])
def login():
    data = request.form
    encodedPassword = data['password'].encode("utf-8")
    result = users.find_one({"email": data["email"]}) 
    if result:
        id = result["_id"]
        hashedPassword = result["password"]
        if bcrypt.checkpw(encodedPassword, hashedPassword):
            print("correct login info")
            res = make_response("setting uuid cookie")
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
    result = users.find_one_and_update({"_id": userId}, {"$addToSet": {"favorites": data}})
    return "Done"

@app.route('/api/getFavorites', methods=['POST'])
def getFavorites():
    data = json.loads(request.data)
    print(data)
    userId = ObjectId(data["uuid"])
    result = users.find_one({"_id": userId})
    response = result["favorites"]
    return json.dumps(response)

@app.route('/api/logout')
def logout():
    res = make_response("deleting uuid cookie")
    res.delete_cookie('uuid')
    return res

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
