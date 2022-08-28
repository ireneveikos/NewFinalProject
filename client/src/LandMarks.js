import React, {useEffect, useState}  from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import {AiOutlineArrowDown} from "react-icons/ai";
import { ClipLoader } from "react-spinners";

const Landmarks = () => {

const [land, setLand] = useState(null);
const [clicked, setClicked] = useState(false);

  //This fetches the data from all the landmarks
  useEffect(() => {
    fetch("/api/landmarks")
      .then((res) => res.json())
      .then((data) => {
        setLand(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

const style = {
  textDecoration:"none",
  color:"black",
}
if (!land) {
  return <Center><ClipLoader/></Center>
}
  return (
    <>
    {!clicked &&
      <>
      <Navbar/>
      <Contain>
      <Background src='https://res.cloudinary.com/dxcfp6siu/image/upload/v1659851251/ccimage-shutterstock_762419695-1_p0v58y.jpg'/>
      <Circle>
    <H1>Landmarks</H1>
    <P>Take a Trip Back in Time</P>
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
      The 5 Must-See Places <AiOutlineArrowDown/>
      </Section>
      <Position>
    {land.map((item) => (
      <LandMark>
          <Img src = {item.imgSrc}/>
          <Link to={`/location/${item._id}`} style={style}>
          <Name>{item.name}</Name>
          </Link>
      </LandMark>
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
display:flex;
flex-direction: column;
align-items: center;
`
const Background = styled.img`
width: 58vw;
height: 630px;;
opacity: 0.7;
`
const H1 = styled.h1 `
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-weight: lighter;
height: 60px;
  font-size: 50px;
  margin-top: 90px;
`

const P = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: lighter;
  font-size: 20px;
  margin-top: -20px;
`
const Section = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
font-weight: lighter;
font-size: 35px;
`

const Position = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1500px;
  flex-wrap: wrap;
`

const LandMark = styled.div`
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
`
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
`
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
export default Landmarks;
