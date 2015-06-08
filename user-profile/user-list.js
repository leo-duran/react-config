import React from 'react';
import userListStore from './user-list-store.js';
import appActions from './app-actions.js';


class UserList extends React.Component {
  constructor(){
    super();

    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);

    this.state = {
      users: this.getStateFromStore()
    }
  }

  componentDidMount() {
    userListStore.listen(this.onStoreChange);
    appActions.getUsers();
  }

  componentDidUnmount() {
    userListStore.unlisten(this.onStoreChange);
  }

  onStoreChange() {
    this.setState({users: this.getStateFromStore()});
  }

  getStateFromStore() {
    var state = userListStore.getUsers()

    return state;
  }

  render() {
    return (
      <ul>
        {this.state.users.map(function(result) {
          return <li key={result.id}>{result.id} - {result.firstName} {result.lastName} ({result.email})</li>;
        })}
      </ul>
    );
  }
}

export default UserList