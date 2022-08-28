import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {RiSuitcaseLine} from "react-icons/ri"
import {ClipLoader} from "react-spinners";
import { UserContext } from "./UserContext";

const LocationDetails = () => {

  //capturing the id of beach clicked
  const { _id } = useParams();
  //assigning the beach data
  const [locationData, setLocationData] = useState();
  //locationId
  const [locationId, setLocationId] = useState([]);
  // current user
   const {user} = useContext(UserContext);
   // checking if button is clicked
   const [clicked, setClicked] = useState(false);
   //checking user's locations added to trip
   const [locationIds, setLocationIds] = useState([]);
   //updating button
   const [update, setUpdate] = useState(false);


  //fetching the information of the item that was selected
  useEffect(() => {
    fetch(`/api/location/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setLocationData(data.data);
        setLocationId(_id);
      })
      .catch((err) => console.log(err));
  }, [_id]);
  
//adding location to user's trip
const addLocation = async(e) => {
  e.preventDefault();
  setClicked(true);
  try{
    const response = await fetch("/api/location/add", {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({userId: user.email, locationId}),
    });
    const result = await response.json();
    if (result.status === 200) {
      setUpdate(!update);
      console.log("success!")
    }
  } catch (error) {
    console.log(error);
  }
}
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


  const iconStyle ={
      marginLeft:"3px",
  }

  if (!locationData){
      return <Center> <ClipLoader /></Center>
    }
    return(
        <>   
        <Navbar/>
     {locationData.map((info) => (
            <Wrapper>
              <First src={info.img1}/>
              <Position>
              <Name>{info.name}</Name>
              <Descrip>{info.description}</Descrip>
              {user && ( !locationIds.includes(info._id) ?
                <Button onClick={addLocation}>Add to my trip<RiSuitcaseLine style={iconStyle}/></Button>
                : <P> Added to your Trip! </P>
              ) 
              }
              </Position>
              <Second src={info.img2}/>
            </Wrapper>
          ))}
      </>
  )
};

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
margin-top: -50px;
`
const Position =styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
position: absolute;
opacity: 0.8;
`


const Name = styled.p`
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-weight: lighter;
font-size: 45px;
border-bottom: 2px solid #b3d9ff;
display: flex;
justify-content: center;
`
const Descrip = styled.p`
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-weight: lighter;
font-size: 20px;
width: 550px; 
padding: 30px;
`
const Button=styled.button`
border: none;
background-color: aliceblue;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-weight: lighter;
font-size: 20px;
width: 280px;
height: 40px;
margin-bottom: 30px;
display: inline-block;
&:hover{
    cursor: pointer;
    background-color: lightblue;
    transition: 300ms;
}
`
const First = styled.img`
width: 750px;
height: 650px;
opacity: 0.9;
`
const Second = styled.img`
width: 750px;
height: 650px;
`
const Center = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const P = styled.p`
display: flex;
justify-content: center;
align-items: center;
background-color: lightblue;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-weight: lighter;
font-size: 20px;
width: 280px;
height: 40px;
margin-bottom: 30px;
`

export default LocationDetails;
