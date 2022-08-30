const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//get all the data on every beach
const getBeaches = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Locations");
    const beaches = await db.collection("locations").find({type:"beach"}).toArray();

    beaches? 
    res.status(200).json({status: 200, data: beaches})
    : res.status(404).json({status: 404, message: "There is no data"})

    client.close();
}


//get all the data on every sight
const getSights = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Locations");
    const sights = await db.collection("locations").find({type: "sight"}).toArray();

    sights? 
    res.status(200).json({status: 200, data: sights})
    : res.status(404).json({status: 404, message: "There is no data"})

    client.close();
}

//get all the data on every landmark
const getLandmarks = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Locations");
    const landmarks = await db.collection("locations").find({type: "landmark"}).toArray();

    landmarks? 
    res.status(200).json({status: 200, data: landmarks})
    : res.status(404).json({status: 404, message: "There is no data"})

    client.close();
}
//get data on one location
const getLocation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Locations");
    const _id = req.params._id;
    const landmark = await db.collection("locations").find({_id: ObjectId(_id)}).toArray();
    console.log(landmark);

    landmark? 
    res.status(200).json({status: 200, _id, data: landmark})
    : res.status(404).json({status: 404, _id, message: "There is no data"})

    client.close();
}
//get user information
const getUserData = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Planner");
    const id = req.params.id;
    const userData = await db.collection("users").findOne({"email" : id});

    userData?
    res.status(200).json({status: 200, id, data: userData})
    : res.status(404).json({status: 404, id, message: "There is no data"})

    client.close();
}
// get user by email
const getUserEmail = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Planner");
    const email = req.body.email;
    const userData = await db.collection("users").findOne({email});

    userData?
    res.status(200).json({status: 200,  data: userData})
    : res.status(404).json({status: 404,  message: "There is no data"})

    client.close();
}
// add user
const addUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Planner");
    const {email, locations} = req.body;
    const result = await db .collection("users").insertOne({email, locations});
    
    result?
    res.status(200).json({status: 200,  data:{email, locations}})
    : res.status(404).json({status: 404,  message: "There is no data"})
    
    client.close();
}

//add location to user's trip
const addLocation = async(req, res) => {
const client = new MongoClient(MONGO_URI, options);
await client.connect();
const db = client.db("Planner");
const {userId, locationId} = req.body;
let newLocations = [];


const userData = await db.collection("users").findOne({"email" : userId});
console.log(userData, userId, locationId);
newLocations = [...(userData.locations), locationId];

const result = await db .collection("users").findOneAndUpdate({ email: userId }, { $set: { locations: newLocations } });

result?
res.status(200).json({status: 200,  data: result})
: res.status(404).json({status: 404,  message: "There is no data"})

client.close();
}

//get the user's trip locations by location id

const getLocationData = async(req,res) =>  {

const {locations} = req.body;    
const client = new MongoClient(MONGO_URI, options);
await client.connect();
const db = client.db("Locations");
const locationsMongoIds = locations.map((location) => ObjectId(location));

const result = await db.collection("locations").find({_id:{$in:locationsMongoIds}}).toArray();

result?
res.status(200).json({status: 200,  data: result})
: res.status(404).json({status: 404,  message: "There is no data"})

client.close();
}

//delete location from trip
const removeLocation = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Planner");
    const {userId, locationId} = req.body;
    const result = await db .collection("users").findOneAndUpdate({ email: userId }, { $pull: { locations: locationId } },);
    
    result?
    res.status(200).json({status: 200,  message: "Location removed from trip" })
    : res.status(404).json({status: 404,  message: "There is no data"})
    
    client.close();
    }



module.exports = {
    getBeaches, getSights, getLandmarks, getLocation, getUserData,addLocation, getLocationData, removeLocation, getUserEmail, addUser
}