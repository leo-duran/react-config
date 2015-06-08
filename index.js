import React from 'react'
import assign from 'lodash/object/assign'
import UserForm from './user-profile/user-form.js';
import UserProfile from './user-profile/user-profile.js';
import userStore from './user-profile/user-store.js';
import appActions from './user-profile/app-actions.js';

class App extends React.Component {
  constructor() {
    super();

    this.updateUser = this.updateUser.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);

    this.state = {
      editMode: true,
      userInfo: this.getStateFromStore()
    }
  }

  componentDidMount() {
    userStore.listen(this.onStoreChange);
  }

  componentDidUnmount() {
    userStore.unlisten(this.onStoreChange);
  }

  onStoreChange() {
    this.setState({userInfo: this.getStateFromStore()});
  }

  getStateFromStore() {
    var state = userStore.getUser()

    return state;
  }

  updateUser(user) {
    if (user) {
      appActions.updateUser(user);
    }
  }

  toggleEdit() {
    this.setState({editMode: !this.state.editMode});
  }

  render() {
    var form;

    if (this.state.editMode) {
      form = <UserForm user={this.state.userInfo} updateUser={this.updateUser} toggleEdit={this.toggleEdit}/>;
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

