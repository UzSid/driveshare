import React from "react";
import { Link } from 'react-router-dom';

//handler class
class Handler {
    constructor() {
        this.successor = null;
    }
    setSuccessor(successor) {
        this.successor = successor;
    }
    handleQuestion() {}
}

//concrete handler
class EmailHandler extends Handler {
    handleQuestion(accountInfo, email, question1, question2, question3) {
        //search email list
        for (var i = 0; i < accountInfo.length; i++) {
            if (email === null) {
                //the number returned represents which question the user failed at
                return 0;
            }
            //if email is found, send to successor
            else if (accountInfo[i].email.toLowerCase() === email.toLowerCase()) {
                let newArr = accountInfo[i];                
                return this.successor.handleQuestion(newArr, question1, question2, question3);
            }
        }
        //the number returned represents which question the user failed at
        return 0;
    }
}

//concrete handler
class Q1Handler extends Handler {
    handleQuestion(accountInfo, question1, question2, question3) {
        //if answer is wrong
        if (question1 === null || accountInfo.secq1.toLowerCase() !== question1.toLowerCase()) {
            //the number returned represents which question the user failed at
            return 1;
        }
        else {
            return this.successor.handleQuestion(accountInfo, question2, question3);
        }
    }
}

//concrete handler
class Q2Handler extends Handler {
    handleQuestion(accountInfo, question2, question3) {
        //if answer is wrong
        if (question2 === null || accountInfo.secq2.toLowerCase() !== question2.toLowerCase()) {
            //the number returned represents which question the user failed at
            return 2;
        }
        else {
            return this.successor.handleQuestion(accountInfo, question3);
        }
    }
}

//concrete handler
class Q3Handler extends Handler {
    handleQuestion(accountInfo, question3) {
        //if answer is wrong
        if (question3 === null || accountInfo.secq3.toLowerCase() !== question3.toLowerCase()) {
            //the number returned represents which question the user failed at
            return 3;
        }
        //if the user gets everything right, tell them their password
        else {
            alert("Your password is: " + accountInfo.password);
        }
    }
}

class Recovery extends React.Component {
    constructor(props) {
        super(props)
        //variables for holding user's answers
        this.email = null;
        this.question1 = null;
        this.question2 = null;
        this.question3 = null;
        this.state = {
            //track invalid responses
            invalidEmail: false,
            invalidQ1: false,
            invalidQ2: false,
            invalidQ3: false
        };
    }

    //functions for holding user's answers
    setEmail = (newEmail) => {
        this.email = newEmail;
    }

    setQuestion1 = (newQuestion1) => {
        this.question1 = newQuestion1;
    }

    setQuestion2 = (newQuestion2) => {
        this.question2 = newQuestion2;
    }

    setQuestion3 = (newQuestion3) => {
        this.question3 = newQuestion3;
    }

    async submit() {
        //get account info
        let response = await fetch("http://localhost/DriveShare/src/accountInfo.php");
        let accountInfo = await response.json();
        //create concrete handlers and set successor chain
        let handleemail = new EmailHandler();
        let handleq1 = new Q1Handler();
        let handleq2 = new Q2Handler();
        let handleq3 = new Q3Handler();
        handleemail.setSuccessor(handleq1);
        handleq1.setSuccessor(handleq2);
        handleq2.setSuccessor(handleq3);
        //have the first handler in the chain begin; if a number is returned, the corresponding error will be shown
        let stateNum = handleemail.handleQuestion(accountInfo, this.email, this.question1, this.question2, this.question3);
        if (stateNum === 0) {
            this.setState({invalidEmail: true});
        }
        else {
            this.setState({invalidEmail: false});
        }
        if (stateNum === 1) {
            this.setState({invalidQ1: true});
        }
        else {
            this.setState({invalidQ1: false});
        }
        if (stateNum === 2) {
            this.setState({invalidQ2: true});
        }
        else {
            this.setState({invalidQ2: false});
        }
        if (stateNum === 3) {
            this.setState({invalidQ3: true});
        }
        else {
            this.setState({invalidQ3: false});
        }               
    }

    render() {
        return (
            <div>
                <h1>Password recovery</h1>
                <p>email</p>
                {/*form for entering email and answers*/}
                <input type="text" name="email" required onChange={e => this.setEmail(e.target.value)}/>
                {/*corrensponding errors are shown if user makes a mistake*/}
                {this.state.invalidEmail === true && <p>email address not found</p>}
                <p>security question 1: What city were you born in?</p>
                <input type="text" name="secq1" required onChange={e => this.setQuestion1(e.target.value)}/>
                {this.state.invalidQ1 === true && <p>incorrect answer</p>}
                <p>security question 2: What was the make and model of your first car?</p>
                <input type="text" name="secq2" required onChange={e => this.setQuestion2(e.target.value)}/>
                {this.state.invalidQ2 === true && <p>incorrect answer</p>}
                <p>security question 3: What was the first exam you failed?</p>
                <input type="text" name="secq3" required onChange={e => this.setQuestion3(e.target.value)}/>
                {this.state.invalidQ3 === true && <p>incorrect answer</p>}
                <br/><br/>
                <button type="button" onClick={() => this.submit()}>Submit</button>
                <br/><br/>
                {/*link back to login page*/}
                <nav>
                    <Link to="/">Back to login page</Link>
                </nav>
            </div>
        );
    }
}

export default Recovery;