import React from "react";
import Collapsible from "react-collapsible";
import { FormDirector, TextEntry, NumberEntry, Button } from './UIComponents';
import { NotificationSubject, NotificationObserver } from './notifications'

//use modified version of carList.js
class Car {
    constructor(CID, UID, ownerName, model, year, mileage, location, price, availability, rentedDates) {
        this.CID = CID;
        this.UID = UID;
        this.ownerName = ownerName;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.location = location;
        this.price = price;
        this.availability = availability;
        this.rentedDates = rentedDates;
    }
}

class RentedCar {
    constructor(CID, ownerName, model, year, rentedDates) {
        this.CID = CID;
        this.ownerName = ownerName;
        this.model = model;
        this.year = year;
        this.rentedDates = rentedDates;
    }
}

class CarBuilder{
    constructor() {
        this.listings = [];
        this.dates = [];
        this.rentedDates = [];
        this.rentedList = [];
        this.rentedCars = [];
    }

    buildCars() {
        //get car data
        fetch("http://localhost/DriveShare/src/carList.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("cars", JSON.stringify(json));				
        });
        //get availability data
        fetch("http://localhost/DriveShare/src/getAvail.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("availability", JSON.stringify(json));			
        });
        //get rental date data
        fetch("http://localhost/DriveShare/src/getRents.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("rentedDateList", JSON.stringify(json));			
        });
        let carList = JSON.parse(sessionStorage.getItem("cars"));
        let availability = JSON.parse(sessionStorage.getItem("availability"));
        let rentedDateList = JSON.parse(sessionStorage.getItem("rentedDateList"));
        //for each car:
        for (var i = 0; i < carList.length; i++) {
            //get their availability
            for (var j = 0; j < availability.length; j++) {
                if (availability[j].CID === carList[i].CID) {
                    this.dates.push(availability[j].date);
                }
            }
            //get the days they are rented
            for (var j = 0; j < rentedDateList.length; j++) {
                if (rentedDateList[j].CID === carList[i].CID) {
                    this.rentedDates.push(rentedDateList[j].date);
                    //if the user rented the car, put them in a separate list for keeping track of what they rented
                    if (rentedDateList[j].UID == sessionStorage.getItem("UID") && !this.rentedList.includes(carList[i])) {
                        this.rentedList.push(carList[i]);
                    }
                }
            }
            this.listings.push(new Car(carList[i].CID, carList[i].UID, carList[i].owner, carList[i].model, carList[i].year, carList[i].mileage, carList[i].location, carList[i].price, this.dates, this.rentedDates));
            this.dates = [];
            this.rentedDates = [];
        }
        //get the rented dates of cars the user rented
        for (var i = 0; i < this.rentedList.length; i++) {
            for (var j = 0; j < rentedDateList.length; j++) {
                if (rentedDateList[j].CID === this.rentedList[i].CID) {
                    this.rentedDates.push(rentedDateList[j].date);
                }
            }
            this.rentedCars.push(new RentedCar(carList[i].CID, carList[i].owner, carList[i].model, carList[i].year, this.rentedDates));
            this.rentedDates = [];
        }
    }
}

