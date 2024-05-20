import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { useReducer } from 'react'

const store = configureStore({
  reducer: {
    session: userReducer
  }
})

export default store
