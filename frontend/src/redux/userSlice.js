import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'session',
  initialState: {
    authToken: null,
    profile: null,
    registration: null
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setRegistration: (state, action) => {
      state.registration = action.payload
    },
    clearAuth: (state) => {
      state.authToken = null
      state.profile = null
      state.registration = null
    }
  }
})

export const { setAuthToken, setProfile, setRegistration, clearAuth } =
  userSlice.actions
export default userSlice.reducer
