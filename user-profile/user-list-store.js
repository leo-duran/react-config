import React from 'react'
import assign from 'lodash/object/assign'
import EventEmitter from 'events'
import clone from 'lodash/lang/clone'
import appDispatcher from './app-dispatcher.js'

var _users = [];

class UserListStore extends EventEmitter {
  getUsers() {
    var state = clone(_users);

    return state;
  }

  listen(listener) {
    this.addListener('change', listener);
  }

  unlisten(listener) {
    this.removeListener('change', listener);
  }
}

var userListStore = new UserListStore();

userListStore.dispatchToken = appDispatcher.register(function(payload){
  switch(payload.actionType) {
    case 'GET_USERS_SUCCESS':
      _users = payload.users;
      userListStore.emit('change');
  }
});

export default userListStore