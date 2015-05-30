import React from 'react';
import assign from 'lodash/object/assign'
import EventEmitter from 'events'
import clone from 'lodash/lang/clone';

var UserStore = assign({}, EventEmitter.prototype, {
  getUser() {
    var state = clone(this._user) || {firstName: '', lastName: '', email: ''}

    return state;
  },
  setUser(user) {
    this._user = user;
    this.emit('change');
  },
  listen(listener) {
    this.addListener('change', listener);
  },
  unlisten(listener) {
    this.removeListener('change', listener);
  }
});

export default UserStore