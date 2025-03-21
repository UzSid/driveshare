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
        };
        this.password = null;
        this.verifProxy = new VerificationProxy();
    }

    setPassword = (newPassword) => {
        this.password = newPassword;
    }

    submit = () => {
        this.setState({invalid: this.verifProxy.verify(this.password)[0]});
        this.setState({verified: this.verifProxy.verify(this.password)[1]});
        this.props.verify();
        console.log(this.state.invalid);
    }

    render() {
        return (
            <div>
                <form>
                    <p>Enter your password to verify yourself:</p>
                    <input type="password" maxlength="64" onChange={e => this.setPassword(e.target.value)}/>
                    <button type="button" onClick={() => this.submit()}>Verify</button>
                    {this.state.invalid === true && <p>Invalid password</p>}
                    {this.state.verified === true && <p>Verified</p>}
                </form>
            </div>
        );
    }
}

export default Verify;