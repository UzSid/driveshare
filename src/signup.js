import React from 'react';
import { Link } from 'react-router-dom';
import { FormDirector, TextEntry, NumberEntry, PasswordEntry } from './UIComponents';

class Signup extends React.Component{

    constructor(props) {
        super(props)
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
        let arr = JSON.parse(sessionStorage.getItem("accountInfo"));
        //check if the password is taken
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].email.toLowerCase() === email.toLowerCase()) {
                this.setState({invalidEmail: true});
                break;
            }
            else {
                this.setState({invalidEmail: false});
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

    render() {
        return (
            <div class="loginpages">
                <h1>Sign Up</h1>
                <form action="http://localhost/DriveShare/src/signup.php" method="GET">
                    <input type="hidden" name="name" value={this.state.name}/>
                    <input type="hidden" name="email" value={this.state.email}/>
                    <input type="hidden" name="password" value={this.state.password1}/>
                    <input type="hidden" name="balance" value={this.state.balance}/>
                    <input type="hidden" name="secq1" value={this.state.secq1}/>
                    <input type="hidden" name="secq2" value={this.state.secq2}/>
                    <input type="hidden" name="secq3" value={this.state.secq3}/>
                    {/*Users must enter their information and will be told if it is invalid*/}
                    <p>Full name</p>
                    <TextEntry setValue={this.setName} value={this.state.name}/>
                    <p>Email address</p>
                    <TextEntry setValue={this.setEmail} value={this.state.email}/>
                    {this.state.invalidEmail === true && <p>email address is already in use</p>}
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
                        ? (<input type="submit" disabled/>):(<input type="submit"/>)}                    
                </form>
                <br/><br/><br/>
                {/*link back to login page*/}
                <nav>
                    <Link to="/" class="link">Already have an account? Log in here.</Link>
                </nav>
            </div>
        )
    }
}

export default Signup;