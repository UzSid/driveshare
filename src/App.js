import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import AddCar from "./addcar";
import CarList from "./carList";
import Navigation from './navigation';
import React, { useState } from 'react';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {!loggedIn ? (<Login onLogin={handleLogin}/>) : (
        <Router>
          <Navigation/>
          <Routes>
            <Route path="AddCar" element={<AddCar/>}/>
            <Route path="CarList" element={<CarList/>}/>
          </Routes>
        </Router>
      )}
      
        
        <button type="button" onClick={() =>logout()}>Log out</button>
      
    </div>
  );
}

export default App;
