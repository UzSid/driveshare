import React from "react";
import { Link } from 'react-router-dom';

class Handler {
    constructor() {
        this.successor = null;
    }
    setSuccessor(successor) {
        this.successor = successor;
    }
    handleQuestion() {}
}

class EmailHandler extends Handler{
    handleQuestion(arr, email, question1, question2, question3) {
        for (var i = 0; i < arr.length; i++) {
            if (email === null) {
                return 0;
            }
            else if (arr[i].email.toLowerCase() === email.toLowerCase()) {
                let newArr = arr[i];                
                return this.successor.handleQuestion(newArr, question1, question2, question3);
            }
        }
        return 0;
    }
}

class Q1Handler extends Handler{
    handleQuestion(arr, question1, question2, question3) { 
        if (question1 === null || arr.secq1.toLowerCase() !== question1.toLowerCase()) {
            return 1;
        }
        else {
            return this.successor.handleQuestion(arr, question2, question3);
        }
    }
}

class Q2Handler extends Handler{
    handleQuestion(arr, question2, question3) { 
        if (question2 === null || arr.secq2.toLowerCase() !== question2.toLowerCase()) {
            return 2;
        }
        else {
            return this.successor.handleQuestion(arr, question3);
        }
    }
}

class Q3Handler extends Handler{
    handleQuestion(arr, question3) { 
        if (question3 === null || arr.secq3.toLowerCase() !== question3.toLowerCase()) {
            return 3;
        }
        else {
            alert("Your password is: " + arr.password);
        }
    }
}

class Recovery extends React.Component{
    constructor(props) {
        super(props)
        this.email = null;
        this.question1 = null;
        this.question2 = null;
        this.question3 = null;
        this.state = {
            invalidEmail: false,
            invalidQ1: false,
            invalidQ2: false,
            invalidQ3: false
        };
    }

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

    submit = () => {
        fetch("http://localhost/DriveShare/src/accountInfo.php")
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("accountInfo", JSON.stringify(json));				
        });
        let arr = JSON.parse(sessionStorage.getItem("accountInfo"));
        let handleemail = new EmailHandler();
        let handleq1 = new Q1Handler();
        let handleq2 = new Q2Handler();
        let handleq3 = new Q3Handler();
        handleemail.setSuccessor(handleq1);
        handleq1.setSuccessor(handleq2);
        handleq2.setSuccessor(handleq3);
        let stateNum = handleemail.handleQuestion(arr, this.email, this.question1, this.question2, this.question3);
        if (stateNum === 0) {this.setState({invalidEmail: true});}
        else {this.setState({invalidEmail: false});}
        if (stateNum === 1) {this.setState({invalidQ1: true});}
        else {this.setState({invalidQ1: false});}
        if (stateNum === 2) {this.setState({invalidQ2: true});}
        else {this.setState({invalidQ2: false});}
        if (stateNum === 3) {this.setState({invalidQ3: true});}
        else {this.setState({invalidQ3: false});}
        //let states = [this.state.invalidEmail, this.state.invalidQ1, this.state.invalidQ2, this.state.invalidQ3];               
    }

    render() {
        return (
            <div>
                <h1>Password recovery</h1>
                <p>email</p>
                <input type="text" name="email" required onChange={e => this.setEmail(e.target.value)}/>
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
                <nav>
                    <Link to="/">Back to login page</Link>
                </nav>
            </div>
        );
    }
}

export default Recovery;