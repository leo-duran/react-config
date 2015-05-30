import UserStore from './user-store.js';

class ProfileAction {
  updateUser(user) {
    UserStore.setUser(user);
  }
}

export default ProfileAction