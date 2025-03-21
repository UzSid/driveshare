import React from "react";

class Messages extends React.Component {
    constructor() {
        super();
        this.messagedUsers = [];
        this.state = {
            emailValue: "",
            invalidUser: true
        };
        fetch("http://localhost/DriveShare/src/accountInfo.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("accountInfo", JSON.stringify(json));				
        });
        this.allUsers = JSON.parse(sessionStorage.getItem("accountInfo"));
        fetch("http://localhost/DriveShare/src/getMessages.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("messages", JSON.stringify(json));			
        });
        this.messages = JSON.parse(sessionStorage.getItem("messages"));
        for (var i = 0; i < this.messages.length; i++) {
            if (!this.messagedUsers.includes(this.messages[i].senderEmail) && sessionStorage.getItem("email") == this.messages[i].receiverEmail) {
                this.messagedUsers.push(this.messages[i].senderEmail)
            }
            else if (!this.messagedUsers.includes(this.messages[i].receiverEmail) && sessionStorage.getItem("email") == this.messages[i].senderEmail) {
                this.messagedUsers.push(this.messages[i].receiverEmail)
            }
        }
    }

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

    render() {
        return (
            <div>
                <h3>Your conversations</h3>
                {this.messagedUsers.map((user) => (
                    <div>
                        <p>{user}</p>
                        {this.messages.map((message) => (
                            <div>
                                {((user == message.senderEmail || user == message.receiverEmail) && (sessionStorage.getItem("email") == message.senderEmail || sessionStorage.getItem("email") == message.receiverEmail)) &&
                                <div>
                                    <p>{message.datetime} {message.senderEmail}: {message.message}</p>
                                </div>
                                }
                            </div>
                        ))}
                <form action="http://localhost/DriveShare/src/addMessage.php" method="GET">
                    <input type="hidden" name="senderEmail" value={sessionStorage.getItem("email")}/>
                    <input type="hidden" name="receiverEmail" value={user}/>
                    <label for="message">send a new message: </label><br/>
                    <input type="text" name="message" maxlength="8000" required/><br/><br/>
                    <input type="submit" value="Send"/>
                </form>
                    </div>
                ))}
                <h3>Start a new conversation</h3>
                <form action="http://localhost/DriveShare/src/addMessage.php" method="GET">
                    <input type="hidden" name="senderEmail" value={sessionStorage.getItem("email")}/>
                    <label for="email">receiver's email address: </label><br/>
                    <input type="text" name="receiverEmail" required  value={this.state.emailValue} onChange={this.handleEmailValue}/><br/><br/>
                    {(this.state.invalidUser === true && this.state.emailValue.length !== 0) && <p>email address not found</p>}
                    <label for="message">message: </label><br/>
                    <input type="text" name="message" maxlength="8000" required/><br/><br/>
                    {(this.state.invalidUser === true && this.state.emailValue.length !== 0) ? (<input type="submit" value="Send" disabled/>) : (<input type="submit" value="Send"/>)}
                </form>
            </div>
        );
    }
}

export default Messages;