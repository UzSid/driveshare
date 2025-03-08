import React from "react";

class Car {
    constructor(UID, owner, model, year, mileage, location, price) {
        this.UID = UID;
        this.owner = owner;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.location = location;
        this.price = price;
    }
}

class CarBuilder {
    constructor() {
        this.list = [];
    }

    buildCars() {
        fetch("http://localhost/DriveShare/src/carList.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("cars", JSON.stringify(json));				
        });
        let arr = JSON.parse(sessionStorage.getItem("cars"));
        for (var i = 0; i < arr.length; i++) {
            this.list.push(new Car(arr[i].UID, arr[i].owner, arr[i].model, arr[i].year, arr[i].mileage, arr[i].location, arr[i].price));
        }
    }
}

class CarList extends React.Component {
    render() {
        const builder = new CarBuilder();
        builder.buildCars();
        return (
            <div>
                {builder.list.map((car) => (
                    <div>
                        <p>Model: {car.model}</p>
                        <p>Owner: {car.owner}</p>
                        <p>Year: {car.year}</p>
                        <p>Mileage: {car.mileage}</p>
                        <p>Location: {car.location}</p>
                        <p>Price: {car.price}</p><br/>
                    </div>
                ))}
            </div>
        );
    }
}

export default CarList;