import {
  PUBLISH_REQUEST,
  PUBLISH_SUCCESS,
  PUBLISH_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  SEARCH_OWN_REQUEST,
  SEARCH_OWN_SUCCESS,
  SEARCH_OWN_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/recipe'

const recipe = (
  state = {
    isPublishing: false,
    isUpdating: false,
    isSearching: false,
    isSearchingOwn: false,
    error: '',
    myRecipes: [],
    searchResult: []
  }, action) => {
  switch (action.type) {
    case PUBLISH_REQUEST: {
      return Object.assign({}, state, {
        isPublishing: true
      })
    }
    case PUBLISH_SUCCESS: {
      return Object.assign({}, state, {
        isPublishing: false
      })
    }
    case PUBLISH_FAILURE: {
      return Object.assign({}, state, {
        isPublishing: false,
        error: action.error
      })
    }
    case UPDATE_REQUEST: {
      return Object.assign({}, state, {
        isUpdating: true
      })
    }
    case UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        isUpdating: false
      })
    }
    case UPDATE_FAILURE: {
      return Object.assign({}, state, {
        isUpdating: false,
        error: action.error
      })
    }
    case SEARCH_OWN_REQUEST: {
      return Object.assign({}, state, {
        isSearchingOwn: true
      })
    }
    case SEARCH_OWN_SUCCESS: {
      return Object.assign({}, state, {
        isSearchingOwn: false,
        myRecipes: action.posts
      })
    }
    case SEARCH_OWN_FAILURE: {
      return Object.assign({}, state, {
        isSearchingOwn: false,
        error: action.error
      })
    }
    case SEARCH_REQUEST: {
      return Object.assign({}, state, {
        isSearching: true
      })
    }
    case SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        isSearching: false,
        searchResult: action.posts
      })
    }
    case SEARCH_FAILURE: {
      return Object.assign({}, state, {
        isSearching: false,
        error: action.error
      })
    }
    default:
      return state
  }
}

export default recipe
