import React from "react";
import Collapsible from "react-collapsible";
import { FormDirector, TextEntry, Button } from './UIComponents';
import { NotificationSubject, NotificationObserver } from './notifications'

export default class Messages extends React.Component {
    constructor() {
        super();
        this.messagedUsers = [];
        this.notificationSubject = new NotificationSubject();
        this.notificationObserver = new NotificationObserver();
        this.notificationSubject.setObserver(this.notificationObserver);
        this.state = {
            emailValue: "",
            invalidUser: true, //for when the user tries to message a nonexistent user
            message: "",
            newMessage: ""
        };
        try {
            fetch("http://localhost/DriveShare/src/accountInfo.php")
            .then(response => response.json())
            .then(json => {
                sessionStorage.setItem("accountInfo", JSON.stringify(json));				
            });
            this.allUsers = JSON.parse(sessionStorage.getItem("accountInfo")); //get user info
            fetch("http://localhost/DriveShare/src/getMessages.php")
            .then(response => response.json())
            .then(json => {
                sessionStorage.setItem("messages", JSON.stringify(json));			
            });
            this.messages = JSON.parse(sessionStorage.getItem("messages")); //get existing messages
            //get list of users user talked to
            for (var i = 0; i < this.messages.length; i++) {
                if (!this.messagedUsers.includes(this.messages[i].senderEmail) && sessionStorage.getItem("email") == this.messages[i].receiverEmail) {
                    this.messagedUsers.push(this.messages[i].senderEmail);
                }
                else if (!this.messagedUsers.includes(this.messages[i].receiverEmail) && sessionStorage.getItem("email") == this.messages[i].senderEmail) {
                    this.messagedUsers.push(this.messages[i].receiverEmail);
                }
            }            
        }
        catch {
            window.location.reload(true); //refresh page
        }
    }

    //update email value on edit; set invalid if the email address does not belong to a registered user
    handleEmailValue = (event) => {
        const emailValue = event.target.value;
        let invalidUser = true
        for (var i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i].email.toLowerCase() === emailValue.toLowerCase()) {
                invalidUser = false;
                break;
            }
        }
        this.setState({emailValue, invalidUser});
    };

    setMessage = (event) => {
        const message = event.target.value;
        if (message.length <= 150) {
            this.setState({message});
        }
    }

    setNewMessage = (event) => {
        const newMessage = event.target.value;
        if (newMessage.length <= 200) {
            this.setState({newMessage});
        }
    }

    //when form is submitted
    submit = async(senderEmail, receiverEmail, message) => {
        //run SQL via PHP
        let response = await fetch("http://localhost/DriveShare/src/addMessage.php?senderEmail="+senderEmail+"&receiverEmail="+receiverEmail+"&message="+message);
        let status = await response.json();
        //if successful, notify user and refresh page
        if (status === "SUCCESS") {
            this.notificationSubject.setNotification(receiverEmail, "email", "New message from " + senderEmail); //notify message receiver
            window.location.reload(true); //refresh page
        }
        else {
            alert("Error sending message.");
        }
    }

    render() {
        return (
            <div>
                {/*Only show this heading if the user has any conversations*/}
                {this.messagedUsers.length > 0 && <h2 style={{"margin-left":"1%"}}>Your conversations</h2>}
                {this.messagedUsers.map((user) => (
                    <Collapsible trigger={<h3 style={{"margin-left":"1%"}}>{user}</h3>}>
                        <hr/>
                        {this.messages.map((message) => (
                            <div>
                                {/*Show messages if the user is either the sender or receiver*/}
                                {((user == message.senderEmail || user == message.receiverEmail)
                                    && (sessionStorage.getItem("email") == message.senderEmail || sessionStorage.getItem("email") == message.receiverEmail)) &&
                                    <div>
                                        {sessionStorage.getItem("email") == message.receiverEmail ?
                                            <div class="messagereceiver">
                                                <p style={{"margin-bottom":"1%"}}>{message.datetime}</p>
                                                <p><b class="messagereceivermessage">{message.message}</b></p>
                                                <br/>
                                            </div>
                                            :
                                            <div class="messagesender">
                                                <p style={{"margin-bottom":"1%"}}>{message.datetime}</p>
                                                <p><b class="messagesendermessage">{message.message}</b></p>
                                                <br/>
                                            </div>}
                                    </div>
                                }
                            </div>
                        ))}
                        {/*Form for another message*/}
                            <table style={{"width":"99%"}}>
                                <tbody>
                                    <tr>
                                        <td style={{"width":"11%"}}>
                                            <p>Send a new message:</p>
                                        </td>
                                        <td style={{"width":"100%"}}>
                                            <TextEntry setValue={this.setMessage} value={this.state.message} style={{"width":"99%"}}/>
                                        </td>
                                        <td>
                                            {this.state.message.length === 0 ? (<Button disabled={true} text="Submit"/>) : (<Button submit={
                                                () => this.submit(sessionStorage.getItem("email"), user, this.state.message)} text="Send"/>)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </Collapsible>
                ))}
                {/* Add some space between existing conversations and the new conversation section */}
                {this.messagedUsers.length > 0 && <div><br/><br/><br/></div>}
                <h2 style={{"margin-left":"1%"}}>Start a new conversation</h2>
                {/*Form for sending messages to users not yet message; email address must belong to a registered user*/}
                <p style={{"margin-left":"1%"}}>Receiver's email address:</p>
                <TextEntry setValue={this.handleEmailValue} style={{"width":"96%", "margin-left":"1%"}}/>
                {(this.state.invalidUser === true && this.state.emailValue.length !== 0) && <p class="invalid" style={{"margin-left":"1%"}}>email address not found</p>}
                <p style={{"margin-left":"1%"}}>Message:</p>
                <TextEntry setValue={this.setNewMessage} value={this.state.newMessage} style={{"width":"96%", "margin-left":"1%"}}/><br/>
                {(this.state.invalidUser === true || this.state.emailValue === sessionStorage.getItem("email") || this.state.emailValue.length === 0
                    || this.state.newMessage.length === 0) ? (<Button disabled={true} style={{"width":"97%", "margin-left":"1%"}} text="Send"/>) : (<Button submit={
                        () => this.submit(sessionStorage.getItem("email"), this.state.emailValue, this.state.newMessage)} style={{"width":"97.5%", "margin-left":"1%"}} text="Send"/>)}
                <br/>
            </div>
        );
    }
}