import React from "react";

class AddCar extends React.Component {
  constructor() {
    super();
    this.state = {
      dates: []
    };    
  }

  setDates = (date) => {
    this.state.dates.push(date);
    this.setState(this.state.dates);
  }

  delete = (date) => {
    const index = this.state.dates.indexOf(date);
    if (index > -1) {
      this.state.dates.splice(index, 1);
      this.setState(this.state.dates);
    }
  }

  render() {
    return (
      <div>
        <form action="http://localhost/DriveShare/src/addCar.php" method="GET">
          <input type="hidden" name="UID" value={sessionStorage.getItem("UID")}/>
          <label for="model">Model: </label><br/>
          <input type="text" name="model" required/><br/><br/>
          <label for="year">Year:</label><br/>
          <input type="text" name="year" required/><br/><br/>
          <label for="Mileage">Mileage:</label><br/>
          <input type="text" name="Mileage" required/><br/><br/>
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