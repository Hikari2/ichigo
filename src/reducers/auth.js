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
  switch (action.type) {
    case 'USER_AUTHENTICATED':
    case 'LOGIN_SUCCESS': {
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        user: action.user
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
