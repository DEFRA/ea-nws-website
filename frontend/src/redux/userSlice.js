import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'session',
  initialState: {
    authToken: null,
    profile: null,
    contactPreferences: null
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
    clearAuth: (state) => {
      state.authToken = null
      state.profile = null
      state.contactPreferences = null
    }
  }
})

export const { setAuthToken, setProfile, setContactPreferences, clearAuth } =
  userSlice.actions
export default userSlice.reducer
