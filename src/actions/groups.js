import * as firebase from 'firebase'
import { Alert } from 'react-native'

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE'

export const FIND_GROUPS_REQUEST = 'FIND_GROUPS_REQUEST'
export const FIND_GROUPS_SUCCESS = 'FIND_GROUPS_SUCCESS'
export const FIND_GROUPS_FAILURE = 'FIND_GROUPS_FAILURE'

export function createGroup(data) {
  return function(dispatch, getState) {
    dispatch(createGroupRequest())
    const group = formatGroup(data, getState().auth)
    firebase.database().ref('group_list').push(group)
    .then((result) => {
      const promises = group.members.map(user => {
        user = user.uid
        firebase.database().ref('user_list/joined_groups/' + user).once('value').then(
          snapshot => {
            const list = snapshot.val()
            if(list == null) {
              return firebase.database().ref('user_list/joined_groups/' + user).set([result.key])
            }
            else if(!list.includes(result.key)) {
              list.push(result.key)
            }
            return firebase.database().ref('user_list/joined_groups/' + user).set(list)
          }
        )
      })
      Promise.all(promises).then(result => {
        dispatch(createGroupSuccess())
      }, error => {
        Alert.alert('Something went wrong while trying to create the group 1')
      })
    }, error => {
      dispatch(createGroupFailure(error))
      Alert.alert('Something went wrong while trying to create the group 2')
    })
  }
}

function formatGroup(data, auth) {
  let members = data.list.filter((user) => {
    return user.marked
  })
  members = members.map((user) => {
    return {
      uid: user.uid,
      name: user.name,
      photo: user.photo
    }
  })

  members.push({
    uid: auth.uid,
    name: auth.displayName,
    photo: auth.photoURL,
  })
  return ({
    title: data.title,
    owner: auth.uid,
    shared: [],
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

export function getMyGroups() {
  return function(dispatch, getState) {
    dispatch(findGroupsRequest())
    const uid = getState().auth.uid
    firebase.database().ref('user_list/joined_groups/' + uid).on('value',
      snapshot => {
        if(snapshot.val() == null) {
          dispatch(findGroupsSuccess([]))
          return
        }
        const promises = snapshot.val().map(groupId => {
          return getGroup(groupId)
        })
        Promise.all(promises).then(result => {
          dispatch(findGroupsSuccess(result))
        }, error => {
          dispatch(findGroupsFailure(error))
          console.log('Error while fetching user groups: ' + JSON.stringify(error, null, 2))
          Alert.alert('Error while fetching user groups')
        })
      }
    )
  }
}

function getGroup(id) {
  return (
    firebase.database().ref('group_list/' + id).once('value').
      then(snapshot => Object.assign(snapshot.val(), {key: snapshot.key}))
  )
}

export function findGroupsRequest() {
  return {
    type: FIND_GROUPS_REQUEST,
    isPublishing: true
  }
}

export function findGroupsSuccess(groups) {
  return {
    type: FIND_GROUPS_SUCCESS,
    groups
  }
}

export function findGroupsFailure(message) {
  return {
    type: FIND_GROUPS_FAILURE,
    error: message
  }
}
export function shareToGroup(group, recipe) {
  return function(dispatch, getState) {
    firebase.database().ref('group_list/' + group.key + '/shared').once('value')
    .then(
      snapshot => {
        const list = snapshot.val()
        if(list == null) {
          return firebase.database().ref('group_list/' + group.key + '/shared').set([recipe])
        }
        else if(!list.includes(recipe.key)) {
          list.push(recipe)
        }
        return firebase.database().ref('group_list/' + group.key + '/shared').set(list)
      }, error => {
        console.log(error)
        Alert.alert('Something went wrong while trying share recipe')
      }
    )
  }
}
