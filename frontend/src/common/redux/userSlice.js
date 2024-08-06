import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'session',
  initialState: {
    authToken: null,
    registerToken: null,
    profile: null,
    contactPreferences: null,
    registrations: null,
    currentContact: null,
    organisation: {
      name: null,
      address: null,
      compHouseNum: null,
      emergencySector: null
    }
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload
    },
    setRegisterToken: (state, action) => {
      state.registerToken = action.payload
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
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload
    },
    // location data
    setLocationPostCode: (state, action) => {
      state.locationPostCode = action.payload
    },
    setLocationSearchResults: (state, action) => {
      state.locationSearchResults = action.payload
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload
    },
    setAdditionalAlerts: (state, action) => {
      state.additionalAlerts = action.payload
    },
    // organisation data
    setOrgName: (state, action) => {
      state.organisation.name = action.payload
    },
    setOrgAddress: (state, action) => {
      state.organisation.address = action.payload
    },
    setOrgCompHouseNum: (state, action) => {
      state.organisation.compHouseNum = action.payload
    },
    setOrgEmergencySector: (state, action) => {
      state.organisation.emergencySector = action.payload
    },
    clearAuth: (state) => {
      state.authToken = null
      state.registerToken = null
      state.profile = null
      state.contactPreferences = null
      state.registrations = null
      state.setLocationPostCode = null
      state.locationSearchResults = null
      state.selectedLocation = null
      state.additionalAlerts = null
      state.organisation = {
        name: null,
        address: null,
        compHouseNum: null,
        emergencySector: null
      }
    }
  }
})

export const {
  setAuthToken,
  setRegisterToken,
  setProfile,
  setRegistrations,
  setContactPreferences,
  setCurrentContact,
  setLocationPostCode,
  setLocationSearchResults,
  setSelectedLocation,
  setAdditionalAlerts,
  setOrgName,
  setOrgAddress,
  setOrgCompHouseNum,
  setOrgEmergencySector,
  clearAuth
} = userSlice.actions
export default userSlice.reducer
