import {
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  FIND_GROUPS_REQUEST,
  FIND_GROUPS_SUCCESS,
  FIND_GROUPS_FAILURE
} from '../actions/groups'

const groups = (
  state = {
    isSearching: false,
    myGroups: []
  }, action) => {
  switch (action.type) {
    case FIND_GROUPS_SUCCESS: {
      return Object.assign({}, state, {
        isSearching: false,
        myGroups: action.groups
      })
    }
    default:
      return state
  }
}

export default groups
