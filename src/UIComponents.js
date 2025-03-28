import React from "react";

//director
export const FormDirector = {
    setEmail: function() {},
    setPassword: function() {},
    submit: function() {}
}

//colleague
const Widget = {
    setValue: function() {},
    submit: function() {}
}

//concrete colleague
export class TextEntry extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.props.setValue} style={this.props.style} value={this.props.value}/>
            </div>
        )
    }
}

//concrete colleague
export class NumberEntry extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <input type="number" onChange={this.props.setValue} style={this.props.style} value={this.props.value}/>
            </div>
        )
    }
}

//concrete colleague
export class PasswordEntry extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <input type="password" onChange={this.props.setPassword} style={this.props.style} value={this.props.value}/>
            </div>
        )
    }
}

//concrete colleague
export class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <button type="button" onClick={() => this.props.submit()} style={this.props.style}>{this.props.text}</button>
            </div>
        )
    }
}