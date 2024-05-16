import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
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
      console.log('redux store', action.payload)
      state.profile = action.payload
      console.log('state profile', state.profile)
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
