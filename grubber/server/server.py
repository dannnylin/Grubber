import random
from flask import Flask, render_template, request, make_response, redirect, url_for
from flask_pymongo import PyMongo
import bcrypt
from yelp import YelpAPI
import json
from bson.objectid import ObjectId
from datetime import datetime
from bson.json_util import dumps, loads

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
app.config["MONGO_URI"] = "mongodb://admin:password123@ds121262.mlab.com:21262/grubber"
mongo = PyMongo(app)
yelp = YelpAPI()
users_db = mongo.db.users
restaurants_db = mongo.db.restaurants

@app.route('/')
def index():
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
        user = {"email": data['email'], "password": hashedPassword, "favorites": [], "seen": [], "friends": [], "messages": []}
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
    return render_template('index.html')

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

@app.route('/api/addSeenRestaurant', methods=['POST'])
def addSeenRestaurant():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    del data["uuid"]
    users_db.find_one_and_update({"_id": userId}, {"$addToSet": {"seen": data["_id"]}})
    return "Done"

@app.route('/api/getPreferences', methods=['POST'])
def getPreferences():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    result = users_db.find_one({"_id": userId})
    return json.dumps("preferences" in result)

@app.route('/api/setPreferences', methods=['POST'])
def setPreferences():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    del data["uuid"]
    result = users_db.find_one_and_update(
        {"_id": userId}, {"$set": {"preferences": data}})
    return "Done"

@app.route('/api/setLastStack', methods=['POST'])
def setLastStack():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    del data["uuid"]
    result = users_db.find_one_and_update(
        {"_id": userId}, {"$set": {"lastStack": data}})
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
    userId = ObjectId(data["uuid"])
    result = users_db.find_one({"_id": userId})
    seenRestaurants = set(result["seen"])
    filteredBusinesses = filterRestaurants(businesses, seenRestaurants)
    currentOffset = 0
    print(filteredBusinesses)
    while len(filteredBusinesses) < 30:
        currentOffset += 30
        response2 = yelp.search(address, cuisines, price=prices, offset=currentOffset)
        filteredBusinesses += filterRestaurants(response2["businesses"], seenRestaurants)
    for restaurant in filteredBusinesses:
        restaurant["_id"] = restaurant["id"]
        try:
            restaurants_db.insert_one(restaurant)
        except Exception as e:
            pass
    response["businesses"] = filteredBusinesses
    return json.dumps(response)

@app.route('/api/searchFriend', methods=['POST'])
def searchFriend():
    data = json.loads(request.data)
    email = data['email']
    results = users_db.find_one({"email": email})
    return dumps([results]) if results else None

@app.route('/api/getFriends', methods=['POST'])
def getFriends():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    results = users_db.find_one({"_id": userId})
    response = results["friends"]
    return json.dumps(response)

@app.route('/api/addFriend', methods=['POST'])
def addFriend():
    data = json.loads(request.data)
    requesterId = ObjectId(data["uuid"])
    requesteeEmail = data['friend']
    result = users_db.find_one({"email": requesteeEmail})
    requesteeId = json.loads(dumps(result))['_id']['$oid']
    users_db.find_one_and_update(
        {"_id": requesterId}, {"$addToSet": {"friends": requesteeId}})
    users_db.find_one_and_update(
        {"_id": ObjectId(requesteeId)}, {"$addToSet": {"friends": requesteeId}})
    return "Done"

@app.route('/api/getMessages', methods=['POST'])
def getMessages():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    results = users_db.find_one({"_id": userId})
    response = results["messages"]
    return json.dumps(response)

@app.route('/api/sendMessage', methods=['POST'])
def sendMessage():
    data = json.loads(request.data)
    userId = ObjectId(data["uuid"])
    receiverId = data["friend_id"]
    message = {"message": data["message"], "sender": userId, "receiver": receiverId, "timestamp": datetime.now()}
    # users_db.find_one_and_update(
    #     {"_id": userId}, {"$addToSet": {"messages": message}})
    # users_db.find_one_and_update(
    #     {"_id": receiverId}, {"$addToSet": {"messages": message}})
    messages = users_db.find_one({"_id": userId})
    if receiverId not in messages["messages"]:
        users_db.find_one_and_update({"_id": userId}, {"$addToSet": {"messages": {receiverId: message}}})
    return "Done"

def filterRestaurants(businesses, seenRestaurants):
    filteredBusinesses = []
    for business in businesses:
        if "_id" not in business:
            business["_id"] = business["id"]
        if business["_id"] not in seenRestaurants:
            filteredBusinesses.append(business)
    return filteredBusinesses

if __name__ == '__main__':
    app.run()
