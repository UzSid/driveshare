import React from "react";
import { Button, PasswordEntry } from "./UIComponents";

//subject
const verificationInterface = {
    verify: function () { }
};

//real subject
class Verification {
    verify() {
        return [false, true]; //first value represents invalidity of user input, second represents verification
    }
}

class VerificationProxy extends React.Component {
    constructor() {    
        super();
        this.verif = new Verification();
    }
    verify(password) {
        //if password is correct, call real subject
        if (password === sessionStorage.getItem("password")) {
            return this.verif.verify();
        }
        else {
            return [true, false]; //first value represents invalidity of user input, second represents verification
        }
    }
}

class Verify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //handle validity and verification status
            invalid: false,
            verified: false,
            balance: 0, //default balance
            password: null
        };
        this.verifProxy = new VerificationProxy();
    }

    //handle password changes
    setPassword = (event) => {
        const password = event.target.value;
        this.setState({password});
    }

     submit = async() => {
        //use verification proxy to set verification status
        this.setState({invalid: this.verifProxy.verify(this.state.password)[0]});
        this.setState({verified: this.verifProxy.verify(this.state.password)[1]});
        if (this.state.verified === true) {this.props.verify();} //enable renting if verification is successful
        //get account balance
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
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <PasswordEntry setPassword={this.setPassword} /* style={{"width":"20%"}} *//>
                                </td>
                                <td>
                                    <Button submit={this.submit} /* style={{"width":"10%"}} */ text="Verify"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {this.state.invalid === true && <p class="invalid">Invalid password</p>}
                    {/*If verified, tell the user their balance*/}
                    {this.state.verified === true && <p style={{"color":"green", "font-weight":"bold"}}>Verified; Your account balance is ${this.state.balance}</p>}
                </form>
            </div>
        );
    }
}

export default Verify;