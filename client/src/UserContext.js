import { createContext, useEffect, useReducer, useState } from "react";
import {useAuth0} from "@auth0/auth0-react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const {user, isAuthenticated} = useAuth0();
  console.log(user);

  useEffect(() => {
    const checkUser = async() =>{
try{
  const res = await fetch("/api/user/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email: user.email}),
  })
  const data = await res.json()
  console.log(data.data)
  if (data.status === 200) {
    setCurrentUser(data.data)
  } else {
    const addUser = await fetch("/api/add/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: user.email, locations: []}),
    })
    const userInfo = await  addUser.json()
    setCurrentUser(userInfo.data);
  }
}
  catch(err) {
    console.log(err);
  }
    } 
    if (isAuthenticated) {
      checkUser();
    }

}, [isAuthenticated]);


  return (
      <UserContext.Provider
      value={{
      currentUser, setCurrentUser, user, isAuthenticated
        }} 
        >
      {children}
    </UserContext.Provider>
  );
};
