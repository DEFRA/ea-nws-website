import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'session',
  initialState: {
    authToken: null,
    registerToken: null,
    profile: null,
    contactPreferences: null,
    registrations: null
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload
    },
    setRegisterToken: (state, action) => {
      state.authToken = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setContactPreferences: (state, action) => {
      state.contactPreferences = action.payload
    },
    setRegistrations: (state, action) => {
      state.registrations = action.payload
    },
    addContactPreference: (state, action) => {
      state.contactPreferences.push(action.payload)
    },
    clearAuth: (state) => {
      state.authToken = null
      state.profile = null
      state.contactPreferences = null
      state.registrations = null
    }
  }
})

export const {
  setAuthToken,
  setRegisterToken,
  setProfile,
  setRegistrations,
  setContactPreferences,
  addContactPreference,
  clearAuth
} = userSlice.actions
export default userSlice.reducer
