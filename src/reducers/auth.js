import {
  USER_AUTHENTICATED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGGED_OUT
} from '../actions'

const auth = (
  state = {
    isAuthenticated: false,
    errorMessage: ''
  }, action) => {
  //console.log(JSON.stringify(state.user, null, 2))
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        uid: action.user.uid,
        displayName: action.user.displayName,
        email: action.user.email,
        photoURL: action.user.photoURL,
        providerData: action.user.providerData
      })
    }
    case 'LOGIN_FAILURE': {
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      })
    }
    case 'LOGOUT_SUCCESS': {
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    }
    default:
      return state
  }
}

export default auth
