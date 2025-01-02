from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
import random
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

# mysql database configuration
app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:1234567890@localhost/teret_terets"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)


# initializing the table model
class Terets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


class TeretSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "body", "date")


teret_schema = TeretSchema()
terets_schema = TeretSchema(many=True)


# Creating route to get all terets
@app.route("/", methods=["GET"])
def getTerets():
    all_terets = Terets.query.all()
    results = terets_schema.dump(all_terets)
    return jsonify(results)


# Creating a route to add new teret
@app.route("/add_teret", methods=["POST"])
def addTeret():
    title = request.json["title"]
    body = request.json["body"]

    terets = Terets(title, body)
    db.session.add(terets)
    db.session.commit()
    return teret_schema.jsonify(terets)


# Route for updating the existing teret
@app.route("/update_teret/<id>/", methods=["PUT"])
def updateTeret(id):
    teret = Terets.query.get(id)
    if teret is None:
        return jsonify({"message": "Teret not found"})

    title = request.json["title"]
    body = request.json["body"]

    teret.title = title
    teret.body = body

    db.session.commit()
    return teret_schema.jsonify(teret)


# Route for random teret
@app.route("/get_random", methods=["GET"])
def randomTeret():
    all_terets = Terets.query.all()

    if not all_terets:
        return jsonify({"message": "No Terets available"})

    random_teret = random.choice(all_terets)

    result = teret_schema.dump(random_teret)
    return jsonify(result)


# Route to remove teret based on id
@app.route("/remove_teret/<id>/", methods=["DELETE"])
def removeTeret(id):
    teret = Terets.query.get(id)

    if teret is None:
        return jsonify({"message": "Teret not found"})

    db.session.delete(teret)

    db.session.commit()
    return teret_schema.jsonify(teret)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)