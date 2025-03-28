import React from "react";
import Collapsible from "react-collapsible";
import Rent from "./rent";
import Verify from "./verification";
import { TextEntry } from "./UIComponents";

//Director
class Director {
    buildCars(abstractBuilder) {
        return abstractBuilder.buildCars();
    }
}

//Abstract builder
class AbstractBuilder {
    buildCars() {};
}

//Product
class Car {
    constructor(CID, UID, owner, model, year, mileage, location, price, availability) {
        this.CID = CID;
        this.UID = UID;
        this.owner = owner;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.location = location;
        this.price = price;
        this.availability = availability;
    }
}

//Concrete builder
class CarBuilder extends AbstractBuilder {
    constructor() {
        super();
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
            //Push products to list
            this.list.push(new Car(carList[i].CID, carList[i].UID, carList[i].owner, carList[i].model, carList[i].year, carList[i].mileage, carList[i].location, carList[i].price, this.dates));
            this.dates = [];
        }
        return this.list;
    }
}

class CarList extends React.Component {
    constructor() {
        super();
        this.list = [];
        this.state = {
            searchValue: "",
            list: [],
            filteredList: [],
            //for verification
            verified: false
        };
    }

    handleSearch = (event) => {
        const searchValue = event.target.value;
        const filteredList = [];
        for (var i = 0; i < this.state.list.length; i++) {
            //Add cars to filtered list if their name, location, or availability matches what is in the search bar
            if (this.state.list[i].model.toLowerCase().includes(searchValue.toLowerCase())) {
                filteredList.push(this.state.list[i]);
            }
            else if (this.state.list[i].location.toLowerCase().includes(searchValue.toLowerCase())) {
                filteredList.push(this.state.list[i]);
            }
            else if (this.state.list[i].year.toString().includes(searchValue)) {
                filteredList.push(this.state.list[i]);
            }
            else if (this.state.list[i].availability.toString().includes(searchValue)) {
                filteredList.push(this.state.list[i]);
            }
        }
        this.setState({searchValue, filteredList});
    };

    handleVerification = () => {
        this.setState({verified: true});
    }

    render() {
        //Create director and builder object and build
        const director = new Director();
        const carBuilder = new CarBuilder();
        this.state.list = director.buildCars(carBuilder);
        return (
            <div>
                <Verify verify={this.handleVerification}/> {/*Verification component; must verify before renting*/}
                <h3 style={{"margin-left":"1%"}}>Search for a car:</h3>
                <TextEntry setValue={this.handleSearch} style={{"margin-left":"1%"}}/> {/*Search bar*/}
                <p style={{"margin-left":"1%"}}>Search by model, location, or availability</p><br/>
                {this.state.searchValue.length > 0 ? //if there is something in the search bar, show filtered list. Otherwise, show the whole thing.
                    <div>
                        {this.state.filteredList.map((car) => (
                            <Collapsible trigger={<h3 style={{"margin-left":"1%"}}>{car.year + " " + car.model}</h3>}>
                                <hr/>
                                <p>Hosted by {car.owner}</p>
                                <p><b>Mileage:</b> {car.mileage} miles</p>
                                <p><b>Location:</b> {car.location}</p>
                                <p><b>Price per day:</b> ${car.price}</p>
                                <Rent availability={car.availability} CID={car.CID} verified={this.state.verified} price={car.price}/>
                            </Collapsible>
                        ))}
                    </div>
                    :
                    <div>
                        {this.state.list.map((car) => (
                            <Collapsible trigger={<h3 style={{"margin-left":"1%"}}>{car.year + " " + car.model}</h3>}>
                                <hr/>
                                <p>Hosted by {car.owner}</p>
                                <p><b>Mileage:</b> {car.mileage} miles</p>
                                <p><b>Location:</b> {car.location}</p>
                                <p><b>Price per day:</b> ${car.price}</p>
                                <Rent availability={car.availability} CID={car.CID} CUID={car.UID} verified={this.state.verified} price={car.price}/>
                            </Collapsible>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default CarList;