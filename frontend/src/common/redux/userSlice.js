import { createSlice } from '@reduxjs/toolkit'

const setAdditional = (additionals, id, value) => {
  let idFound = false
  for (let i = 0; i < additionals.length; i++) {
    if (additionals[i].id === id) {
      additionals[i].value = { s: value }
      idFound = true
    }
  }
  if (!idFound) {
    additionals.push({ id, value: { s: value } })
  }
}

const getAdditional = (additionals, id) => {
  for (let i = 0; i < additionals.length; i++) {
    if (additionals[i].id === id) {
      return additionals[i].value?.s
    }
  }
  return ''
}

const setLocationOtherAdditionals = (additionals, id, value) => {
  let idFound = false
  let otherAdditionals = {}
  for (let i = 0; i < additionals.length; i++) {
    if (additionals[i].id === 'other') {
      idFound = true
      otherAdditionals = JSON.parse(additionals[i].value?.s)
      otherAdditionals[id] = value
      additionals[i].value = { s: JSON.stringify(otherAdditionals) }
    }
  }
  if (!idFound) {
    additionals.push({ id: 'other', value: { s: JSON.stringify({ [id]: value }) } })
  }
}

const getLocationOtherAdditional = (additionals, id) => {
  for (let i = 0; i < additionals.length; i++) {
    if (additionals[i].id === 'other') {
      const otherAdditionals = JSON.parse(additionals[i].value?.s)
      return otherAdditionals[id]
    }
  }
  return ''
}

