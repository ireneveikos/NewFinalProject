import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {

const {loginWithRedirect, isAuthenticated} = useAuth0();

  return (
      !isAuthenticated && (
    <Button onClick={() => loginWithRedirect()}>
        Log in
    </Button>
      )
  )  
}

const Button = styled.button`
background-color: white;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-weight: lighter;
font-size: 20px;
border:none;
margin-top: 16px;
margin-left: 30px;
margin-right: 10px;
height: 30px;
&:hover{
  border-bottom: 1px solid lightblue;
  cursor: pointer;
    font-size: 21px;
}
`


export default LoginButton;