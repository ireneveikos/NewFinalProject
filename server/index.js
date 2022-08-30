const express = require("express");
const morgan = require("morgan");
const { getBeaches, getSights, getLandmarks, getLocation, getUserData,  addLocation, getLocationData, removeLocation, getUserEmail, addUser} = require("./handlers");
const PORT = 7000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  
  .get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello!" });
  })
  //get all beaches 
  .get("/api/beaches", getBeaches)
  //get one beach
  .get("/api/beach/:_id", getLocation)
  //get all landmarks
  .get("/api/landmarks", getLandmarks)
  //get one landmark
  .get("/api/landmark/:_id", getLocation)
  //get all sights
  .get("/api/sights", getSights)
  //get one sight
  .get("/api/sight/:_id", getLocation)
  //get data on one user
  .get("/api/user/:id", getUserData)
  //get data on one user
  .post("/api/user/", getUserEmail)
  //get location by id
  .get("/api/location/:_id", getLocation)
  //add location to trip
  .patch("/api/location/add", addLocation)
  //get data on locations user chose
  .post("/api/user/locations", getLocationData)
  //remove location from trip
  .patch("/api/user/locations/delete", removeLocation)
  //add user
  .post("/api/add/user", addUser)


  .listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
  });
