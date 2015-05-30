import React from 'react'
import assign from 'lodash/object/assign'
import UserForm from './user-profile/user-form.js';
import UserProfile from './user-profile/user-profile.js';
import UserStore from './user-profile/user-store.js';

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
    UserStore.listen(this.onStoreChange);
  }

  componentDidUnmount() {
    UserStore.unlisten(this.onStoreChange);
  }

  onStoreChange() {
    this.setState({userInfo: this.getStateFromStore()});
  }

  getStateFromStore() {
    var state = UserStore.getUser()

    return state;
  }

  updateUser(user) {
    if (user) {
      UserStore.setUser(user);
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

