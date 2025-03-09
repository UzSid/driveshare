import React from "react";

class Car {
    constructor(owner, model, year, mileage, location, price, availability) {
        this.owner = owner;
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
            this.list.push(new Car(carList[i].owner, carList[i].model, carList[i].year, carList[i].mileage, carList[i].location, carList[i].price, this.dates));
            this.dates = [];
        }
    }
}

class CarList extends React.Component {
    constructor() {
        super();
        this.list = [];
        this.state = {
            searchValue: "",
            list: [],
            filteredList: []
        };
        //this.setText = this.setText.bind(this);
    }

    handleSearch = (event) => {
        const searchValue = event.target.value;
        const filteredList = [];
        for (var i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].model.toLowerCase().includes(searchValue.toLowerCase())) {
                filteredList.push(this.state.list[i]);
            }
            else if (this.state.list[i].location.toLowerCase().includes(searchValue.toLowerCase())) {
                filteredList.push(this.state.list[i]);
            }
            else if (this.state.list[i].availability.toString().includes(searchValue)) {
                filteredList.push(this.state.list[i]);
            }
        }
        this.setState({searchValue, filteredList});
        };

    render() {
        const builder = new CarBuilder();
        builder.buildCars();
        this.state.list = builder.list;
        //this.state.filteredList = builder.list;
        return (
            <div>
                <input type="text" value={this.state.searchValue} onChange={this.handleSearch}/>
                {this.state.searchValue.length > 0 ?
                    <div>
                        {this.state.filteredList.map((car) => (
                            <div>
                                <p>Model: {car.model}</p>
                                <p>Owner: {car.owner}</p>
                                <p>Year: {car.year}</p>
                                <p>Mileage: {car.mileage}</p>
                                <p>Location: {car.location}</p>
                                <p>Price: {car.price}</p>
                                <p>Availability:</p> {car.availability.map((day) => (
                                    <p>{day}</p>
                                ))}<br/>
                            </div>
                        ))}
                    </div>
                    :
                    <div>
                        {this.state.list.map((car) => (
                            <div>
                                <p>Model: {car.model}</p>
                                <p>Owner: {car.owner}</p>
                                <p>Year: {car.year}</p>
                                <p>Mileage: {car.mileage}</p>
                                <p>Location: {car.location}</p>
                                <p>Price: {car.price}</p>
                                <p>Availability:</p> {car.availability.map((day) => (
                                    <p>{day}</p>
                                ))}<br/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default CarList;