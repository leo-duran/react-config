import axios from 'axios';
import assign from 'lodash/object/assign'
import omit from 'lodash/object/omit'
import appActions from './app-actions.js';

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
}

export default new ApiHelpers()