class MyListings extends React.Component {
    constructor() {
        super();
        this.notificationSubject = new NotificationSubject();
        this.notificationObserver = new NotificationObserver();
        this.notificationSubject.setObserver(this.notificationObserver);
        this.list = [];
        this.state = {
            listings: [],
            rentedCars: [],
            mileage: "",
            location: "",
            price: "",
            date: null
        };
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

    setDate = (event) => {
        const date = event.target.value;
        this.setState({date});
        console.log(this.state.date);
    }

    editCar = async(CID, column, value, model, year) => {
        let response = await fetch("http://localhost/DriveShare/src/editCar.php?CID="+CID+"&column="+column+"&value="+value);
        let status = await response.json();
        if (status === "SUCCESS") {
            this.notificationSubject.setNotification(sessionStorage.getItem("UID"), "notEmail", "You have modified the " + column + " of your " + year + " " + model); //notify message receiver
            window.location.reload(true); //refresh page
        }
        else {
            alert("Error editing car.");
        }
    }

    deleteCar = async(CID, model, year) => {
        let response = await fetch("http://localhost/DriveShare/src/deleteCar.php?CID="+CID);
        let status = await response.json();
        console.log(status);
        if (status === "SUCCESS") {
            this.notificationSubject.setNotification(sessionStorage.getItem("UID"), "notEmail", "You have delisted your " + year + " " + model); //notify message receiver
            window.location.reload(true); //refresh page
        }
        else {
            alert("Error daleting car.");
        }
    }

    newOrDeleteDate = async(CID, date, model, year, newOrDelete) => {
        let response = null;
        if (newOrDelete === "DELETE") {
            response = await fetch("http://localhost/DriveShare/src/deleteDate.php?CID="+CID+"&date="+date);
        }
        else if (newOrDelete === "NEW") {
            response = await fetch("http://localhost/DriveShare/src/newDate.php?CID="+CID+"&date="+date);
        }
        let status = await response.json();
        console.log(status);
        if (status === "SUCCESS") {
            this.notificationSubject.setNotification(sessionStorage.getItem("UID"), "notEmail", "You have modified the availability of your " + year + " " + model); //notify message receiver
            window.location.reload(true); //refresh page
        }
        else {
            alert("Error daleting car.");
        }
    }

    render() {
        //build car and rental lists
        const builder = new CarBuilder();
        builder.buildCars();
        this.state.listings = builder.listings;
        this.state.rentedCars = builder.rentedCars;
        return (
            <div>
                {/*Cars the user currently has booked*/}
                {this.state.rentedCars.length > 0 && <h3 style={{"margin-left":"1%"}}>Cars you currently have booked</h3>}
                {this.state.rentedCars.map((car) => (
                    <Collapsible trigger={<h3 style={{"margin-left":"1%"}}>{car.year + " " + car.model}</h3>}>
                        <hr/>
                        <p>Hosted by {car.ownerName}</p>
                        <p><b>Model:</b> {car.model}</p>
                        <p><b>Year:</b> {car.year}</p>
                        <p><b>Dates you have rented this car:</b></p> {car.rentedDates.map((day) => (
                            <p>{day}</p>
                        ))}
                        <br/>
                    </Collapsible>
                ))}
                <br/>
                {/*Cars the user has listed for rental (if any)*/}
                {this.state.listings.length > 0 && <h3 style={{"margin-left":"1%"}}>Cars you have listed for rental</h3>}
                {this.state.listings.map((car) => (
                    <div>
                        {car.UID == sessionStorage.getItem("UID") &&
                            <Collapsible trigger={<h3 style={{"margin-left":"1%"}}>{car.year + " " + car.model}</h3>}>
                                <hr/>
                                <div style={{"margin-left":"1%"}}>
                                    {/*If the car is not rented, it can be deleted*/}
                                    {car.rentedDates.length > 0 ? <p><i>Rented</i></p>
                                    :
                                    <Button submit={() => this.deleteCar(car.CID, car.model, car.year)} text="Delete" style={{"width":"20%"}}/>
                                    }
                                </div>
                                {/*car info that can be edited*/}
                                    <table style={{"margin-left":"1%"}}>
                                        <tbody>
                                            <tr>
                                                <td><p>Mileage: {car.mileage} miles</p></td>
                                                <td><NumberEntry setValue={this.setMileage} value={this.state.mileage}/></td>
                                                <td>{this.state.mileage.length === 0 ? (<input type="submit" value="Edit" disabled/>) : (<Button submit={() => this.editCar(car.CID, "mileage", this.state.mileage, car.model, car.year)} text="Edit"/>)}</td>
                                            </tr>
                                            <tr>
                                                <td><p>Location: {car.location}</p></td>
                                                <td><TextEntry setValue={this.setLocation} value={this.state.location}/></td>
                                                <td>{this.state.location.length === 0 ? (<input type="submit" value="Edit" disabled/>) : (<Button submit={() => this.editCar(car.CID, "location", this.state.location, car.model, car.year)} text="Edit"/>)}</td>
                                            </tr>
                                            <tr>
                                                <td><p>Price per day: ${car.price}</p></td>
                                                <td><NumberEntry setValue={this.setPrice} value={this.state.price}/></td>
                                                <td>{this.state.price.length === 0 ? (<input type="submit" value="Edit" disabled/>) : (<Button submit={() => this.editCar(car.CID, "price", this.state.price, car.model, car.year)} text="Edit"/>)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                {/*Show availability dates. Dates can be deleted if they are not rented.*/}
                                <p>Availability:</p> {car.availability.map((day) => (
                                    <div>
                                        <table style={{"margin-left":"0.8%"}}>
                                            <tbody>
                                                <tr>
                                                    <td><p>{day} | </p></td>
                                                    {car.rentedDates.includes(day) ?
                                                        <td><i>rented</i></td>
                                                        :
                                                        <td><Button submit={() => this.newOrDeleteDate(car.CID, day, car.model, car.year, "DELETE")} text="Delete" style={{"width":"120%", "padding":"5px"}}/></td>
                                                    }
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                ))}
                                {/*new availability dates can be added*/}
                                <table style={{"margin-left":"0.8%"}}>
                                    <tbody>
                                        <tr>
                                            <td><p>Add availability date:</p></td>
                                            <td><input type="date" id="availability" name="date" onChange={this.setDate} style={{"width":"90%"}}/></td>
                                            <td>{this.state.date === null ? (<input type="submit" value="Add" disabled />) : (<Button submit={() => this.newOrDeleteDate(car.CID, this.state.date, car.model, car.year, "NEW")} text="Add"/>)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                    
                                    
                                    
                                <br/>
                            </Collapsible>}
                    </div>
                ))}
            </div>
        );
    }
}

export default MyListings;