import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { Alert } from 'react-native'

export const PUBLISH_REQUEST = 'PUBLISH_REQUEST'
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
export const PUBLISH_FAILURE = 'PUBLISH_FAILURE'

const GIPHY_API_KEY = 'dc6zaTOxFJmzC'

const polyfill = RNFetchBlob.polyfill
window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob

function postVideo(key, name, path) {
  let rnfbURI = RNFetchBlob.wrap(path)
  return Blob
    .build(rnfbURI, { type : 'video/mp3'})
    .then((blob) => {
      firebase.storage()
        .ref('recipe')
        .child(key + '/' + name + '.mp3')
        .put(blob, { contentType : 'video/mp3' }).then(() => blob.close())
    }, error => {
      console.log(error)
      Alert.alert('Something went wrong while trying to upload video')
    })
}

function loadVideo(key, name) {
  return firebase
    .storage()
    .ref('recipe')
    .child(key + '/' + name + '.mp3')
    .getDownloadURL().then((url) => {
      return {
        path: url,
        key
      }
    }, error => {
      console.log(error)
      Alert.alert('Something went wrong while trying to read video')
    })
}

function postImage(key, name, imagePath) {
  let rnfbURI = RNFetchBlob.wrap(imagePath)
  return Blob
    .build(rnfbURI, { type : 'image/png'})
    .then((blob) => {
      firebase.storage()
        .ref('recipe')
        .child(key + '/' + name)
        .put(blob, { contentType : 'image/png' }).then(() => blob.close())
    }, error => {
      console.log(error)
      Alert.alert('Something went wrong while trying to upload image')
    })
}

function readImage(key, name) {
  return firebase
    .storage()
    .ref('recipe')
    .child(key + '/' + name)
    .getDownloadURL().then((url) => {
      return {
        path: url,
        key
      }
    }, error => {
      console.log(error)
      Alert.alert('Something went wrong while trying to read image')
    })
}

function updateImage(key, name, path) {
  let rnfbURI = RNFetchBlob.wrap(path)
  return Blob
    .build(rnfbURI, { type : 'image/png'})
    .then((blob) => {
      firebase.storage()
        .ref('recipe')
        .child(key + '/' + name)
        .put(blob, { contentType : 'image/png' }).then(() => blob.close())
    }, error => {
      Alert.alert('Something went wrong while trying to upload image')
    })
}

export function publish(recipe) {
  return function(dispatch, getState) {
    dispatch(requestPublish())

    recipe = {
      uid: getState().auth.uid,
      profilePic: getState().auth.photoURL,
      author: getState().auth.displayName,
      email: getState().auth.email,
      ...recipe
    }

    const key = firebase.database().ref('recipe_list').push().key

    let instructions = recipe.instructions
    const promises = instructions.map((instruction, index) => {
      if(instruction.video) {
        return postVideo(key, index, instruction.video)
      }
    })
    if(recipe.introduction.photo) {
      promises.push(postImage(key, 0, recipe.introduction.photo))
    }

    Promise.all(promises).then(() => {
      firebase.database().ref('recipe_list/' + key).update(recipe).then(()=>{
        dispatch(publishSuccess())
        Alert.alert('Recipe created sucessfully')
      })
    }, error => {
      dispatch(publishFailure(error))
      console.log(error)
      Alert.alert('Something went wrong while trying to publish')
    })
  }
}

export function requestPublish() {
  return {
    type: PUBLISH_REQUEST
  }
}

export function publishSuccess() {
  return {
    type: PUBLISH_SUCCESS
  }
}

export function publishFailure(message) {
  return {
    type: PUBLISH_FAILURE,
    error: message
  }
}

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

export function update(recipe) {
  return function(dispatch, getState) {
    dispatch(requestUpdate())

    recipe = {
      uid: getState().auth.uid,
      profilePic: getState().auth.photoURL,
      author: getState().auth.displayName,
      email: getState().auth.email,
      ...recipe
    }

    const key = recipe.key
    let instructions = recipe.instructions
    const promises = instructions.map((instruction, index) => {
      if(instruction.video && !instruction.video.includes('http')) {
        return postVideo(key, index, instruction.video)
      }
    })
    if(recipe.introduction.photo && !recipe.introduction.photo.includes('http')) {
      promises.push(postImage(key, 0, recipe.introduction.photo))
    }

    Promise.all(promises).then(() => {
      firebase.database().ref('recipe_list/' + key).update(recipe).then(()=>{
        dispatch(updateSuccess())
        Alert.alert('Recipe updated sucessfully')
      })
    }, error => {
      dispatch(updateFailure(error))
      console.log(error)
      Alert.alert('Something went wrong while trying to update')
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('Something went wrong while trying to update')
    })
  }
}

export function requestUpdate() {
  return {
    type: UPDATE_REQUEST
  }
}

export function updateSuccess() {
  return {
    type: UPDATE_SUCCESS
  }
}

export function updateFailure(message) {
  return {
    type: UPDATE_FAILURE,
    error: message
  }
}

export const SEARCH_OWN_REQUEST = 'SEARCH_OWN_REQUEST'
export const SEARCH_OWN_SUCCESS = 'SEARCH_OWN_SUCCESS'
export const SEARCH_OWN_FAILURE = 'SEARCH_OWN_FAILURE'

