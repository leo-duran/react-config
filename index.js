import React from 'react'
import assign from 'lodash/object/assign'
import UserForm from './user-profile/user-form.js';
import UserProfile from './user-profile/user-profile.js';

class App extends React.Component {
  constructor() {
    super();

    this.updateUser = this.updateUser.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);

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
    if (user) {
      this.setState({userInfo: user});
    }
  }

  toggleEdit() {
    this.setState({editMode: !this.state.editMode});
  }

  render() {
    var form;

    if (this.state.editMode) {
      form = <UserForm user={this.state.userInfo} updateUser={this.updateUser} toggleEdit={this.toggleEdit} />;
    } else {
      form = <UserProfile user={this.state.userInfo} updateUser={this.updateUser} toggleEdit={this.toggleEdit}/>;
    }

    return (
      <div>
        {form}
      </div>)
  }
}

React.render(<App/>,
  document.getElementById('app'));

