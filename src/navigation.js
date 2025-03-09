import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <p><Link to="/AddCar">Host a Car</Link> | <Link to="/CarList">Browse Cars</Link></p>
    </nav>
  );
}

export default Navigation;