import React from "react";

function Home() {
  return (
    <p>Welcome to DriveShare, {sessionStorage.getItem("name")}!</p>
  );
}

export default Home;