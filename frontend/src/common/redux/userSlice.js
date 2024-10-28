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
    locationName: null,
    locationPostCode: null,
    locationSearchResults: null,
    selectedLocation: null,
    additionalAlerts: null,
    // required for nearby flood areas flow
    selectedFloodWarningArea: null,
    selectedFloodAlertArea: null,
    showOnlySelectedFloodArea: null,
    nearbyTargetAreaFlow: null,

    // org location data
    currentLocation: {
      name: null,
      // address is the UPRN
      address: null,
      // Coordinates in dd (degrees decimal)
      coordinates: null,
      alert_categories: null,
      meta_data: {
        location_additional: {
          location_name: null,
          full_address: null,
          postcode: null,
          // Easting EPSG: 27700
          x_coordinate: null,
          // Northing EPSG: 27700
          y_coordinate: null,
          internal_reference: null,
          business_criticality: null,
          location_type: null,
          action_plan: null,
          notes: null,
          keywords: null,
          location_data_type: null
        }
      }
    },
    // org contact data
    orgCurrentContact: {
      enabled: null,
      firstName: null,
      lastName: null,
      emails: null,
      mobilePhones: null,
      homePhones: null,
      position: null
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
    setLocationName: (state, action) => {
      state.locationName = action.payload
    },
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
    // org location data
    setCurrentLocation: (state, action) => {
      state.currentLocation.name = action.payload.name
      state.currentLocation.address = action.payload.address
      state.currentLocation.coordinates = action.payload.coordinates
      state.currentLocation.alert_categories = action.payload.alert_categories
      state.currentLocation.meta_data.location_additional.location_name =
        action.payload.meta_data.location_additional.location_name
      state.currentLocation.meta_data.location_additional.full_address =
        action.payload.meta_data.location_additional.full_address
      state.currentLocation.meta_data.location_additional.postcode =
        action.payload.meta_data.location_additional.postcode
      state.currentLocation.meta_data.location_additional.x_coordinate =
        action.payload.meta_data.location_additional.x_coordinate
      state.currentLocation.meta_data.location_additional.y_coordinate =
        action.payload.meta_data.location_additional.y_coordinate
      state.currentLocation.meta_data.location_additional.internal_reference =
        action.payload.meta_data.location_additional.internal_reference
      state.currentLocation.meta_data.location_additional.business_criticality =
        action.payload.meta_data.location_additional.business_criticality
      state.currentLocation.meta_data.location_additional.location_type =
        action.payload.meta_data.location_additional.location_type
      state.currentLocation.meta_data.location_additional.action_plan =
        action.payload.meta_data.location_additional.action_plan
      state.currentLocation.meta_data.location_additional.notes =
        action.payload.meta_data.location_additional.notes
      state.currentLocation.meta_data.location_additional.keywords =
        action.payload.meta_data.location_additional.keywords
      state.currentLocation.meta_data.location_additional.location_data_type =
        action.payload.meta_data.location_additional.location_data_type
    },
    setCurrentLocationUPRN: (state, action) => {
      state.currentLocation.name = action.payload
    },
    setCurrentLocationAddress: (state, action) => {
      state.currentLocation.address = action.payload
    },
    setCurrentLocationCoordinates: (state, action) => {
      state.currentLocation.coordinates = action.payload
    },
    setCurrentLocationAlertCategories: (state, action) => {
      state.currentLocation.alert_categories = action.payload
    },
    setCurrentLocationName: (state, action) => {
      state.currentLocation.meta_data.location_additional.location_name =
        action.payload
    },
    setCurrentLocationFullAddress: (state, action) => {
      state.currentLocation.meta_data.location_additional.full_address =
        action.payload
    },
    setCurrentLocationPostcode: (state, action) => {
      state.currentLocation.meta_data.location_additional.postcode =
        action.payload
    },
    setCurrentLocationEasting: (state, action) => {
      state.currentLocation.meta_data.location_additional.x_coordinate =
        action.payload
    },
    setCurrentLocationNorthing: (state, action) => {
      state.currentLocation.meta_data.location_additional.y_coordinate =
        action.payload
    },
    setCurrentLocationReference: (state, action) => {
      state.currentLocation.meta_data.location_additional.internal_reference =
        action.payload
    },
    setCurrentLocationCriticality: (state, action) => {
      state.currentLocation.meta_data.location_additional.business_criticality =
        action.payload
    },
    setCurrentLocationType: (state, action) => {
      state.currentLocation.meta_data.location_additional.location_type =
        action.payload
    },
    setCurrentLocationActionPlan: (state, action) => {
      state.currentLocation.meta_data.location_additional.action_plan =
        action.payload
    },
    setCurrentLocationNotes: (state, action) => {
      state.currentLocation.meta_data.location_additional.notes = action.payload
    },
    setCurrentLocationKeywords: (state, action) => {
      state.currentLocation.meta_data.location_additional.keywords =
        action.payload
    },
    setCurrentLocationDataType: (state, action) => {
      state.currentLocation.meta_data.location_additional.location_data_type =
        action.payload
    },
    // org contact data
    setOrgCurrentContact: (state, action) => {
      state.orgCurrentContact.enabled = action.payload.enabled
      state.orgCurrentContact.firstName = action.payload.firstName
      state.orgCurrentContact.lastName = action.payload.lastName
      state.orgCurrentContact.emails = action.payload.emails
      state.orgCurrentContact.mobilePhones = action.payload.mobilePhones
      state.orgCurrentContact.homePhones = action.payload.homePhones
      state.orgCurrentContact.position = action.payload.position
    },
    setOrgCurrentContactEnabled: (state, action) => {
      state.orgCurrentContact.enabled = action.payload
    },
    setOrgCurrentContactFirstName: (state, action) => {
      state.orgCurrentContact.firstName = action.payload
    },
    setOrgCurrentContactLastName: (state, action) => {
      state.orgCurrentContact.lastName = action.payload
    },
    setOrgCurrentContactEmails: (state, action) => {
      state.orgCurrentContact.emails = action.payload
    },
    setOrgCurrentContactHomePhones: (state, action) => {
      state.orgCurrentContact.homePhones = action.payload
    },
    setOrgCurrentContactMobilePhones: (state, action) => {
      state.orgCurrentContact.mobilePhones = action.payload
    },
    setOrgCurrentContactPosition: (state, action) => {
      state.orgCurrentContact.position = action.payload
    },
    // Clear state
    clearAuth: (state) => {
      state.authToken = null
      state.registerToken = null
      state.profile = null
      state.contactPreferences = null
      state.registrations = null
      state.signinType = null
      // location data
      state.locationName = null
      state.locationPostCode = null
      state.locationSearchResults = null
      state.selectedLocation = null
      state.additionalAlerts = null
      // required for nearby flood areas flow
      state.selectedFloodWarningArea = null
      state.selectedFloodAlertArea = null
      state.showOnlySelectedFloodArea = null
      state.nearbyTargetAreaFlow = null
      // org location data
      state.currentLocation = {
        name: null,
        address: null,
        coordinates: null,
        alert_categories: null,
        meta_data: {
          location_additional: {
            location_name: null,
            full_address: null,
            postcode: null,
            x_coordinate: null,
            y_coordinate: null,
            internal_reference: null,
            business_criticality: null,
            location_type: null,
            action_plan: null,
            notes: null,
            keywords: null,
            location_data_type: null
          }
        }
      }
      state.orgCurrentContact = {
        enabled: null,
        firstName: null,
        lastName: null,
        emails: null,
        mobilePhones: null,
        homePhones: null,
        position: null
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
  setLocationName,
  setLocationPostCode,
  setLocationSearchResults,
  setSelectedLocation,
  setAdditionalAlerts,
  // required for nearby flood areas flow
  setSelectedFloodWarningArea,
  setSelectedFloodAlertArea,
  setShowOnlySelectedFloodArea,
  setNearbyTargetAreasFlow,
  // org location data
  setCurrentLocation,
  setCurrentLocationUPRN,
  setCurrentLocationAddress,
  setCurrentLocationCoordinates,
  setCurrentLocationAlertCategories,
  setCurrentLocationName,
  setCurrentLocationFullAddress,
  setCurrentLocationPostcode,
  setCurrentLocationEasting,
  setCurrentLocationNorthing,
  setCurrentLocationReference,
  setCurrentLocationCriticality,
  setCurrentLocationType,
  setCurrentLocationActionPlan,
  setCurrentLocationNotes,
  setCurrentLocationKeywords,
  setCurrentLocationDataType,
  // org current contact
  setOrgCurrentContact,
  setOrgCurrentContactEnabled,
  setOrgCurrentContactFirstName,
  setOrgCurrentContactLastName,
  setOrgCurrentContactEmails,
  setOrgCurrentContactHomePhones,
  setOrgCurrentContactMobilePhones,
  setOrgCurrentContactPosition,
  // clear state
  clearAuth
} = userSlice.actions

export default userSlice.reducer
