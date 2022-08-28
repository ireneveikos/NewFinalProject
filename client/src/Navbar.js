import styled from "styled-components";
import { useContext } from "react";
import {FiMap} from "react-icons/fi"
import { Link } from "react-router-dom";
import {RiSuitcaseLine} from "react-icons/ri"
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { UserContext } from "./UserContext";



const Navbar = () => {

   // current user
   const {user} = useContext(UserContext);

const style ={
    width:"20px",
    marginLeft:"10px",
}
const linkStyle={
  textDecoration:"none",
  color:"black",
}

const iconStyle={
  color:"black",
  textDecoration:"none",
  marginRight:"20px",
  marginTop:"12px"
}
    return (
      <Position>
      <Link to="/" style={linkStyle}>
      <Title>Travel Buddy <FiMap style={style}/></Title>
      </Link>
      <Contain>
      <Link to="/beaches" style={linkStyle}>
      <P>Beaches</P>
      </Link>
      <Link to="/landmarks"style={linkStyle}>
      <P>Landmarks</P>
      </Link>
      <Link to="/sights"style={linkStyle}>
      <P>Sight-Seeing</P>
      </Link>
      { user && 
      <Link to="/my-trip" style={iconStyle}>
      <RiSuitcaseLine size={"30px"}/>
      </Link>
      }
      <LoginButton/>
      <LogoutButton/>
      </Contain>
      </Position>
    );
  }

  const Position = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0px;
    height: 70px;
    opacity: 0.8px;
    /* align-items: center; */
  `
  const Contain = styled.div`
  display: flex;
  `
  const P = styled.p`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: lighter;
  font-size: 20px;
  margin-right: 30px;
  &:hover{
    border-bottom: 2px solid #b3d9ff;
    cursor: pointer;
    font-size: 21px;
  }

  `
  const Title = styled.p`
  display: flex;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: lighter;
  font-size: 40px;
  margin-top: 7px;
  margin-left: 34px;
  `

  export default Navbar;
  