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
          Alert.alert('Error fetching data: ' + JSON.stringify(error, null, 2))
        } else {
          dispatch(loadFriendsSuccess(result.data))
        }
      }
    )
    dispatch(loadFriendsRequest())
    new GraphRequestManager().addRequest(infoRequest).start()
  }
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
