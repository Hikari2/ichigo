import {
  PUBLISH_REQUEST,
  PUBLISH_SUCCESS,
  PUBLISH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  ALL_POSTS_FOUND
} from '../actions'

const post = (
  state = {
    isSearching: false,
    myPosts: [],
    allPosts: []
  }, action) => {
  switch (action.type) {
    case 'SEARCH_SUCCESS': {
      return Object.assign({}, state, {
        isSearching: false,
        myPosts: action.posts
      })
    }
    case 'ALL_POSTS_FOUND': {
      return Object.assign({}, state, {
        isSearching: false,
        allPosts: action.posts
      })
    }
    default:
      return state
  }
}

export default post
