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

// Adding this for selenium tests
// window.store = store
// window.dispatch = store.dispatch

export default store
