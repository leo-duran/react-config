import React from 'react';

class UserProfile extends React.Component {
  constructor() {
    super();

    this.editUser = this.editUser.bind(this);
  }

  editUser() {
    this.props.updateUser(null);
    this.props.toggleEdit();
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

export default UserProfile