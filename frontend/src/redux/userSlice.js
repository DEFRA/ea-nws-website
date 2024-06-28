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
    //location data
    setLocationPostCode: (state, action) => {
      state.locationPostCode = action.payload
    },
    setLocationSearchResults: (state, action) => {
      state.locationSearchResults = action.payload
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload
    },
    clearAuth: (state) => {
      state.authToken = null
      state.profile = null
      state.contactPreferences = null
      state.registrations = null
      state.setLocationPostCode = null
      state.locationSearchResults = null
      state.selectedLocation = null
    }
  }
})

export const {
  setAuthToken,
  setRegisterToken,
  setProfile,
  setRegistrations,
  setContactPreferences,
  setLocationPostCode,
  setLocationSearchResults,
  setSelectedLocation,
  clearAuth
} = userSlice.actions
export default userSlice.reducer
