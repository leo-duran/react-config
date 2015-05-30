import React from 'react';
import assign from 'lodash/object/assign'

class UserForm extends React.Component {
  constructor() {
    super();

    this.saveUser = this.saveUser.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  saveUser() {
    // collect form data
    this.props.updateUser(this.state);
    this.props.toggleEdit();
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

    this.labels = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email'
    };
  }

  updateField(e) {
    var val = e.target.value;
    this.props.updateField(this.props.label, val);
  }

  render() {
    return (<div>
        <label>{this.labels[this.props.label]}:
          <input type="text" onChange={this.updateField} defaultValue={this.props.value}/>
        </label>
      </div>
    )
  }
}

export default UserForm