import * as firebase from 'firebase'
import { Alert } from 'react-native'

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE'
export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'
export const ALL_POSTS_FOUND = 'ALL_POSTS_FOUND'

const groupList = firebase.database().ref('group_list')

export function createGroup(data) {
  return function(dispatch, getState) {
    dispatch(createGroupRequest())
    const group = formatGroup(data, getState().auth.uid)
    groupList.push(group)
    .then(() => {
      dispatch(createGroupSuccess())
    }, error => {
      dispatch(createGroupFailure(error))
      Alert.alert('Something went wrong when trying to create the group')
    })
  }
}

function formatGroup(data, uid) {
  const members = data.list.filter((item) => {
    return item.marked
  })

  return ({
    'title': data.title,
    'owner': uid,
    members
  })
}

export function createGroupRequest() {
  return {
    type: CREATE_GROUP_REQUEST
  }
}

export function createGroupSuccess() {
  return {
    type: CREATE_GROUP_SUCCESS
  }
}

export function createGroupFailure(message) {
  return {
    type: CREATE_GROUP_FAILURE,
    error: message
  }
}
//    console.log(JSON.stringify(group, null, 2))
export function getMyGroups() {
  return function(dispatch, getState) {
    dispatch(searchPosts())
    const uid = getState().auth.uid
    const groupList = firebase.database().ref('group_list').orderByChild('owner').equalTo(uid)
    groupList.on('value', (snap) => {
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
