
const user = (
  state = {
    isSearching: false,
    friends: []
  }, action) => {
  switch (action.type) {
    case 'LOAD_FRIENDS_REQUEST': {
      return Object.assign({}, state, {
        isSearching: true
      })
    }
    case 'LOAD_FRIENDS_SUCCESS': {
      return Object.assign({}, state, {
        isSearching: false,
        friends: action.friends
      })
    }
    default:
      return state
  }
}

export default user
