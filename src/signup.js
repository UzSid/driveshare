import React from 'react';
import { Link } from 'react-router-dom';
import { FormDirector, TextEntry, NumberEntry, PasswordEntry, Button } from './UIComponents';
import { NotificationSubject, NotificationObserver } from './notifications'

export default class Signup extends React.Component{

    constructor(props) {
        super(props)
        this.notificationSubject = new NotificationSubject();
        this.notificationObserver = new NotificationObserver();
        this.notificationSubject.setObserver(this.notificationObserver);
        this.state = {
            //variables to hold user inputs
            invalidEmail: false,
            invalidPassword: false,
            email: "",
            password1: "",
            password2: "",
            name: "",
            balance: "",
            secq1: "",
            secq2: "",
            secq3: ""
        };

        //get account info
        fetch("http://localhost/DriveShare/src/accountInfo.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("accountInfo", JSON.stringify(json));				
        });
    }

    //Update email with each change
    setName = (event) => {
        const name = event.target.value;
        if (name.length <= 50) {
            this.setState({name});
        }
    }

    //handles email entry
    setEmail = (event) => {
        const email = event.target.value;
        let accountInfo = JSON.parse(sessionStorage.getItem("accountInfo"));
        if (accountInfo !== null) {
        //check if the password is taken
            for (var i = 0; i < accountInfo.length; i++) {
                if (accountInfo[i].email.toLowerCase() === email.toLowerCase()) {
                    this.setState({invalidEmail: true});
                    break;
                }
                else {
                    this.setState({invalidEmail: false});
                }
            }
        }
        if (email.length <= 50) {
            this.setState({email});
        }
    }

    //handles first password entry
    setPassword1 = (event) => {
        const password1 = event.target.value;
        //passwords must match
        if (password1 === this.state.password2) {
            this.setState({invalidPassword: false});
        }
        else {
            this.setState({invalidPassword: true});
        }
        if (password1.length <= 50) {
            this.setState({password1});
        }
    }

    //handles password confirmation
    setPassword2 = (event) => {
        const password2 = event.target.value;
        //passwords must match
        if (this.state.password1 === password2) {
            this.setState({invalidPassword: false});
        }
        else {
            this.setState({invalidPassword: true});
        }
        if (password2.length <= 50) {
            this.setState({password2});
        }
    }

    setBalance = (event) => {
        const balance = event.target.value;
        if (balance.length <= 11) {
            this.setState({balance});
        }
    }

    setSecq1 = (event) => {
        const secq1 = event.target.value;
        if (secq1.length <= 50) {
            this.setState({secq1});
        }
    }
    
    setSecq2 = (event) => {
        const secq2 = event.target.value;
        if (secq2.length <= 50) {
            this.setState({secq2});
        }
    }
    
    setSecq3 = (event) => {
        const secq3 = event.target.value;
        if (secq3.length <= 50) {
            this.setState({secq3});
        }
    }

    //for submitting signup
    submit = async(name, email, password, balance, secq1, secq2, secq3) => {
        //run SQL via PHP
        let response = await fetch("http://localhost/DriveShare/src/signup.php?name="+name+"&email="+email+
            "&password="+password+"&balance="+balance+"&secq1="+secq1+"&secq2="+secq2+"&secq3="+secq3);
        let status = await response.json();
        console.log(status);
        //if successful, notify user and refresh page
        if (status === "SUCCESS") {
            this.notificationSubject.setNotification(email, "email", "Congratulations, " + name +
                "! You have successfully signed up for DriveShare!"); //notify user
            window.open("http://localhost:3000","_self"); //returns to login page
        }
        else {
            alert("Error signing up.");
        }
    }

    render() {
        return (
            <div class="loginpages">
                <h1>Sign Up</h1>
                {/*Users must enter their information and will be told if it is invalid*/}
                <p>Full name</p>
                <TextEntry setValue={this.setName} value={this.state.name}/>
                <p>Email address</p>
                <TextEntry setValue={this.setEmail} value={this.state.email}/>
                {this.state.invalidEmail === true && <p class="invalid">email address is already in use</p>}
                <p>Password</p>
                <PasswordEntry setPassword={this.setPassword1} value={this.state.password1}/>
                <p>Confirm password</p>
                <PasswordEntry setPassword={this.setPassword2} value={this.state.password2}/>
                {this.state.invalidPassword === true && <p class="invalid">Passwords do not match</p>}
                <p>Account balance</p>
                <NumberEntry setValue={this.setBalance} value={this.state.balance}/>
                <p>Security question 1: What city were you born in?</p>
                <TextEntry setValue={this.setSecq1} value={this.state.secq1}/>
                <p>Security question 2: What was your first car?</p>
                <TextEntry setValue={this.setSecq2} value={this.state.setSecq2}/>
                <p>Security question 3: What was the first exam you failed?</p>
                <TextEntry setValue={this.setSecq3} value={this.state.secq3}/>
                <br/><br/><br/>
                {/*Submit button is disabled unless user's inputs are valid*/}
                {((this.state.invalidEmail === true || this.state.invalidPassword === true) ||
                    (this.state.invalidEmail === true) ||
                    (this.state.email.length === 0) ||
                    (this.state.password1.length === 0) ||
                    (this.state.name.length === 0) ||
                    (this.state.balance.length === 0) ||
                    (this.state.secq1.length === 0) ||
                    (this.state.secq2.length === 0) ||
                    (this.state.secq3.length === 0))
                    ? (<Button disabled={true} text="Submit"/>):(<Button submit={
                        () => this.submit(this.state.name, this.state.email, this.state.password1, this.state.balance,
                        this.state.secq1, this.state.secq2, this.state.secq3)} text="Submit"/>)}                    
                <br/><br/><br/>
                {/*link back to login page*/}
                <nav>
                    <Link to="/" class="link">Already have an account? Log in here.</Link>
                </nav>
            </div>
        )
    }
}