from flask import Flask, request
from flask_cors import CORS, cross_origin
import pymongo
import base64
import requests

'''
{"_id":{"$oid":"6338f03bd3cf611566dd71fa"},"user_name":"","profile":{"nickname":"","images":["",""],"about":"","preference":"","phone":""},"matches":[],"dislikes":[]}
'''

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api/updateprofile",methods=["POST"])
@cross_origin()
def updateProfile():
    
    def ImageUpload():
        with open("image.png", "rb") as file:
            url = "https://api.imgbb.com/1/upload"
            payload = {
                "key": "fb13020baf1e55ab0f8abe7be3834531",
                "image": base64.b64encode(file.read()),
            }
            res = requests.post(url, payload)
        return res

    if request.method == "POST":
        username = request.json["username"]
        nickname = request.json["nickname"]
        phone = request.json["phone"]
        about = request.json["about"]
        pref = request.json["pref"]
        imageFiles = [x["content"] for x in request.json["imageFiles"]]
        imgUrls = []
        #print(len(imageFiles))
        
        #ImageUpload().json()['data']['url']
        
        temparr = []
        for i in range(0,len(imageFiles)):#ele in imageFiles:
            temp = imageFiles[i].split(",")[1] + "="
            temp = temp.encode('utf-8')
            with open(f"imageToSave{i}.jpeg", "wb") as fh:
                fh.write(base64.decodebytes(temp))
            temparr.append(f"imageToSave{i}.jpeg")
        
        for i in range(0,len(temparr)):
            with open(f"imageToSave{i}.jpeg", "rb") as file:
                url = "https://api.imgbb.com/1/upload"
                payload = {
                    "key": "0e748ed1c1a50f91f8d7eb28abf1a0d6",
                    "image": base64.b64encode(file.read()),
                }
                res = requests.post(url, payload)
                print(res.json()['data']['url'])
                imgUrls.append(res.json()['data']['url'])
        print(imgUrls)
        
        
        client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.wonbr.mongodb.net/?retryWrites=true&w=majority")
        db = client["SharkDate"]
        col = db["userdetails"]
        query = { "user_name": username }
        newvalues = { "$set": { "nickname": nickname, "phone":phone, "about":about, "preference":pref, "images":imgUrls}}
        col.update_one(query, newvalues)
        #print(request.json)
        
        
        
        
    return {}

@app.route("/api/makesearch",methods=["POST"])
@cross_origin()
def makeSearch():
    if request.method == "POST":
        pass

if __name__ == "__main__":
    app.run(debug=True)