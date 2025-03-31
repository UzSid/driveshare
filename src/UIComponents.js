import React from "react";

//the class pages are the mediators

//director
export const FormDirector = {
    submit: function() {}
}

//colleague
const Widget = {
    onClick: function() {},
    onChange: function() {}
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
export class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <input type="checkbox" onChange={this.props.onChange} style={this.props.style}/>
            </div>
        )
    }
}

//concrete colleague
export class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <input type="date" onChange={this.props.onChange} style={this.props.style}/>
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
                <button type="button" onClick={() => this.props.submit()} style={this.props.style} disabled={this.props.disabled}>{this.props.text}</button>
            </div>
        )
    }
}