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
          Alert.alert('user canceled')
          dispatch(loginFailure('user canceled'))
        } else {
          AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
              const credential = provider.credential(accessTokenData.accessToken)
              return auth.signInWithCredential(credential)
          })
          .then(credData => {
            storeUser(credData, 'facebook')
            dispatch(loginSuccess(credData))
          })
        }
    },
    error => {
      console.log(error.toString())
      Alert.alert('Something went wrong while trying to login2')
    })
  }
}

function storeUser(user, provider) {
  const userList = firebase.database().ref('user_list/'+ provider + '/' + user.providerData[0].uid)
  const userData = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid
  }
  userList.set(userData)
  .then(() => {
  }, error => {
    console.log(error.toString())
    Alert.alert('Something went wrong while trying to store user data')
  })
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
