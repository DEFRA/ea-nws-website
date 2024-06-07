/* global localStorage */

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userData')
    if (serializedState === null) {
      return undefined // initialize state
    }
    return JSON.parse(serializedState)
  } catch (e) {
    console.error('Could not load state', e)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('userData', serializedState)
  } catch (e) {
    console.error('Could not save state', e)
  }
}
