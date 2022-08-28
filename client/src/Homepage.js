import Map from "./Map";
import Navbar from "./Navbar";
import styled from "styled-components";
const Homepage = () => {
    return (
      <>
      <Navbar/>
      <Main>
      <Pictures>
      <Img src="https://res.cloudinary.com/dxcfp6siu/image/upload/v1660082890/alyko-naxos-3-1_z1sowi.jpg"/>
      <Img src="https://res.cloudinary.com/dxcfp6siu/image/upload/v1660082890/4-days-Crete-itinerary-Chania-old-town-min_yrwsur.jpg"/>
      <Img src="https://res.cloudinary.com/dxcfp6siu/image/upload/v1660082890/142079-viewom_o2s5sp.jpg"/>
      </Pictures>
      <Text>Plan your ultimate trip</Text>
      </Main>
      <Wrapper>
      <P>Where would you like to go?</P>
      <Sub>Use the interactive map to find top recommended destinations based on your interests</Sub>
      </Wrapper>
      <Map/>
      </>
    );
  }
  const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `
  const Pictures =styled.div`
  display:flex;
  flex-direction: row;
  `
  const Img = styled.img`
  width: 500px;
  height: 500px;
  opacity: 0.7;
  `
  const Text=styled.p`
  color: white;
  text-shadow: 2px 2px black;
  position: absolute;
  top:250px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 70px;
  `
  const P = styled.p`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: lighter;
  font-size: 40px;
  `
  const Sub = styled.p`
  margin-top: -37px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: lighter;
  font-size: 20px;
  `
  const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `
  export default Homepage;
  