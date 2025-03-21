import React from 'react';
import { Link } from 'react-router-dom';

//Singleton
let instance = null;

class Signup extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            invalidEmail: false,
            invalidPassword: false,
            email: null,
            password1: null,
            password2: null
        };
        fetch("http://localhost/DriveShare/src/accountInfo.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("accountInfo", JSON.stringify(json));				
        });
        
        //Singleton
        if (!instance) {
            instance = this;
        }
    }

    setPassword1 = (event) => {
        const password1 = event.target.value;
        if (password1 === this.state.password2) {
            this.setState({invalidPassword: false});
        }
        else {
            this.setState({invalidPassword: true});
        }
        this.setState({password1});
    }

    setPassword2 = (event) => {
        const password2 = event.target.value;
        if (this.state.password1 === password2) {
            this.setState({invalidPassword: false});
        }
        else {
            this.setState({invalidPassword: true});
        }
        this.setState({password2});
    }

    setEmail = (event) => {
        const email = event.target.value;
        let arr = JSON.parse(sessionStorage.getItem("accountInfo"));
        for (var i = 0; i < arr.length; i++) {     
            if (arr[i].email.toLowerCase() === email.toLowerCase()) {
                this.setState({invalidEmail: true});
                break;
            }
            else {
                this.setState({invalidEmail: false});
            }
        }
        this.setState({email});
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <form action="http://localhost/DriveShare/src/signup.php" method="GET">
                    <p>full name</p>
                    <input type="text" name="name" maxlength="64" required/>
                    <p>email</p>
                    <input type="text" name="email" maxlength="64" required value={this.state.email} onChange={this.setEmail}/>
                    {this.state.invalidEmail === true && <p>email address is already in use</p>}
                    <p>password</p>
                    <input type="password" name="password1" maxlength="64" required value={this.state.password1} onChange={this.setPassword1}/>
                    <p>confirm password</p>
                    <input type="password" name="password2" maxlength="64" required value={this.state.password2} onChange={this.setPassword2}/>
                    {this.state.invalidPassword === true && <p>passwords do not match</p>}
                    <p>account balance</p>
                    <input type="number" name="balance" maxlength="11" required/>
                    <p>security question 1: What city were you born in?</p>
                    <input type="text" name="secq1" maxlength="1000" required/>
                    <p>security question 2: What was the make and model of your first car?</p>
                    <input type="text" name="secq2" maxlength="1000" required/>
                    <p>security question 3: What was the first exam you failed?</p>
                    <input type="text" name="secq3" maxlength="1000" required/>
                    <br/><br/>
                    {this.state.invalidEmail === true || this.state.invalidPassword === true ? (<input type="submit" disabled/>):(<input type="submit"/>)}                    
                </form>
                <br/>
                <nav>
                    <Link to="/">Already have an account? Log in here.</Link>
                </nav>
            </div>
        )
    }
}

export default Signup;