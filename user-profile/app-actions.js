import appDispatcher from './app-dispatcher.js';

class ProfileAction {
  updateUser(user) {
    appDispatcher.dispatch({
      actionType: 'ADD_USER',
      user
    });
  }
}

export default ProfileAction