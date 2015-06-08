import appDispatcher from './app-dispatcher.js';
import apiHelpers from './api-helpers.js';

class AppActions {
  createUserSuccess(user) {
    appDispatcher.dispatch({
      actionType: 'CREATE_USER_SUCCESS',
      user
    });

    this.getUsers();
  }

  updateUser(user) {
    apiHelpers.createUser(user);
  }

  getUsers() {
    apiHelpers.getUsers();
  }

  getUsersSuccess(users) {
    appDispatcher.dispatch({
      actionType: 'GET_USERS_SUCCESS',
      users
    })
  }
}

export default new AppActions()