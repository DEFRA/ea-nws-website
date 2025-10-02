// store.js
import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from './localStorage'
import navigationReducer from './navigationSlice'
import userReducer from './userSlice'

const preloadedState = loadState()

const store = configureStore({
  reducer: {
    session: userReducer,
    navigation: navigationReducer
  },
  preloadedState // Initialize store with persisted state
})

store.subscribe(() => {
  saveState(store.getState())
})

window.addEventListener('storage', (event) => {
  if (event.key === 'userData') {
    try {
      const newState = loadState()
      if (newState?.session) {
        const current = store.getState().session
        if (
          !current.lastUpdated ||
          newState.session.lastUpdated > current.lastUpdated
        ) {
          store.dispatch({
            type: 'session/replaceState',
            payload: newState.session
          })
        }
      }
    } catch (err) {
      console.error('Failed to handle storage event:', err)
    }
  }
})

// Adding this for selenium tests
// window.store = store
// window.dispatch = store.dispatch

export default store
