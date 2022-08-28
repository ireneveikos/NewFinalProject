import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import { AiOutlineArrowDown } from "react-icons/ai";
import {ClipLoader} from "react-spinners";

const Beaches = () => {
  const [beaches, setBeaches] = useState(null);
  const [clicked, setClicked] = useState(false);

  //This fetches the data from all the beaches
  useEffect(() => {
    fetch("/api/beaches")
      .then((res) => res.json())
      .then((data) => {
        setBeaches(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const style = {
    textDecoration:"none",
    color:"black"
    }


  if (!beaches) {
    return <Center><ClipLoader/></Center>;
  }
  return (
<>
    {!clicked && 
      <>
      <Navbar />
      <Contain>
      <Background src="https://res.cloudinary.com/dxcfp6siu/image/upload/v1659821284/background_erxnkn.jpg" />
      <Circle>
      <H1>Beaches</H1>
      <P>The perfect place to unwind</P>
      <Button onClick={() => setClicked(true)}>View Top 10</Button>
      </Circle>
      </Contain>
      </>
    }
  {clicked && 
      <>
      <Navbar/>
      <Wrapper>
      <Section>
        Explore our Top 10 List <AiOutlineArrowDown/>
      </Section>
        <Position>
          {beaches.map((beach) => (
            <Beach>
              <Img src={beach.imgSrc} />
              <Link to={`/location/${beach._id}`} style={style}>
              <Name>{beach.name}</Name>
              </Link>
            </Beach>
          ))}
        </Position>
      </Wrapper>
    </>
  } 
  </>
  );
};
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

const Beach = styled.div`
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
`;
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


export default Beaches;
