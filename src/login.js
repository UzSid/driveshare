import React from 'react';
import { Link } from 'react-router-dom';
import { FormDirector, TextEntry, Button, PasswordEntry } from './UIComponents';

//for singleton
let instance = null;
//also the mediator
class Login extends React.Component {

    constructor(props) {
        super(props)
        this.email = null;
        this.password = null;
        this.state = {
            invalid: false //for invalid logins
        };

        //for singleton
        if (!instance) {
            instance = this;
        }
    }

    //Update email with each change
    setEmail = (event) => {
        this.email = event.target.value;
    }

    //Update password with each change
    setPassword = (event) => {
        this.password = event.target.value;
    }

    submit = async() => {
        try {
            //Get account info from database
            let response = await fetch("http://localhost/DriveShare/src/accountInfo.php");
            let accountInfo = await response.json();
            for (var i = 0; i < accountInfo.length; i++) {
                //Find email and password match
                if (accountInfo[i].email.toLowerCase() === this.email.toLowerCase() && accountInfo[i].password === this.password) {
                    //Set sessionStorage items for easy accesss later
                    sessionStorage.setItem("UID", accountInfo[i].UID);
                    sessionStorage.setItem("name", accountInfo[i].name);
                    sessionStorage.setItem("email", accountInfo[i].email);
                    sessionStorage.setItem("password", accountInfo[i].password);
                    //Log in (see App.js)
                    this.props.onLogin();
                }
                else {
                    this.setState({invalid: true});
                }
            }
        }
        catch {
            this.setState({invalid: true});
        }
    }

    render() {
        return (
            <div class="loginpages">
                <h1>Log In</h1>
                <br/>
                <p>Email address</p>
                <TextEntry setValue={this.setEmail}/>
                <p>Password</p>
                <PasswordEntry setPassword={this.setPassword}/>
                {this.state.invalid === true ? <p class="invalid">Invalid login information</p> /*Show message if login is invalid*/ : <div><br/><br/></div>}                
                <Button submit={this.submit} text="Submit"/>
                <br/><br/><br/>
                <nav>
                    {/*Links to other login-related pages*/}
                    <Link to="/signup" class="link">Don't have an account? Sign up here.</Link>
                    <br/><br/>
                    <Link to="/recovery" class="link">Forgot your password?</Link>
                </nav>
            </div>
        )
    }
}

//create singleton object
const login = Object.freeze(new Login());
export default Login;