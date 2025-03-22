import React from "react";

const verificationInterface = {
    verify: function () { }
};

class Verification extends React.Component {
    constructor() {
        super();
    }
    verify() {
        return [false, true];
    }
}

class VerificationProxy extends React.Component {
    constructor() {    
        super();
        this.verif = new Verification();
    }
    verify(password) {
        if (password === sessionStorage.getItem("password")) {
            return this.verif.verify();
        }
        else {
            return [true, false];
            //console.log(this.verif.state.invalid);
        }
    }
}

class Verify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalid: false,
            verified: false,
            balance: 0,
        };
        this.password = null;
        //this.balance = 0;
        this.verifProxy = new VerificationProxy();
    }

    setPassword = (newPassword) => {
        this.password = newPassword;
    }

    async submit() {
        this.setState({invalid: this.verifProxy.verify(this.password)[0]});
        this.setState({verified: this.verifProxy.verify(this.password)[1]});
        this.props.verify();
        let response = await fetch("http://localhost/DriveShare/src/accountInfo.php");
        let arr = await response.json();		
        for (var i = 0; i < arr.length; i++) {     
            if (sessionStorage.getItem("UID") == arr[i].UID) {
                this.setState({balance: arr[i].balance});
            }
        };
    }

    render() {
        return (
            <div>
                <form>
                    <h3>Enter your password to verify yourself before renting a car:</h3>
                    <input type="password" maxlength="64" onChange={e => this.setPassword(e.target.value)}/>
                    <button type="button" onClick={() => this.submit()}>Verify</button>
                    {this.state.invalid === true && <p>Invalid password</p>}
                    {this.state.verified === true && <p>Verified</p>}
                    {this.state.verified === true && <b>Your account balance: {this.state.balance}</b>}
                </form>
            </div>
        );
    }
}

export default Verify;