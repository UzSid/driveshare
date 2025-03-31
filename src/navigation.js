import React from "react";
import { Link } from 'react-router-dom';

function Navigation(props) {
  let usersNotifications = [];
  fetch("http://localhost/DriveShare/src/getNotifications.php")
  .then(response => response.json())
  .then(json => {
      sessionStorage.setItem("notifications", JSON.stringify(json));				
  });
  try {
    let allNotifications = JSON.parse(sessionStorage.getItem("notifications")); //get notifications
    for (var i = 0; i < allNotifications.length; i++) {
        if (allNotifications[i].UID == sessionStorage.getItem("UID")) {
            usersNotifications.push(allNotifications[i]);
        }
    }
  }    
  catch {
    window.location.reload(true); //refresh page
  }
  

  return (
    <nav class="navBar">
      <p>
        {/*Links to different pages and a logout button*/}
        <b class="logoSmall">DriveShare</b>
        <Link to="/AddCar" class="navLink">Host a Car</Link>
        <Link to="/CarList" class="navLink">Browse Cars</Link>
        <Link to="/MyListings" class="navLink">My Cars</Link>       
        <Link to="/Messages" class="navLink">Messages</Link>
        {usersNotifications.length === 0 ?
        <Link to="/Notifications" class="navLink">Notifications</Link> : <Link to="/Notifications" class="navLinkNotifications">Notifications</Link>}
        <button type="button" onClick={props.logout} class="logoutButton">Log out</button>
      </p>
    </nav>
  );
}

export default Navigation;