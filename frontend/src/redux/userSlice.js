import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'session',
  initialState: {
    authToken: null,
    registerToken: null,
    profile: null,
    contactPreferences: null,
    registrations: null,
    locationPostCode: null,
    locationSearchResults: null,
    selectedLocation: null,
    selectedFloodWarningArea: null,
    selectedFloodAlertArea: null,
    showOnlySelectedFloodArea: null,
    additionalAlerts: null,
    nearbyTargetAreaFlow: null
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
    setSelectedFloodWarningArea: (state, action) => {
      state.selectedFloodWarningArea = action.payload
    },
    setSelectedFloodAlertArea: (state, action) => {
      state.selectedFloodAlertArea = action.payload
    },
    setShowOnlySelectedFloodArea: (state, action) => {
      state.showOnlySelectedFloodArea = action.payload
    },
    setAdditionalAlerts: (state, action) => {
      state.additionalAlerts = action.payload
    },
    setNearbyTargetAreaFlow: (state, action) => {
      state.nearbyTargetAreaFlow = action.payload
    },
    clearAuth: (state) => {
      state.authToken = null
      state.registerToken = null
      state.profile = null
      state.contactPreferences = null
      state.registrations = null
      // location data
      state.locationPostCode = null
      state.locationSearchResults = null
      state.selectedLocation = null
      state.selectedFloodWarningArea = null
      state.selectedFloodAlertArea = null
      state.additionalAlerts = null
      state.nearbyTargetAreaFlow = null
    }
  }
})

export const {
  setAuthToken,
  setRegisterToken,
  setProfile,
  setRegistrations,
  setContactPreferences,
  setLocationSearchResults,
  setSelectedLocation,
  setSelectedFloodWarningArea,
  setSelectedFloodAlertArea,
  setShowOnlySelectedFloodArea,
  setAdditionalAlerts,
  setLocationPostCode,
  setNearbyTargetAreaFlow,
  clearAuth
} = userSlice.actions

export default userSlice.reducer
