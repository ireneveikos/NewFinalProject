import React, { useEffect, useState, useContext,  } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { ClipLoader } from "react-spinners";


const YourTrip = () => {
  //current user
  const {user} = useContext(UserContext);
  //gives the userId
  const [userId, setUserId] = useState(123);
  //gives data on the user based on ID
  const [userData, setUserData] = useState();
  //gives the array of location IDs
  const [places, setPlaces] = useState([]);
  //gives the details on each location based on ID
  const [tripData, setTripData] = useState([]);
  //gives the location ID
  const [locationId, setLocationId] = useState([]);
  //state for infoWindow
  const [infoWindow, setInfoWindow] = useState(false);
  //information inside infoWindow
  const [infoPosition, setInfoPosition] = useState(null);


  //Loading Map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBOUX3YfSVyI2n1CJBp4leUjjcZKnxsDb8",
  });

  //This fetches the data from the current user
  useEffect(() => {
    if (user){
      fetch(`/api/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setPlaces(data.data.locations);
        })
        .catch((err) => console.log(err));

    }
  }, []);

  //This fetches the location data from the user's trip
  useEffect(() => {
    if (places) {
      fetch("/api/user/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations: places }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTripData(data.data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [places]);

  // styles

  const style = {
    height: "400px",
    width: "800px",
    marginTop: "10px",
  };

  //functions

  //info window in map when clicking marker
  const handleClick = (e, location) => {
    setInfoWindow(true);
    setInfoPosition(location);
  };

  //removing location from trip
const removeLocation = async(locationId) => {
  try{
    const response = await fetch("/api/user/locations/delete", {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({userId: user.email, locationId}),
    });
    const result = await response.json();
    console.log(result);
    if (result.status === 200) {
      const newTripData = tripData.filter((location) => location._id !== locationId)
      setTripData(newTripData);
      console.log("success!")
    }
  } catch (error) {
    console.log(error);
  }
}



  if (!user|| !userData || !places || !tripData) {
    return <Center><ClipLoader/></Center>;
  }
  return (
    <>
      <Navbar />
    <Main>
      <H1>MY TRIP</H1>
      <Position>
        {tripData.map((location) => (
          <Wrapper>
            <Name>{location.name}</Name>
            <Icon onClick={()=>removeLocation(location._id)}><AiOutlineCloseCircle/> </Icon>{" "}
            <Img src={location.img3} />
          </Wrapper>
        ))}
      </Position>
      <Div>
      <GoogleMap
        zoom={8}
        center={{ lat: 35.35072, lng: 24.80707 }}
        mapContainerStyle={style}
      >
        {/* Mapping through all beaches to get coordinates of every beach */}
        {tripData.map((location) => (
            <Marker
              position={{
                lat: location.coordinates.lat,
                lng: location.coordinates.lng,
              }}
              onMouseOver={(e) => {
                handleClick(e, location);
              }}
              
            ></Marker>
          ))}

        {/* Info Window that shows up on marker */}

        {infoWindow === true && (
          <InfoWindow
            position={{
              lat: infoPosition.coordinates.lat,
              lng: infoPosition.coordinates.lng,
            }}
            onCloseClick={() => {
              setInfoWindow(false);
              setInfoPosition(null);
            }}
          >
            <>
                <Name>{infoPosition.name}</Name>
              <Pic src={infoPosition.imgSrc} />
            </>
          </InfoWindow>
        )}
      </GoogleMap>
      </Div>
    </Main>
    </>
  );
};

const H1 = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 40px;
`;
const Name = styled.h2`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  position: absolute;
  background-color: white;
  opacity: 0.7;
`;
const Img = styled.img`
  width: 300px;
  height: 200px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 40px;
`;
const Position = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 0 20px lightgray;
  width: 1500px;
`;
const Icon = styled.a`
position: absolute;
  color: white;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const Div = styled.div`
 margin: 40px;
`
const Pic = styled.img`
width: 200px;
height: 100px;
`
const Center = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

export default YourTrip;
