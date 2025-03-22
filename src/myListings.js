import React from "react";

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
        fetch("http://localhost/DriveShare/src/carList.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("cars", JSON.stringify(json));				
        });
        fetch("http://localhost/DriveShare/src/getAvail.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("availability", JSON.stringify(json));			
        });
        fetch("http://localhost/DriveShare/src/getRents.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("rentedDateList", JSON.stringify(json));			
        });
        let carList = JSON.parse(sessionStorage.getItem("cars"));
        let availability = JSON.parse(sessionStorage.getItem("availability"));
        let rentedDateList = JSON.parse(sessionStorage.getItem("rentedDateList"));
        for (var i = 0; i < carList.length; i++) {
            for (var j = 0; j < availability.length; j++) {
                if (availability[j].CID === carList[i].CID) {
                    this.dates.push(availability[j].date);
                }
            }
            for (var j = 0; j < rentedDateList.length; j++) {
                if (rentedDateList[j].CID === carList[i].CID) {
                    this.rentedDates.push(rentedDateList[j].date);
                }
                if (rentedDateList[j].UID == sessionStorage.getItem("UID") && !this.rentedList.includes(carList[i])) {
                    this.rentedList.push(carList[i]);
                }
            }
            this.listings.push(new Car(carList[i].CID, carList[i].UID, carList[i].owner, carList[i].model, carList[i].year, carList[i].mileage, carList[i].location, carList[i].price, this.dates, this.rentedDates));
            this.dates = [];
            this.rentedDates = [];
        }
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
        this.list = [];
        this.state = {
            listings: [],
            rentedCars: []
        };
        //this.setText = this.setText.bind(this);
    }

    render() {
        const builder = new CarBuilder();
        builder.buildCars();
        this.state.listings = builder.listings;
        this.state.rentedCars = builder.rentedCars;
        //this.state.filteredList = builder.list;
        return (
            <div>
                <h3>Cars you currently have booked</h3>
                {this.state.rentedCars.map((car) => (
                    <div>
                        <p>Model: {car.model}</p>
                        <p>Year: {car.year}</p>
                        <p>Owner: {car.ownerName}</p>
                        <p>Dates rented:</p> {car.rentedDates.map((day) => (
                            <p>{day}</p>
                        ))}
                        <br/>
                    </div>
                ))}
                <h3>Cars you have listed for rental</h3>
                {this.state.listings.map((car) => (
                    <div>
                        {car.UID == sessionStorage.getItem("UID") &&
                            <div>
                                <div>
                                    {car.rentedDates.length > 0 ? <p>Model: {car.model} <i>rented</i></p>
                                    :
                                    <form action="http://localhost/DriveShare/src/deleteCar.php" method="GET">
                                        <input type="hidden" name="CID" value={car.CID}/>
                                        <p>Model: {car.model} <input type="submit" value="Delete"/></p>
                                    </form>
                                    }
                                </div>
                                <p>Year: {car.year}</p>
                                <form action="http://localhost/DriveShare/src/editCar.php" method="GET">
                                    <input type="hidden" name="column" value="mileage"/>
                                    <input type="hidden" name="CID" value={car.CID}/>
                                    <p>Mileage: {car.mileage} <input type="number" name="value" maxlength="11" required/> <input type="submit" value="Edit"/></p>
                                </form>
                                <form action="http://localhost/DriveShare/src/editCar.php" method="GET">
                                    <input type="hidden" name="column" value="location"/>
                                    <input type="hidden" name="CID" value={car.CID}/>
                                    <p>Location: {car.location} <input type="text" name="value" maxlength="64" required/> <input type="submit" value="Edit"/></p>
                                </form>
                                <form action="http://localhost/DriveShare/src/editCar.php" method="GET">
                                    <input type="hidden" name="column" value="price"/>
                                    <input type="hidden" name="CID" value={car.CID}/>
                                    <p>Price: {car.price} <input type="number" name="value" maxlength="11" required/> <input type="submit" value="Edit"/></p>
                                </form>
                                <p>Availability:</p> {car.availability.map((day) => (
                                    <div>
                                        {car.rentedDates.includes(day) ?
                                        <p>{day} <i>rented</i></p>
                                        :
                                        <form action="http://localhost/DriveShare/src/deleteDate.php" method="GET">
                                            <input type="hidden" name="CID" value={car.CID}/>
                                            <input type="hidden" name="date" value={day}/>
                                            <p>{day} <input type="submit" value="Delete"/></p>
                                        </form>
                                        }
                                    </div>
                                ))}
                                <form action="http://localhost/DriveShare/src/newDate.php" method="GET">
                                    <input type="hidden" name="CID" value={car.CID}/>
                                    <label for="availability">Add availability date:</label>
                                    <input type="date" id="availability" name="date"/>
                                    <input type="submit" value="Add"/>
                                </form>
                                <br/>
                            </div>}
                    </div>
                ))}
            </div>
        );
    }
}

export default MyListings;