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
    signinType: null,
    // location data
    locationPostCode: null,
    locationSearchResults: null,
    selectedLocation: null,
    additionalAlerts: null,
    // required for nearby flood areas flow
    selectedFloodWarningArea: null,
    selectedFloodAlertArea: null,
    showOnlySelectedFloodArea: null,
    nearbyTargetAreaFlow: null,
    // organisation data
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
    addContactPreference: (state, action) => {
      state.contactPreferences = action.payload
    },
    setSigninType: (state, action) => {
      state.signinType = action.payload
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
    // required for nearby flood areas flow
    setSelectedFloodWarningArea: (state, action) => {
      state.selectedFloodWarningArea = action.payload
    },
    setSelectedFloodAlertArea: (state, action) => {
      state.selectedFloodAlertArea = action.payload
    },
    setShowOnlySelectedFloodArea: (state, action) => {
      state.showOnlySelectedFloodArea = action.payload
    },
    setNearbyTargetAreasFlow: (state, action) => {
      state.nearbyTargetAreaFlow = action.payload
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
      state.signinType = null
      // location data
      state.locationPostCode = null
      state.locationSearchResults = null
      state.selectedLocation = null
      state.additionalAlerts = null
      // required for nearby flood areas flow
      state.selectedFloodWarningArea = null
      state.selectedFloodAlertArea = null
      state.showOnlySelectedFloodArea = null
      state.nearbyTargetAreaFlow = null
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
  addContactPreference,
  setSigninType,
  // location data
  setLocationPostCode,
  setLocationSearchResults,
  setSelectedLocation,
  setAdditionalAlerts,
  // required for nearby flood areas flow
  setSelectedFloodWarningArea,
  setSelectedFloodAlertArea,
  setShowOnlySelectedFloodArea,
  setNearbyTargetAreasFlow,
  // organisation data
  setOrgName,
  setOrgAddress,
  setOrgCompHouseNum,
  setOrgEmergencySector,
  // clear state
  clearAuth
} = userSlice.actions

export default userSlice.reducer
