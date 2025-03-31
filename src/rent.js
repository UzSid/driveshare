import React from "react";
import { FormDirector, Button, Checkbox } from './UIComponents';
import { NotificationSubject, NotificationObserver } from './notifications'

export default class Rent extends React.Component {
    constructor(props) {
        super(props);
        this.notificationSubject = new NotificationSubject();
        this.notificationObserver = new NotificationObserver();
        this.notificationSubject.setObserver(this.notificationObserver);
        this.rentDates = [];
        this.state = {
            dates: []
        }
        //get rental information
        fetch("http://localhost/DriveShare/src/getRents.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("rentedDates", JSON.stringify(json));			
        });
        let rentedDates = JSON.parse(sessionStorage.getItem("rentedDates"));
        //get rented dates for the specific car
        try {
            for (var i=0; i < rentedDates.length; i++) {
                if (rentedDates[i].CID === this.props.CID) {
                    this.rentDates.push(rentedDates[i].date);
                }
            }            
        }
        catch {
            window.location.reload(true); //refresh page
        }
    }

    //for editing days user selects for rental
    dateListChange = (day) => {
        for (var i = 0; i < this.state.dates.length; i++) {
            if (this.state.dates[i] === day) {
                this.state.dates.splice(i, 1);
                return;
            }
        }
        this.state.dates.push(day);
        this.state.dates.sort();
        this.setState(this.state.dates);
    }

    submit = async(CID, UID, price, dates) => {
        let response = await fetch("http://localhost/DriveShare/src/rent.php?CID="+CID+"&UID="+UID+"&price="+price+"&dates="+dates);
        let status = await response.json();
        //if successful, notify user and refresh page
        if (status === "SUCCESS") {
            this.notificationSubject.setNotification(this.props.CUID, "notEmail",
                sessionStorage.getItem("name") + " rented your " + this.props.year + " " + this.props.model); //notify car owner
            this.notificationSubject.setNotification(sessionStorage.getItem("UID"), "notEmail",
                "You rented " + this.props.owner + "'s " + this.props.year + " " + this.props.model); //notify user
            window.location.reload(true);
        }
        else {
            alert("Error renting car.");
        }
    }

    render() {
        return (
            <div style={{"margin-left":"1%"}}>
                {/*Extra information needed for database request*/}
                {/*checkboxes for the user to select which days they want to rent*/}
                <p><b>Available dates:</b></p> {this.props.availability.map((day) => (
                    <div>
                        {/*Dates are not shown if they are taken*/}
                        {!this.rentDates.includes(day) &&
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><Checkbox onChange={e => this.dateListChange(day)} style={{"margin-left":"-47%", "margin-right":"-46%"}}/></td>
                                        <td>{day}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                        </div>
                        }
                    </div>
                ))}
                {/*User must verify themselves to rent a car (see verification.js)*/}
                {/*Users cannot rent their own cars*/}
                {this.props.CUID == sessionStorage.getItem("UID") ? <p><i>This is your car</i></p> : 
                <div>{!this.props.verified ? <Button disabled={true} style={{"width":"10%"}} text="Verify yourself to rent"/> : <Button submit={
                    () => this.submit(this.props.CID, sessionStorage.getItem("UID"), this.props.price, JSON.stringify(this.state.dates))}
                    text="Rent" style={{"width":"5%"}}/>}</div>}
            </div>
        );
    }
}