import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    session: userReducer
  }
})

// Adding this for selenium tests
window.store = store
window.dispatch = store.dispatch

export default store
