import React from "react";
import { FormDirector, TextEntry, Button, NumberEntry, Calendar } from './UIComponents';
import { NotificationSubject, NotificationObserver } from './notifications'

export default class AddCar extends React.Component {
  constructor() {
    super();
    this.notificationSubject = new NotificationSubject();
    this.notificationObserver = new NotificationObserver();
    this.notificationSubject.setObserver(this.notificationObserver);
    this.state = {
      model: "",
      year: "",
      mileage: "",
      location: "",
      price: "",
      dates: [] //keeps list of availability dates
    };
  }

  //for handling form inputs
  setModel = (event) => {
    const model = event.target.value;
    if (model.length <= 40) {
      this.setState({model});
    }
  }

  setYear = (event) => {
    const year = event.target.value;
    if (year.length <= 4) {
      this.setState({year});
    }
  }

  setMileage = (event) => {
    const mileage = event.target.value;
    if (mileage.length <= 11) {
      this.setState({mileage});
    }
  }

  setLocation = (event) => {
    const location = event.target.value;
    if (location.length <= 40) {
      this.setState({location});
    }
  }

  setPrice = (event) => {
    const price = event.target.value;
    if (price.length <= 11) {
      this.setState({price});
    }
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

  //when form is submitted
  submit = async(UID, name, model, year, mileage, location, price, dates) => {
    //run SQL via PHP
    let response = await fetch("http://localhost/DriveShare/src/newCarAndAvail.php?UID="+UID
      +"&name="+name+"&model="+model+"&year="+year+"&mileage="
      +mileage+"&location="+location+"&price="+price+"&dates="+dates);
    let status = await response.json();
    //if successful, notify user and refresh page
    if (status === "SUCCESS") {
        this.notificationSubject.setNotification(sessionStorage.getItem("UID"), "notEmail", "You have listed a car for rental: "
          + this.state.year + " " + this.state.model); //notify user
        window.location.reload(true); //refresh page
    }
    else {
        alert("Error sending message.");
    }
  }

  render() {
    return (
      <div class="loginpages">
        <h1>Host a Car for Rental</h1>
        {/*Information fields to be filled by the user and sent to the php file*/}
        <p>Model:</p>
        <TextEntry setValue={this.setModel} value={this.state.model}/>
        <p>Year:</p>
        <NumberEntry setValue={this.setYear} value={this.state.year}/>
        <p>Mileage:</p>
        <NumberEntry setValue={this.setMileage} value={this.state.mileage}/>
        <p>Location:</p>
        <TextEntry setValue={this.setLocation} value={this.state.location}/>
        <p>Price per day:</p>
        <NumberEntry setValue={this.setPrice} value={this.state.price}/>
        <p>Availability:</p>
        {/*A calendar for choosing dates*/}
        <Calendar onChange={e => this.setDates(e.target.value)}/>
        {this.state.dates.map((date) => (
          <table>
            <tbody>
              <tr>
                <td><p>{date}</p></td>
                <td><Button class="deletebutton" submit={() => this.delete(date)} text="Delete"/></td>
              </tr>
            </tbody>
          </table>
        ))}
        <br/><br/><br/>
        {/* If any field is empty, show disabled button; otherwise show enabled button */}
        {((this.state.model.length === 0) ||
          (this.state.year.length === 0) ||
          (this.state.mileage.length === 0) ||
          (this.state.location.length === 0) ||
          (this.state.price.length === 0) ||
          (this.state.dates.length === 0))
          ? (<Button disabled={true} text="Submit"/>):(<Button submit={
            () => this.submit(sessionStorage.getItem("UID"), sessionStorage.getItem("name"), this.state.model,
            this.state.year, this.state.mileage, this.state.location, this.state.price, JSON.stringify(this.state.dates))}
            text="Submit"/>)}        
      </div>
    );
  }
}