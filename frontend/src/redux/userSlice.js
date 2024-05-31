import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'session',
  initialState: {
    authToken: null,
    profile: null,
    contactPreferences: null,
    registration: null
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setContactPreferences: (state, action) => {
      state.contactPreferences = action.payload
    },
    setRegistration: (state, action) => {
      state.registration = action.payload
    },
    clearAuth: (state) => {
      state.authToken = null
      state.profile = null
      state.contactPreferences = null
    }
  }
})

export const {
  setAuthToken,
  setProfile,
  setRegistration,
  setContactPreferences,
  clearAuth
} = userSlice.actions
export default userSlice.reducer
