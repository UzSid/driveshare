import React from "react";
import { FormDirector, Button } from './UIComponents';

//observer interface
const Observer = {
    update: function() {}
};

//subject interface
const Subject = {
    registerObserver: function() {},
    notifyObserver: function() {},
    setNotification: function() {}
}

//concrete subject
export class NotificationSubject extends React.Component {
    constructor() {
        super();
        this.observer = null;
        this.UID = null
        this.column = null;
        this.notification = null;
    }
    //register observer
    setObserver(observer) {
        this.observer = observer;
    }
    notifyObserver(UID, column, notification) {
        this.observer.update(UID, column, notification);
    }
    //build notification then notify observer
    setNotification(UID, column, notification) {
        this.UID = UID;
        this.column = column;
        this.notification = notification;
        this.notifyObserver(this.UID, this.column, this.notification);
    }
}

export class NotificationObserver extends React.Component {
    //add notification to database
    async update(UID, column, notification) {
        await fetch("http://localhost/DriveShare/src/addNotification.php?UID="+UID+"&column="+column+"&notification="+notification);
    }
}

export default class NotificationList extends React.Component {
    constructor() {
        super();
        this.usersNotifications = [];
        //get notification list
        fetch("http://localhost/DriveShare/src/getNotifications.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("notifications", JSON.stringify(json));				
        });
        this.allNotifications = JSON.parse(sessionStorage.getItem("notifications"));
        //get users notifications
        try {
            for (var i = 0; i < this.allNotifications.length; i++) {
                if (this.allNotifications[i].UID == sessionStorage.getItem("UID")) {
                    this.usersNotifications.push(this.allNotifications[i]);
                }
            }            
        }
        catch {
            window.location.reload(true); //refresh page
        }
    }

    //when form is submitted
    submit = async(UID, notification) => {
        //run SQL via PHP
        let response = await fetch("http://localhost/DriveShare/src/deleteNotification.php?UID="+UID+"&notification="+notification);
        let status = await response.json();
        //if successful, notify user and refresh page
        if (status === "SUCCESS") {
            window.location.reload(true);
        }
        else {
            alert("Error deleting notification.");
        }
      }
    
    render() {
        return (
            <div>
                {/*List notifications*/}
                {this.usersNotifications.length > 0 ? <h2 style={{"margin-left":"1%"}}>You have new notifications</h2>
                    : <h2 style={{"margin-left":"1%"}}>You have no notifications</h2>}
                {this.usersNotifications.map((notification) => (
                    <div class="notifications">
                        <table style={{"width":"100%"}}>
                            <tbody>
                                <tr>
                                    <td style={{"width":"93%"}}>
                                        <p>{notification.datetime} | <b>{notification.notification}</b></p>
                                    </td>
                                    <td style={{"width":"7%"}}>
                                        {/* Button for deleting notification */}
                                        <Button style={{"width":"70%"}} submit={() => this.submit(notification.UID, notification.notification)} text="Dismiss"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        
                    </div>
                ))}
            </div>
        );
    }
}