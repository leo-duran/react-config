import UserStore from './user-store.js';
var userStore = new UserStore();

class ProfileAction {
  updateUser(user) {
    userStore.setUser(user);
  }
}

export default ProfileAction