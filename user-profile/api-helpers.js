import axios from 'axios'
import assign from 'lodash/object/assign'
import map from 'lodash/collection/map'
import omit from 'lodash/object/omit'
import appActions from './app-actions.js'

class ApiHelpers {
  createUser(user) {

    function serialize(rawUser) {
      return {
        data: assign({}, rawUser, {
          type: 'users'
        })
      }
    }

    function deserialize(apiUser) {
      return omit(apiUser.data, 'type', 'links');
    }

    axios({
      method: 'post',
      url: 'http://demo-users-api.herokuapp.com/api/v1/users',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      data: serialize(user)
    }).then(res => {
      var newUser = deserialize(res.data);

      appActions.createUserSuccess(newUser);
    })
  }

  getUsers() {
    function deserialize(apiUsers) {
      return map(apiUsers.data, function(user){
        return omit(user, 'type', 'links');
      });
    }

    axios({
      method: 'get',
      url: 'http://demo-users-api.herokuapp.com/api/v1/users',
      headers: { 'Content-Type': 'application/vnd.api+json' },
    }).then(res => {
      var users = deserialize(res.data);

      appActions.getUsersSuccess(users);
    })
  }
}

export default new ApiHelpers()