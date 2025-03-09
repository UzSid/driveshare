import React from "react";

class AddCar extends React.Component {
  constructor() {
    super();
    this.state = {
      dates: []
    };
    this.SQLString = "";
    try {
      fetch("http://localhost/DriveShare/src/getCarID.php")
      .then(response => response.json())
      .then(json => {
          sessionStorage.setItem("maxID", JSON.stringify(json));				
      });
      let arr = JSON.parse(sessionStorage.getItem("maxID"));
      this.maxID = Number(arr[0].maxID) + 1;
    }
    catch {
      this.maxID = 1
    }
  }

  setDates = (date) => {
    this.state.dates.push(date);
    this.setState(this.state.dates);
    this.updateString();
  }

  delete = (date) => {
    const index = this.state.dates.indexOf(date);
    if (index > -1) {
      this.state.dates.splice(index, 1);
      this.setState(this.state.dates);
    }
    this.updateString();
  }

  updateString = () => {
    this.SQLString = "";
    for (var i=0; i < this.state.dates.length; i++) {
      this.SQLString += "(";
      this.SQLString += this.maxID.toString();
      this.SQLString += ",'";
      this.SQLString += this.state.dates[i].toString();
      if (i === this.state.dates.length - 1) {
        this.SQLString += "');"
      }
      else {
        this.SQLString += "'),"
      }      
    }
    console.log(this.SQLString);
  }

  render() {
    return (
      <div>
        <form action="http://localhost/DriveShare/src/newCarAndAvail.php" method="GET">
          <input type="hidden" name="UID" value={sessionStorage.getItem("UID")}/>
          <input type="hidden" name="name" value={sessionStorage.getItem("name")}/>
          <input type="hidden" name="SQLString" value={this.SQLString}/>
          <label for="model">Model: </label><br/>
          <input type="text" name="model" required/><br/><br/>
          <label for="year">Year:</label><br/>
          <input type="text" name="year" required/><br/><br/>
          <label for="Mileage">Mileage:</label><br/>
          <input type="text" name="mileage" required/><br/><br/>
          <label for="location">Location:</label><br/>
          <input type="text" name="location" required/><br/><br/>
          <label for="price">Price:</label><br/>
          <input type="text" name="price" required/><br/><br/>
          <label for="availability">Availability:</label>
          <input type="date" id="availability" name="availability" onChange={e => this.setDates(e.target.value)}/>          
          {this.state.dates.map((date) => (
            <div>
              <p>{date} <button type="button" onClick={() => this.delete(date)}>X</button></p>
            </div>
          ))}
          <br/><br/>
          <input type="submit"/>          
        </form>
      </div>
    );
  }
}

export default AddCar;