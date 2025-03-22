import React from 'react';
import { Link } from 'react-router-dom';

//Singleton
let instance = null;

class Login extends React.Component{

    constructor(props) {
        super(props)
        this.email = null;
        this.password = null;
        this.state = {
            invalid: false //for invalid logins
        };

        //Singleton
        if (!instance) {
            instance = this;
        }
    }

    //Update password with each change
    setPassword = (newPassword) => {
        this.password = newPassword;
    }

    //Update email with each change
    setEmail = (newEmail) => {
        this.email = newEmail;
    }

    async submit() {
        if (this.email === null || this.password === null) {
            this.setState({invalid: true});
            return;
        }
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
        };
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <form>
                    <label>
                    <p>email</p>
                    <input type="text" maxlength="64" onChange={e => this.setEmail(e.target.value)}/>
                    </label>
                    <label>
                    <p>password</p>
                    <input type="password" maxlength="64" onChange={e => this.setPassword(e.target.value)}/>
                    </label>
                    {this.state.invalid === true && <p>Invalid login information</p> /*Show message if login is invalid*/}
                    <br/><br/>
                    <button type="button" onClick={() => this.submit()}>Submit</button>
                </form>
                <br/>
                <nav>
                    {/*Links to other login-related pages*/}
                    <Link to="/signup">Don't have an account? Sign up here.</Link>
                    <br/><br/>
                    <Link to="/recovery">Forgot your password?</Link>
                </nav>
            </div>
        )
    }
}

//create singleton object
const login = Object.freeze(new Login());
export default Login;