const userSlice = createSlice({
  name: 'session',
  initialState: {
    authToken: null,
    registerToken: null,
    profileId: null,
    orgId: null,
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
    // keywords
    locationKeywords: null,
    contactKeywords: null,
    // required for predefined boundary flow
    selectedBoundaryType: null,
    selectedBoundary: null,
    locationBoundaries: null,
    consecutiveBoundariesAdded: 0,
    predefinedBoundaryFlow: null,
    // org location data
    currentLocation: {
      id: null,
      enabled: true,
      // name is the UPRN
      name: null,
      // address is the human readable address or flood area name
      address: null,
      // Coordinates in dd (degrees decimal)
      coordinates: null,
      geometry: null,
      geocode: null,
      additionals: [
        { id: 'locationName', value: { s: '' } },
        { id: 'parentID', value: { s: '' } },
        { id: 'targetAreas', value: { s: '' } },
        { id: 'keywords', value: { s: '' } },
        {
          id: 'other',
          value: {
            s: JSON.stringify(
              {
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
                location_data_type: null,
                alertTypes: null
              }
            )
          }
        }
      ]
    },
    // org contact data
    orgCurrentContact: {
      id: null,
      enabled: null,
      firstName: null,
      lastName: null,
      emails: null,
      mobilePhones: null,
      homePhones: null,
      position: null,
      comments: null,
      additionals: [
        {
          id: 'keywords',
          value: null
        }
      ]
    }
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload
    },
    setRegisterToken: (state, action) => {
      state.registerToken = action.payload
    },
    setProfileId: (state, action) => {
      state.profileId = action.payload
    },
    setOrgId: (state, action) => {
      state.orgId = action.payload
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
    // keywords - temporary
    setLocationKeywords: (state, action) => {
      state.locationKeywords = action.payload
    },
    setContactKeywords: (state, action) => {
      state.contactKeywords = action.payload
    },
    // required for predefined boundary flow
    setSelectedBoundaryType: (state, action) => {
      state.selectedBoundaryType = action.payload
    },
    setSelectedBoundary: (state, action) => {
      state.selectedBoundary = action.payload
    },
    setLocationBoundaries: (state, action) => {
      state.locationBoundaries = action.payload
    },
    setConsecutiveBoundariesAdded: (state, action) => {
      state.consecutiveBoundariesAdded = action.payload
    },
    setPredefinedBoundaryFlow: (state, action) => {
      state.predefinedBoundaryFlow = action.payload
    },
    // org location data
    setCurrentLocation: (state, action) => {
      state.currentLocation.id = action.payload.id
      state.currentLocation.enabled = action.payload.enabled
      state.currentLocation.name = action.payload.name
      state.currentLocation.address = action.payload.address
      state.currentLocation.coordinates = action.payload.coordinates
      state.currentLocation.geometry = action.payload.geometry
      state.currentLocation.geocode = action.payload.geocode
      state.currentLocation.additionals = action.payload.additionals
    },
    setCurrentLocationId: (state, action) => {
      state.currentLocation.id = action.payload
    },
    setCurrentLocationEnabled: (state, action) => {
      state.currentLocation.enabled = action.payload
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
    setCurrentLocationGeometry: (state, action) => {
      state.currentLocation.geometry = action.payload
    },
    setCurrentLocationGeocode: (state, action) => {
      state.currentLocation.geocode = action.payload
    },
    setCurrentLocationName: (state, action) => {
      setAdditional(state.currentLocation.additionals, 'locationName', action.payload)
    },
    setCurrentLocationParentID: (state, action) => {
      setAdditional(state.currentLocation.additionals, 'parentID', action.payload)
    },
    setCurrentLocationTargetAreas: (state, action) => {
      setAdditional(state.currentLocation.additionals, 'targetAreas', action.payload)
    },
    setCurrentLocationKeywords: (state, action) => {
      setAdditional(state.currentLocation.additionals, 'keywords', action.payload)
    },
    setCurrentLocationFullAddress: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'full_address', action.payload)
    },
    setCurrentLocationPostcode: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'postcode', action.payload)
    },
    setCurrentLocationEasting: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'x_coordinate', action.payload)
    },
    setCurrentLocationNorthing: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'y_coordinate', action.payload)
    },
    setCurrentLocationReference: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'internal_reference', action.payload)
    },
    setCurrentLocationCriticality: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'business_criticality', action.payload)
    },
    setCurrentLocationType: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'location_type', action.payload)
    },
    setCurrentLocationActionPlan: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'action_plan', action.payload)
    },
    setCurrentLocationNotes: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'notes', action.payload)
    },
    setCurrentLocationDataType: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'location_data_type', action.payload)
    },
    setCurrentLocationAlertTypes: (state, action) => {
      setLocationOtherAdditionals(state.currentLocation.additionals, 'alertTypes', action.payload)
    },
    // org contact data
    setOrgCurrentContact: (state, action) => {
      state.orgCurrentContact.id = action.payload.id
      state.orgCurrentContact.enabled = action.payload.enabled
      state.orgCurrentContact.firstName = action.payload.firstName
      state.orgCurrentContact.lastName = action.payload.lastName
      state.orgCurrentContact.emails = action.payload.emails
      state.orgCurrentContact.mobilePhones = action.payload.mobilePhones
      state.orgCurrentContact.homePhones = action.payload.homePhones
      state.orgCurrentContact.position = action.payload.position
      state.orgCurrentContact.additionals = action.payload.additionals
      state.orgCurrentContact.comments = action.payload.comments
    },
    setOrgCurrentContactId: (state, action) => {
      state.orgCurrentContact.id = action.payload
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
    setOrgCurrentContactNotes: (state, action) => {
      state.orgCurrentContact.comments = action.payload
    },
    setOrgCurrentContactAdditionals: (state, action) => {
      state.orgCurrentContact.additionals = action.payload
    },
    // Clear state
    clearAuth: (state) => {
      state.authToken = null
      state.registerToken = null
      state.profileId = null
      state.orgId = null
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
      // required for predefined boundary flow
      state.selectedBoundaryType = null
      state.selectedBoundary = null
      // keywords - temporary
      state.locationKeywords = null
      state.contactKeywords = null
      // org location data
      state.currentLocation = {
        id: null,
        enabled: true,
        // name is the UPRN
        name: null,
        // address is the human readable address or flood area name
        address: null,
        // Coordinates in dd (degrees decimal)
        coordinates: null,
        geometry: null,
        geocode: null,
        additionals: [
          { id: 'locationName', value: { s: '' } },
          { id: 'parentID', value: { s: '' } },
          { id: 'targetAreas', value: { s: '' } },
          { id: 'keywords', value: { s: '' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify(
                {
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
                  location_data_type: null,
                  alertTypes: null
                }
              )
            }
          }
        ]
      }
      state.orgCurrentContact = {
        id: null,
        enabled: null,
        firstName: null,
        lastName: null,
        emails: null,
        mobilePhones: null,
        homePhones: null,
        position: null,
        comments: null,
        additionals: [
          {
            id: 'keywords',
            value: null
          }
        ]
      }
    }
  },
  selectors: {
    getLocationAdditionals: (state) => {
      return {
        locationName: getAdditional(state.currentLocation.additionals, 'locationName'),
        parentID: getAdditional(state.currentLocation.additionals, 'parentID'),
        targetAreas: getAdditional(state.currentLocation.additionals, 'targetAreas'),
        keywords: getAdditional(state.currentLocation.additionals, 'keywords'),
        full_address: getLocationOtherAdditional(state.currentLocation.additionals, 'full_address'),
        postcode: getLocationOtherAdditional(state.currentLocation.additionals, 'postcode'),
        x_coordinate: getLocationOtherAdditional(state.currentLocation.additionals, 'x_coordinate'),
        y_coordinate: getLocationOtherAdditional(state.currentLocation.additionals, 'y_coordinate'),
        internal_reference: getLocationOtherAdditional(state.currentLocation.additionals, 'internal_reference'),
        business_criticality: getLocationOtherAdditional(state.currentLocation.additionals, 'business_criticality'),
        location_type: getLocationOtherAdditional(state.currentLocation.additionals, 'location_type'),
        action_plan: getLocationOtherAdditional(state.currentLocation.additionals, 'action_plan'),
        notes: getLocationOtherAdditional(state.currentLocation.additionals, 'notes'),
        location_data_type: getLocationOtherAdditional(state.currentLocation.additionals, 'location_data_type'),
        alertTypes: getLocationOtherAdditional(state.currentLocation.additionals, 'alertTypes')
      }
    },
    getLocationAdditional: (state, key) => {
      return getAdditional(state.currentLocation.additionals, key)
    },
    getLocationOther: (state, key) => {
      return getLocationOtherAdditional(state.currentLocation.additionals, key)
    }
  }
})

