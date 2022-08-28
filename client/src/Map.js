import React, { useState, useEffect, useContext } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import styled from "styled-components";
import { AiOutlineInfoCircle, AiOutlineArrowRight } from "react-icons/ai";
import { RiSuitcaseLine } from "react-icons/ri";
import {FcCheckmark} from "react-icons/fc";
import Modal from "react-modal";
import {ClipLoader} from "react-spinners";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";


const Map = () => {
  //get beaches
  const [beaches, setBeaches] = useState(null);
  // get landmarks
  const [land, setLand] = useState(null);
  // get sights
  const [sightSee, setSightSee] = useState(null);
  //button state to show only beaches
  const [beachButton, setBeachButton] = useState(false);
  //button state to show only sights
  const [sightButton, setSightButton] = useState(false);
  //button state to show only landmarks
  const [landButton, setLandButton] = useState(false);
  //state for infoWindow
  const [infoWindow, setInfoWindow] = useState(false);
  //information inside infoWindow
  const [infoPosition, setInfoPosition] = useState(null);
  //userID
  // const [userId, setUserId] = useState(123);
  //User's location IDs
  const [locationIds, setLocationIds] = useState([]);
  //opening Modal
  const [isOpen, setIsOpen] = useState(false);
  //checking if button is clicked
  const [isClicked, setIsClicked] = useState(false);
  //
  const [update, setUpdate] = useState(false);

 // current user
  const {user} = useContext(UserContext);

  //This fetches the data from all the sights
  useEffect(() => {
    fetch("/api/sights")
      .then((res) => res.json())
      .then((data) => {
        setSightSee(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //This fetches the data from all the landmarks
  useEffect(() => {
    fetch("/api/landmarks")
      .then((res) => res.json())
      .then((data) => {
        setLand(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //This fetches the data from all the beaches
  useEffect(() => {
    //   setMounted(true);
    fetch("/api/beaches")
      .then((res) => res.json())
      .then((data) => {
        setBeaches(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //This fetches the user's trip location Ids
  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          // receiveUserData(data);
          setLocationIds(data.data.locations);
  
          // console.log(data);
        })
        .catch((err) => console.log(err));
      }
  }, [update]);

  //adding location to user's trip
  const addLocation = async (locationId) => {
    try {
      const response = await fetch("/api/location/add", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.email, locationId }),
      });
      const result = await response.json();
      if (result.status === 200) {
        setUpdate(!update);
        console.log("success!");
      }
    } catch (error) {
      console.log(error);
    }
  };



  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBOUX3YfSVyI2n1CJBp4leUjjcZKnxsDb8",
  });


  //styles

  const style = {
    height: "400px",
    width: "800px",
    marginTop: "10px",
  };

  const iconCheck = {
    marginTop: "13px",
    marginLeft: "10px",
  }
  const position = {
    marginTop: "14px",
    marginLeft: "10px",
    cursor: "pointer",
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const margin = {
    marginLeft : "10px",
  }


  //OnClickFunctions

  const beachMarker = (e) => {
    setBeachButton(!beachButton);
    // setIsClicked(true);
  };
  const sightMarker = (e) => {
    setSightButton(!sightButton);
    // setIsClicked(true);

  };
  const landMarker = (e) => {
    setLandButton(!landButton);
    // setIsClicked(true);

  };
  const handleClick = (e, location) => {
    setInfoWindow(true);
    setInfoPosition(location);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  //if one of these has not loaded, render a loading symbol
  if (!isLoaded || !beaches || !land || !sightSee) {
    return <Center><ClipLoader/></Center>;
  }

  return (
    <Div>
      <GoogleMap
        zoom={8}
        center={{ lat: 35.35072, lng: 24.80707 }}
        mapContainerStyle={style}
      >
        {/* Mapping through all beaches to get coordinates of every beach */}
        {beachButton &&
          beaches.map((location) => (
            <Marker
              position={{
                lat: location.coordinates.lat,
                lng: location.coordinates.lng,
              }}
              onClick={(e) => {
                handleClick(e, location);
              }}
            ></Marker>
          ))}

        {/* Mapping through all locations to get coordinates of every landmark */}
        {landButton &&
          land.map((location) => (
            <Marker
              position={{
                lat: location.coordinates.lat,
                lng: location.coordinates.lng,
              }}
              onClick={(e) => {
                handleClick(e, location);
              }}
            ></Marker>
          ))}

        {/* Mapping through all locations to get coordinates of every sight */}

        {sightButton &&
          sightSee.map((location) => (
            <Marker
              position={{
                lat: location.coordinates.lat,
                lng: location.coordinates.lng,
              }}
              onClick={(e) => {
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
              <Inline>
                <Name>{infoPosition.name}</Name>
                <AiOutlineInfoCircle
                  size={"25px"}
                  style={position}
                  onClick={openModal}
                />
                {user && (!locationIds.includes(infoPosition._id) ?
                <RiSuitcaseLine
                  size={"25px"}
                  style={position}
                  onClick={()=> addLocation(infoPosition._id)}
                />
                  :
                  <FcCheckmark style={iconCheck} size={"25px"}/>   )               
              } 
              </Inline>
              <Img src={infoPosition.imgSrc} />
            </>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Modal to show more information about location */}

      {infoPosition && (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <Contain>
            <InfoImg src={infoPosition.imgSrc} />
            <Align>
              <H2>{infoPosition.name}</H2>
              <Info>{infoPosition.description}</Info>
            </Align>
            <Details to={`/location/${infoPosition._id}`}>
              {" "}
              See more
              <AiOutlineArrowRight size={"25px"} style={margin}/>
            </Details>
          </Contain>
        </Modal>
      )}

      {/* Buttons to select which markers to show on map */}
      <Position>
        <P>What do you want to see?</P>
        <Button onClick={beachMarker} style={{backgroundColor: beachButton ? "lightblue" : "" }}>Beaches</Button>
        <Button onClick={landMarker} style={{backgroundColor: landButton ? "lightblue" : "" }}>Landmarks</Button>
        <Button onClick={sightMarker} style={{backgroundColor: sightButton ? "lightblue" : "" }}>Sight-Seeing</Button>
      </Position>
    </Div>
  );
};

const P = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 30px;
  border-bottom: 2px solid lightblue;
`;

const Button = styled.button`
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 20px;
  border: none;
  background-color: aliceblue;
  &:hover {
    cursor: pointer;
    background-color: lightblue;
    transition: 1000ms;
  }
`;
const Position = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
`;
const Img = styled.img`
  width: 200px;
  border-radius: 15px;
  margin-top: -10px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Name = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 18px;
`;
const Inline = styled.div`
  display: flex;
  flex-direction: row;
`;

const Contain = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid lightblue;
`;

const H2 = styled.h2`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 30px;
  background-color: white;
  text-align: center;
`;
const Info = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 17px;
  background-color: white;
  opacity: 0.8;
`;

const InfoImg = styled.img`
  width: 500px;
  border-radius: 15px;
  /* margin-top: -20px; */
  margin-left: 200px;
  opacity: 0.8;
`;

const Align = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  position: absolute;
  background-color: white;
  opacity: 0.8;
  width: 300px;
  height: 600px;
  justify-content: center;
`;
const Details = styled(Link)`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 550px;
  top: 550px;
  text-decoration: none;
  color: black;
  &:hover{
    font-size: 22px;
    cursor: pointer;
    border-bottom: 2px solid lightblue;
  }
`;

const Center = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const CheckedButton = styled.button`
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 20px;
  border: none;
  background-color: aliceblue;
  &:hover {
    cursor: pointer;
    background-color: lightblue;
    transition: 1000ms;
  }
`

export default Map;
