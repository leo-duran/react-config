import React from 'react'
import assign from 'lodash/object/assign'

class App extends React.Component {
    constructor() {
        super();

        this.updateUser = this.updateUser.bind(this);

        this.state = {
            editMode: true,
            userInfo: {
                firstName: 'Jerry',
                lastName: 'Seinfeld',
                email: 'jerry@funnyman.com'
            }
        }
    }

    updateUser(user) {
        var isEditMode = !this.state.editMode;
        if (user) {
            this.setState({userInfo: user});
        }

        if (isEditMode) {
            this.setState({editMode: true})
            return;
        }

        this.setState({editMode: false})
    }

    render() {
        var form;

        if (this.state.editMode) {
            form = <UserForm user={this.state.userInfo} updateUser={this.updateUser}/>;
        } else {
            form = <Profile user={this.state.userInfo} updateUser={this.updateUser}/>;
        }

        return (
            <div>
                {form}
            </div>)
    }
}

class Profile extends React.Component {
    constructor() {
        super();

        this.editUser = this.editUser.bind(this);
    }

    editUser() {
        this.props.updateUser(null);
    }

    render() {
        return (
            <div>
                <div>Profile</div>
                <div>{this.props.user.firstName}</div>
                <div>{this.props.user.lastName}</div>
                <div>{this.props.user.email}</div>
                <div>
                    <button onClick={this.editUser}>Edit</button>
                </div>
            </div>
        )
    }
}

class UserForm extends React.Component {
    constructor() {
        super();

        this.saveUser = this.saveUser.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    saveUser() {
        // collect form data
        this.props.updateUser(this.state);
    }

    updateField(fieldName, value) {
        var newUser = {};

        newUser[fieldName] = value;

        this.setState(assign(this.props.user, this.state, newUser));

        console.log(this.state);
    }

    render() {
        return (
            <div>
                <div>User Form</div>
                {
                    Object.keys(this.props.user).map(function (field) {
                        return <Input updateField={this.updateField} label={field} value={this.props.user[field]}/>
                    }, this)
                }
                <div>
                    <button onClick={this.saveUser}>Save</button>
                </div>
            </div>
        )
    }
}


class Input extends React.Component {
    constructor() {
        super();

        this.updateField = this.updateField.bind(this);
    }

    updateField(e) {
        var val = e.target.value;
        this.props.updateField(this.props.label, val);
    }

    render() {
        return (<div>
            <label>{labels[this.props.label]}:
                <input type="text" onChange={this.updateField} defaultValue={this.props.value}/>
            </label>
        </div>
        )
    }
}

var labels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email'
};

React.render(<App/>,
    document.getElementById('app'));

