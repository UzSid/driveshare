import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import AddCar from "./addCar";
import CarList from "./carList";
import Messages from "./messages";
import MyListings from "./myListings";
import Signup from "./signup";
import Recovery from "./recovery";
import Navigation from './navigation';
import Home from "./home";
import React, { useState } from 'react';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  //sessionStorage.setItem("loggedIn", "false");

  const handleLogin = () => {
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.setItem("loggedIn", "false");
    window.open("http://localhost:3000","_self");
  };

  return (
    <div>
      {sessionStorage.getItem("loggedIn") !== "true" ? (
        <Router>
          <Routes>            
            <Route path="/" element={<Login onLogin={handleLogin}/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="recovery" element={<Recovery/>}/>
          </Routes>
        </Router>        
      ) : (
        <div>
          <Router>
            <Navigation logout={handleLogout}/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="AddCar" element={<AddCar/>}/>
              <Route path="CarList" element={<CarList/>}/>
              <Route path="Messages" element={<Messages/>}/>
              <Route path="MyListings" element={<MyListings/>}/>
            </Routes>
          </Router>          
        </div>
      )}
    </div>
  );
}

export default App;
