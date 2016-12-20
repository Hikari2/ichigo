import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'
import recipe from './recipe'
import groups from './groups'
import scene from './scene'

const rootReducer = combineReducers({
  user,
  auth,
  recipe,
  groups,
  scene
})

export default rootReducer
