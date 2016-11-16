import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'
import posts from './posts'
import groups from './groups'

const rootReducer = combineReducers({
  user,
  auth,
  posts,
  groups
})

export default rootReducer
