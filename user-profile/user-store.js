import React from 'react'
import assign from 'lodash/object/assign'
import EventEmitter from 'events'
import clone from 'lodash/lang/clone'
import appDispatcher from './app-dispatcher.js'

var _user = {firstName: '', lastName: '', email: ''};

class UserStore extends EventEmitter {
  getUser() {
    var state = clone(_user);

    return state;
  }

  listen(listener) {
    this.addListener('change', listener);
  }

  unlisten(listener) {
    this.removeListener('change', listener);
  }
}

var userStore = new UserStore();

userStore.dispatchToken = appDispatcher.register(function(payload){
  switch(payload.actionType){
    case 'ADD_USER':
      _user = payload.user;
      userStore.emit('change');

      break;
  }
});

userStore.dispatchToken = appDispatcher.register(function(payload){
  switch(payload.actionType) {
    case 'CREATE_USER_SUCCESS':
      _user = payload.user;
      userStore.emit('change');
  }
});

export default userStore