import React from "react";

class Rent extends React.Component {
    constructor(props) {
        super(props);
        this.rentDates = [];
        //get rental information
        fetch("http://localhost/DriveShare/src/getRents.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("rentedDates", JSON.stringify(json));			
        });
        let rentedDates = JSON.parse(sessionStorage.getItem("rentedDates"));
        for (var i=0; i < rentedDates.length; i++) {
            if (rentedDates[i].CID === this.props.CID) {
                this.rentDates.push(rentedDates[i].date);
            }
        }
    }

    render() {
        return (
            <div>
                <form action="http://localhost/DriveShare/src/rent.php" method="GET">
                    {/*Extra information needed for database request*/}
                    <input type="hidden" name="CID" value={this.props.CID}/>
                    <input type="hidden" name="UID" value={sessionStorage.getItem("UID")}/>
                    <input type="hidden" name="price" value={this.props.price}/>
                    {/*checkboxes for the user to select which days they want to rent*/}
                    <p>Availability:</p> {this.props.availability.map((day) => (
                        <div>
                            {/*Dates are not shown if they are taken*/}
                            {!this.rentDates.includes(day) && <p><input type="checkbox" name="dates[]" value={day}/> {day}</p>}
                        </div>
                    ))}
                    {/*User must verify themselves to rent a car (see verification.js)*/}
                    {this.props.verified ? <input type="submit" value="Rent"/> : <input type="submit" value="Rent" disabled/>}
                </form>
            </div>
        );
    }
}

export default Rent;