export const {
  setAuthToken,
  setRegisterToken,
  setProfileId,
  setOrgId,
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
  // keywords - temporary
  setLocationKeywords,
  setContactKeywords,
  // required for predefined boundary flow
  setSelectedBoundaryType,
  setSelectedBoundary,
  setLocationBoundaries,
  setConsecutiveBoundariesAdded,
  setPredefinedBoundaryFlow,
  // org location data
  setCurrentLocation,
  setCurrentLocationId,
  setCurrentLocationEnabled,
  setCurrentLocationUPRN,
  setCurrentLocationAddress,
  setCurrentLocationCoordinates,
  setCurrentLocationGeometry,
  setCurrentLocationGeocode,
  setCurrentLocationName,
  setCurrentLocationParentID,
  setCurrentLocationTargetAreas,
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
  setCurrentLocationAlertTypes,
  // org current contact
  setOrgCurrentContact,
  setOrgCurrentContactId,
  setOrgCurrentContactEnabled,
  setOrgCurrentContactFirstName,
  setOrgCurrentContactLastName,
  setOrgCurrentContactEmails,
  setOrgCurrentContactHomePhones,
  setOrgCurrentContactMobilePhones,
  setOrgCurrentContactPosition,
  setOrgCurrentContactAdditionals,
  setOrgCurrentContactNotes,
  // clear state
  clearAuth
} = userSlice.actions

export const {
  getLocationAdditionals,
  getLocationAdditional,
  getLocationOther
} = userSlice.selectors

export default userSlice.reducer
