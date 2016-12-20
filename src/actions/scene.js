export const CHANGED_SCENE = 'CHANGED_SCENE'

export function changedScene(title) {
  return {
    type: CHANGED_SCENE,
    title
  }
}
