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
            invalid: false
        };

        //Singleton
        if (!instance) {
            instance = this;
        }
    }

    setPassword = (newPassword) => {
        this.password = newPassword;
    }

    setEmail = (newEmail) => {
        this.email = newEmail;
    }

    async submit() {
        if (this.email === null || this.password === null) {
            this.setState({invalid: true});
            return;
        }
        let response = await fetch("http://localhost/DriveShare/src/accountInfo.php");
        let arr = await response.json();
        //sessionStorage.setItem("accountInfo", JSON.stringify(data));				
        for (var i = 0; i < arr.length; i++) {     
            if (arr[i].email.toLowerCase() === this.email.toLowerCase() && arr[i].password === this.password) {
                sessionStorage.setItem("UID", arr[i].UID);
                sessionStorage.setItem("name", arr[i].name);
                sessionStorage.setItem("email", arr[i].email);
                sessionStorage.setItem("password", arr[i].password);
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
                    {this.state.invalid === true && <p>Invalid login information</p>}
                    <br/><br/>
                    <button type="button" onClick={() => this.submit()}>Submit</button>
                </form>
                <br/>
                <nav>
                    <Link to="/signup">Don't have an account? Sign up here.</Link>
                    <br/><br/>
                    <Link to="/recovery">Forgot your password?</Link>
                </nav>
            </div>
        )
    }
}

const login = Object.freeze(new Login());
export default Login;