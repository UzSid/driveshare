import React from "react";

//simple home page, shows user's name
function Home() {
  return (
    <p>Welcome to DriveShare, {sessionStorage.getItem("name")}!</p>
  );
}

export default Home;