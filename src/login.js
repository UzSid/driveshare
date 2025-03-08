import React from 'react';

//Singleton
let instance = null;

class Login extends React.Component{

    constructor(props) {
        super(props)
        this.email = null;
        this.password = null;

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

    submit = () => {
        fetch("http://localhost/DriveShare/src/accountInfo.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("passwords", JSON.stringify(json));				
        });
        let arr = JSON.parse(sessionStorage.getItem("passwords"));
        for (var i = 0; i < arr.length; i++) {     
            if (arr[i].email === this.email && arr[i].password === this.password) {
                sessionStorage.setItem("UID", arr[i].UID);
                this.props.onLogin();
            }
            else {
                //alert("Invalid login information");
            }
        }
    }
    render() {
        return (
            <div>
                <h1>Please Log In</h1>
                <form>
                    <label>
                    <p>email</p>
                    <input type="text" onChange={e => this.setEmail(e.target.value)} />
                    </label>
                    <label>
                    <p>password</p>
                    <input type="password" onChange={e => this.setPassword(e.target.value)} />
                    </label>
                    <button type="button" onClick={() => this.submit()}>Submit</button>
                </form>
            </div>
        )
    }
}

const login = Object.freeze(new Login());
export default Login;