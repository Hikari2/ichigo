import * as firebase from 'firebase'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { Alert } from 'react-native'

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const auth = firebase.auth()
const provider = firebase.auth.FacebookAuthProvider

export function loginFaceBook() {
  return function(dispatch) {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      loginResult => {
        if (loginResult.isCancelled) {
          console.log('user canceled!')
          dispatch(loginFailure('user canceled'))
        } else {
          AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
              const credential = provider.credential(accessTokenData.accessToken)
              return auth.signInWithCredential(credential)
          })
          .then(credData => {
            dispatch(loginSuccess(credData))
          })
          .catch(error => {
              console.log(error)
              Alert.alert(err.toString)
              dispatch(loginFailure(error))
          })
        }
    },
    error => {
      console.log(error)
      Alert.alert('Login failed', 'Sorry unable to login. Plese check your connection')
    })
  }
}

export function logout() {
  return function(dispatch) {
    auth.signOut().then(() => {
        LoginManager.logOut()
        dispatch(logoutSuccess())
    }, () => {
      Alert.alert('Logout failed', 'Sorry unable to logout. Plese check your connection')
    })
  }
}

export function checkLogin() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(loginSuccess(user))
      }
    })
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
