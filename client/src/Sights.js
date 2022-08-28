import React, {useEffect, useState}from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {AiOutlineArrowDown} from "react-icons/ai";
import { ClipLoader } from "react-spinners";

const Sights = () => {

const [sightSee, setSightSee] = useState(null);
const [clicked, setClicked] = useState(false);


  //This fetches the data from all the sights
  useEffect(() => {
    fetch("/api/sights")
      .then((res) => res.json())
      .then((data) => {
        setSightSee(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

const style = {
  textDecoration:"none",
  color:"black"
  }

if (!sightSee) {
  return <Center><ClipLoader/></Center>
}
  return (
<>
    {!clicked && 
      <>
      <Navbar />
      <Contain>
      <Background src='https://res.cloudinary.com/dxcfp6siu/image/upload/v1659852790/e22a460d-city-5117-163f9f7bc2e_khywct.jpg'/>
      <Circle>
    <H1>Sight-Seeing</H1>
    <P>No, you're not dreaming</P>
    <Button onClick={() => setClicked(true)}>View Top 5</Button>
    </Circle>
      </Contain>
      </>
    }
      {clicked && 
      <>
      <Navbar/>
      <Wrapper>
      <Section>
        5 Places Worth the Drive <AiOutlineArrowDown/>
      </Section>
        <Position>
    {sightSee.map((item) => (
      <Sight>
          <Img src = {item.imgSrc}/>
          <Link to={`/location/${item._id}`} style={style}>
          <Name>{item.name}</Name>
          </Link>
      </Sight>
    )
    )}
    </Position>
    </Wrapper>
    </>
}
</>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Background = styled.img`
  width: 58vw;
  height: 630px;
  opacity: 0.7;
`;
const H1 = styled.h1`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  height: 60px;
  font-size: 50px;
  margin-top: 90px;
`;

const P = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 20px;
  margin-top: -20px;
`;
const Section = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
font-weight: lighter;
font-size: 35px;
`;

const Position = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1500px;
  flex-wrap: wrap;
`;

const Sight = styled.div`
  margin: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0 0 2em lightgrey;
  &:hover {
    background-color: lightgray;
    transition: 400ms;
    opacity: 0.7;
    cursor: pointer;
  }
`
const Img = styled.img`
  width: 300px;
  height: 200px;
`;
const Name = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 20px;
  background-color: f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 300px;
  height: 20px;
  opacity: 0.7;
`;
const Center = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Contain = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 10px;
`
const Circle = styled.div`
background-color: white;
position: absolute;
display: flex;
flex-direction: column;
border-radius: 50%;
height: 300px;
width: 300px;
align-items: center;
opacity: 0.8;
`

const Button = styled.button`
margin-top: 20px;
border: none;
font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 15px;
  &:hover {
    background-color: lightblue;
    transition: 400ms;
    cursor: pointer;
  }
`

export default Sights;
