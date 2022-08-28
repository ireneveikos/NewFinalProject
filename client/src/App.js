import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";
import Beaches from "./Beaches";
import Landmarks from "./Landmarks";
import Sights from "./Sights";
import YourTrip from "./YourTrip";
import LocationDetails from "./LocationDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/beaches" element={<Beaches />} /> 
        <Route path="/landmarks" element={<Landmarks />} />    
        <Route path="/sights" element={<Sights />} />       
        <Route path="/my-trip" element={<YourTrip />} />  
        <Route path="/location/:_id" element={<LocationDetails />} />  

      </Routes>
    </Router>
  );
}

export default App;
