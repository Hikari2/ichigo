import {
  CHANGED_SCENE
} from '../actions/scene'


const scene = (
  state = {
    title: ''
  }, action) => {
  switch (action.type) {
    case CHANGED_SCENE: {
      return Object.assign({}, state, {
        title: action.title
      })
    }
    default:
      return state
  }
}

export default scene
