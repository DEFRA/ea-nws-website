// store.js
import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from './localStorage'
import userReducer from './userSlice'

const preloadedState = loadState()

const store = configureStore({
  reducer: {
    session: userReducer
  },
  preloadedState // Initialize store with persisted state
})

store.subscribe(() => {
  saveState(store.getState())
})

window.addEventListener('storage', (event) => {
  if (event.key === 'userData') {
    const newState = loadState()
    if (newState) {
      store.dispatch({
        type: 'session/replaceState',
        payload: newState.session
      })
    }
  }
})

// Adding this for selenium tests
// window.store = store
// window.dispatch = store.dispatch

export default store
