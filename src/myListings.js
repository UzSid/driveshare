import React from "react";

class Car {
    constructor(CID, UID, ownerName, model, year, mileage, location, price, availability) {
        this.CID = CID;
        this.UID = UID;
        this.ownerName = ownerName;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.location = location;
        this.price = price;
        this.availability = availability;
    }
}

class CarBuilder{
    constructor() {
        this.list = [];
        this.dates = [];
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
        let carList = JSON.parse(sessionStorage.getItem("cars"));
        let availability = JSON.parse(sessionStorage.getItem("availability"));
        for (var i = 0; i < carList.length; i++) {
            for (var j = 0; j < availability.length; j++) {
                if (availability[j].CID === carList[i].CID) {
                    this.dates.push(availability[j].date);
                }
            }
            this.list.push(new Car(carList[i].CID, carList[i].UID, carList[i].owner, carList[i].model, carList[i].year, carList[i].mileage, carList[i].location, carList[i].price, this.dates));
            this.dates = [];
        }
    }
}

class MyListings extends React.Component {
    constructor() {
        super();
        this.list = [];
        this.state = {
            list: [],
        };
        //this.setText = this.setText.bind(this);
    }

    render() {
        const builder = new CarBuilder();
        builder.buildCars();
        this.state.list = builder.list;
        //this.state.filteredList = builder.list;
        return (
            <div>
                {this.state.list.map((car) => (
                    <div>
                        {car.UID == sessionStorage.getItem("UID") &&
                            <div>
                                <form action="http://localhost/DriveShare/src/deleteCar.php" method="GET">
                                    <input type="hidden" name="CID" value={car.CID}/>
                                    <p>Model: {car.model} <input type="submit" value="Delete"/></p>
                                </form>
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
                                    <form action="http://localhost/DriveShare/src/deleteDate.php" method="GET">
                                        <input type="hidden" name="CID" value={car.CID}/>
                                        <input type="hidden" name="date" value={day}/>
                                        <p>{day} <input type="submit" value="Delete"/></p>
                                    </form>
                                    
                                    //add form for each day to delete day
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