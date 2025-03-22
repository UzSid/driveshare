import React from "react";

class AddCar extends React.Component {
  constructor() {
    super();
    this.state = {
      dates: [] //keeps list of availability dates
    };
  }

  setDates = (date) => {
    //when a date is selected in the calendar, it is added to the array
    if (!this.state.dates.includes(date)) {
      this.state.dates.push(date);
      this.state.dates.sort();
      this.setState(this.state.dates);
    }

  }

  delete = (date) => {
    //when a date is deleted, it is deleted from the array
    const index = this.state.dates.indexOf(date);
    if (index > -1) {
      this.state.dates.splice(index, 1);
      this.setState(this.state.dates);
    }
  }

  render() {
    return (
      <div>
        <form action="http://localhost/DriveShare/src/newCarAndAvail.php" method="GET">
          {/*Extra information to be sent to the php file*/}
          <input type="hidden" name="UID" value={sessionStorage.getItem("UID")}/>
          <input type="hidden" name="name" value={sessionStorage.getItem("name")}/>
          <input type="hidden" name="dates" value={JSON.stringify(this.state.dates)}/>
          {/*Information fields to be filled by the user and sent to the php file*/}
          <label for="model">Model: </label><br/>
          <input type="text" name="model" maxlength="64" required/><br/><br/>
          <label for="year">Year:</label><br/>
          <input type="number" name="year" maxlength="4" required/><br/><br/>
          <label for="Mileage">Mileage:</label><br/>
          <input type="number" name="mileage" maxlength="11" required/><br/><br/>
          <label for="location">Location:</label><br/>
          <input type="text" name="location" maxlength="64" required/><br/><br/>
          <label for="price">Price:</label><br/>
          <input type="number" name="price" maxlength="12" required/><br/><br/>
          <label for="availability">Availability:</label>
          {/*A calendar for choosing dates*/}
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