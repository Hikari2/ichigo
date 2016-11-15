import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob

export const PUBLISH_REQUEST = 'PUBLISH_REQUEST'
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
export const PUBLISH_FAILURE = 'PUBLISH_FAILURE'
export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'
export const ALL_POSTS_FOUND = 'ALL_POSTS_FOUND'

const postList = firebase.database().ref('post_list')

export function publishPost(post) {
  return function(dispatch, getState) {
    dispatch(requestPublish())
    post.uid = getState().auth.user.uid
    postList.push(post)
    .then((data) => {
      dispatch(publishFinished())
    }, error => {
      dispatch(publishFailure(error))
      alert('Something went wrong when trying to publish')
    })
  }
}

export function requestPublish() {
  return {
    type: PUBLISH_SUCCESS,
    isPublishing: true
  }
}

export function publishFinished() {
  return {
    type: PUBLISH_SUCCESS,
    isPublishing: false
  }
}

export function publishFailure(message) {
  return {
    type: PUBLISH_FAILURE,
    isPublishing: false,
    error: message
  }
}

export function getMyPosts() {
  return function(dispatch, getState) {
    dispatch(searchPosts())
    const uid = getState().auth.user.uid
    const postList = firebase.database().ref('post_list').orderByChild('uid').equalTo(uid)
    postList.on('value', (snap) => {
      var items = []
      snap.forEach((child) => {
        items.push(Object.assign({}, child.val(), {_key: child.key}))
      })
      dispatch(foundPosts(items))
    }, error => {
      dispatch(searchFailure(error))
    })
  }
}

export function getAllPosts() {
  return function(dispatch, getState) {
    dispatch(searchPosts())
    postList.on('value', (snap) => {
      var items = []
      snap.forEach((child) => {
        items.push(Object.assign({}, child.val(), {_key: child.key}))
      })
      console.log('Found all posts!')
      dispatch(foundAllPosts(items))
    }, error => {
      console.log(error)
      dispatch(searchFailure(error))
    })
  }
}

export function searchPosts() {
  return {
    type: SEARCH_REQUEST,
    isPublishing: true
  }
}

export function foundPosts(posts) {
  return {
    type: SEARCH_SUCCESS,
    posts,
    isPublishing: false
  }
}

export function foundAllPosts(posts) {
  return {
    type: ALL_POSTS_FOUND,
    posts,
    isPublishing: false
  }
}

export function searchFailure(message) {
  return {
    type: SEARCH_FAILURE,
    isPublishing: false,
    error: message
  }
}