export function getMyRecipes() {
  return function(dispatch, getState) {
    dispatch(requestSearchOwn())
    const uid = getState().auth.uid ? getState().auth.uid : ' '
    firebase.database().ref('recipe_list').orderByChild('uid').equalTo(uid).on('value', (snapshot) => {
      if(!snapshot.val() || getState().recipe.isPublishing) {
        dispatch(searchOwnSuccess([]))
      } else {
        var items = []
        let instructions = []
        let promises = []
        snapshot.forEach((child) => {
          const key = child.key
          if (child.val().instructions) {
            promises = child.val().instructions.map((instruction, i) => {
              instructions[i] = child.val().instructions[i]
              if(instruction.video) {
                return loadVideo(key, i).then((res) => {
                  instructions[i].video = res.path
                })
              }
            })
          }

          Promise.all(promises).then(() => {
            if(child.val().introduction.photo) {
              readImage(key, 0).then((result) => {
                let introduction = child.val().introduction
                introduction.photo = result.path
                items.push(Object.assign({}, child.val(), {introduction}, {key: child.key}, {instructions}))
                items.reverse()
                dispatch(searchOwnSuccess(items))
              })
            } else {
              items.push(Object.assign({}, child.val(), {key: child.key}, {instructions}))
              items.reverse()
              dispatch(searchOwnSuccess(items))
            }
          }, error => {
            dispatch(publishFailure(error))
            console.log(error)
            Alert.alert('Something went wrong while trying to publish')
          })
        })
      }
    }, error => {
      console.log(error)
      dispatch(searchOwnFailure(error))
    })
  }
}

export function requestSearchOwn() {
  return {
    type: SEARCH_OWN_REQUEST
  }
}

export function searchOwnSuccess(posts) {
  return {
    type: SEARCH_OWN_SUCCESS,
    posts
  }
}

export function searchOwnFailure(message) {
  return {
    type: SEARCH_OWN_FAILURE,
    error: message
  }
}

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'
export const ALL_POSTS_FOUND = 'ALL_POSTS_FOUND'

export function getPosts(filterValue) {
  return function(dispatch, getState) {
    dispatch(requestSearch())
    firebase.database().ref('post_list').on('value', (snapshot) => {
      if(!snapshot.val() || getState().post.isPublishing) {
        dispatch(searchSuccess([]))
      } else {
        var items = []
        snapshot.forEach((child) => {
          if(false) {
            dispatch(searchSuccess(items))
            return
          } else {
            const key = child.key
            const photos = new Array(child.val().photos)
            photos.fill(1)
            const promises = photos.map((item, index) => {
                return readImage(key, index)
            })
            Promise.all(promises).then((result) => {
              items.push(Object.assign({}, child.val(), {photos: result}, {key: child.key}))
              items.reverse()
              dispatch(searchSuccess(items))
            })
          }
        })
      }
    }, error => {
      console.log(error)
      dispatch(searchFailure(error))
    })
  }
}

export function requestSearch() {
  return {
    type: SEARCH_REQUEST
  }
}

export function searchSuccess(posts) {
  return {
    type: SEARCH_SUCCESS,
    posts
  }
}

export function searchFailure(message) {
  return {
    type: SEARCH_FAILURE,
    error: message
  }
}















// export function postGif(path) {
//   let queryParams = 'api_key=' + GIPHY_API_KEY
//   queryParams += '&source_image_url=' + path
//   console.log(path)
//   let url = 'http://upload.giphy.com/v1/gifs' + '?' + queryParams
//   return fetch(url,  {
//     method: 'POST'
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
//     console.log(responseJson)
//     return responseJson
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// }

// export function postGif(path) {
//   postVideo(path).then(() => {
//     readVideo().then((videoUrl) => {
//       let queryParams = 'api_key=' + GIPHY_API_KEY
//       queryParams += '&source_image_url=' + videoUrl  .toString()
//       console.log(videoUrl.toString())
//       let url = 'http://upload.giphy.com/v1/gifs' + '?' + queryParams
//       return fetch(url,  {
//         method: 'POST'
//       })
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(responseJson)
//         return responseJson
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//     })
//   })
// }

// export function loadGif(id) {
//   let queryParams = 'api_key=' + GIPHY_API_KEY
//   let url = 'http://api.giphy.com/v1/gifs/' + id + '?' + queryParams
//   return fetch(url,  {
//     method: 'GET'
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
//     console.log(responseJson)
//     return responseJson.movies
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// }

// function postVideo(path) {
//   let rnfbURI = RNFetchBlob.wrap(path)
//   return Blob
//     .build(rnfbURI, { type : 'video/mp3'})
//     .then((blob) => {
//       firebase.storage()
//         .ref('videos')
//         .child('temp.mp3')
//         .put(blob, { contentType : 'video/mp3' }).then(() => blob.close())
//     }, error => {
//       console.log(error)
//       Alert.alert('Something went wrong while trying to upload video')
//     })
// }
//
// function readVideo() {
//   return firebase
//     .storage()
//     .ref('videos')
//     .child('temp.mp3')
//     .getDownloadURL().then((url) => {
//       return url
//     }, error => {
//       console.log(error)
//       Alert.alert('Something went wrong while trying to load video')
//     })
// }
