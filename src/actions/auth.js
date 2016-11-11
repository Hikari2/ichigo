import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const auth = firebase.auth()
const provider = firebase.auth.FacebookAuthProvider

export function loginFaceBook() {
  return function(dispatch, getState) {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      loginResult => {
        if (loginResult.isCancelled) {
          console.log('user canceled')
          dispatch(loginFailure('user canceled'))
        } else {
          AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
              const credential = provider.credential(accessTokenData.accessToken)
              console.log(accessTokenData)
              return auth.signInWithCredential(credential)
          })
          .then(credData => {
            console.log(credData)
            dispatch(loginSuccess(credData))
          })
          .catch(err => {
              console.log(err)
              dispatch(loginFailure(err))
          })
        }
    },
    error => {
      console.log(error)
      dispatch(loginFailure(error.toString()))
    })
  }
}

export function logout() {
  return function(dispatch, getState) {
    auth.signOut().then(() => {
        console.log('Logged out!')
        LoginManager.logOut()
        dispatch(logoutSuccess())
    }, () => {
      console.log('Something went wrong')
    })
  }
}

export function checkLogin() {
  return function(dispatch, getState) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch(userAuthenticated(user))
      } else {
        console.log('No user!!!!')
      }
    })
  }
}

export function userAuthenticated(user) {
  return {
    type: USER_AUTHENTICATED,
    user
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}
