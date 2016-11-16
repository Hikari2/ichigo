import * as firebase from 'firebase'
import { GraphRequest, GraphRequestManager} from 'react-native-fbsdk'
import { Alert } from 'react-native'

export const LOAD_FRIENDS_REQUEST = 'LOAD_FRIENDS_REQUEST'
export const LOAD_FRIENDS_FAILURE = 'LOAD_FRIENDS_FAILURE'
export const LOAD_FRIENDS_SUCCESS = 'LOAD_FRIENDS_SUCCESS'

export function getFriendList() {
  return function(dispatch) {
    const infoRequest = new GraphRequest(
      '/me/friends',
      null,
      (error, result) => {
        if (error) {
          console.log('Error while fetching friend list: ' + JSON.stringify(error, null, 2))
          Alert.alert('Error while fetching friend list')
        } else {
          const promises = result.data.map(data => {
            return getUser(data.id, 'facebook')
          })
          Promise.all(promises).then(result => {
            dispatch(loadFriendsSuccess(result))
          }, error => {
            console.log('Error while fetching friend list user data: ' + JSON.stringify(error, null, 2))
            Alert.alert('Error while fetching friend list user data')
          })
        }
      }
    )
    dispatch(loadFriendsRequest())
    new GraphRequestManager().addRequest(infoRequest).start()
  }
}

function getUser(providerUid, provider) {
  const userList = firebase.database().ref('user_list/' + provider + '/' + providerUid)
  return userList.once('value').then(snapshot => snapshot.val())
}

export function loadFriendsRequest() {
  return {
    type: LOAD_FRIENDS_REQUEST
  }
}

export function loadFriendsFailure(message) {
  return {
    type: LOAD_FRIENDS_FAILURE,
    message
  }
}

export function loadFriendsSuccess(list) {
  return {
    type: LOAD_FRIENDS_SUCCESS,
    friends: list
  }
}
