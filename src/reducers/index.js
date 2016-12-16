import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'
import recipe from './recipe'
import groups from './groups'

const rootReducer = combineReducers({
  user,
  auth,
  recipe,
  groups
})

export default rootReducer
