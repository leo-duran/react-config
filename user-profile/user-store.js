import React from 'react';
import assign from 'lodash/object/assign'
import EventEmitter from 'events'
import clone from 'lodash/lang/clone';

class UserStore extends EventEmitter {
  getUser() {
    var state = clone(this._user) || {firstName: '', lastName: '', email: ''}

    return state;
  }

  setUser(user) {
    this._user = user;
    this.emit('change');
  }

  listen(listener) {
    this.addListener('change', listener);
  }
  ß
  unlisten(listener) {
    this.removeListener('change', listener);
  }
}

export default UserStore