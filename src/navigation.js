import React from "react";
import { Link } from 'react-router-dom';

function Navigation(props) {
  return (
    <nav>
      <p>
        <Link to="/AddCar">Host a Car </Link>|
        <Link to="/CarList"> Browse Cars </Link>|
        <Link to="/MyListings"> My Cars </Link>|        
        <Link to="/Messages"> Messages </Link>|
        <button type="button" onClick={props.logout}> Log out </button>
      </p>
    </nav>
  );
}

export default Navigation;