import appDispatcher from './app-dispatcher.js';
import apiHelpers from './api-helpers.js';

class AppActions {
  createUserSuccess(user) {
    appDispatcher.dispatch({
      actionType: 'CREATE_USER_SUCCESS',
      user
    })
  }

  updateUser(user) {
    apiHelpers.createUser(user);
  }
}

export default new AppActions()