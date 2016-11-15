import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'
import posts from './posts'

const rootReducer = combineReducers({
  user,
  auth,
  posts
})

export default rootReducer
