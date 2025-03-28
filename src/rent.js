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
                    <p><b>Available dates:</b></p> {this.props.availability.map((day) => (
                        <div>
                            {/*Dates are not shown if they are taken*/}
                            {!this.rentDates.includes(day) && <div> <p><input type="checkbox" name="dates[]" value={day} style={{"margin-left":"-47%", "margin-right":"-46%"}}/>{day}</p></div>}
                        </div>
                    ))}
                    {/*User must verify themselves to rent a car (see verification.js)*/}
                    {/*Users cannot rent their own cars*/}
                    <br/>
                    {this.props.CUID == sessionStorage.getItem("UID") ? <p><i>This is your car</i></p> : 
                    <div>{this.props.verified ? <input type="submit" value="Rent" style={{"width":"5%"}}/> : <input type="submit" value="Verify yourself to rent" disabled style={{"width":"10%"}}/>}</div>}
                </form>
            </div>
        );
    }
}

export default Rent;