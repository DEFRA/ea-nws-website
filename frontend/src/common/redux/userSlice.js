import { createSlice } from '@reduxjs/toolkit'

const setAdditional = (additionals, id, value) => {
  let idFound = false
  if (Array.isArray(additionals)) {
    for (let i = 0; i < additionals.length; i++) {
      if (additionals[i].id === id) {
        additionals[i].value = { s: value }
        idFound = true
      }
    }
    if (!idFound) {
      additionals.push({ id, value: { s: value } })
    }
  } else {
    if (id === 'keywords') {
      additionals[id] = JSON.parse(value)
    } else {
      additionals[id] = value
    }
  }
}

export const getAdditional = (additionals, id) => {
  if (Array.isArray(additionals)) {
    for (let i = 0; i < additionals?.length; i++) {
      if (additionals[i].id === id) {
        return additionals[i].value?.s
      }
      if (additionals[i].key === id) {
        return additionals[i].value?.s
      }
    }
  } else {
    return additionals[id] || ''
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
    additionals.push({
      id: 'other',
      value: { s: JSON.stringify({ [id]: value }) }
    })
  }
}

export const getLocationOtherAdditional = (additionals, id) => {
  for (let i = 0; i < additionals.length; i++) {
    if (additionals[i].id === 'other') {
      const otherAdditionals = JSON.parse(additionals[i].value?.s)
      return otherAdditionals[id]
    }
  }
  return ''
}

const setOrgAdditional = (additionals, id, value) => {
  let orgAdditionals = {}
  const alertnativeContactInfo = [
    'firstName',
    'lastName',
    'email',
    'telephone',
    'jobTitle'
  ]
  orgAdditionals = JSON.parse(additionals)
  if (alertnativeContactInfo.includes(id)) {
    orgAdditionals.alternativeContact[id] = value
  } else {
    orgAdditionals[id] = value
  }
  return JSON.stringify(orgAdditionals)
}

const userSlice = createSlice({
  name: 'session',
  initialState: {
    lastActivity: null,
    authToken: null,
    registerToken: null,
    profileId: null,
    notFoundLocations: null,
    notInEnglandLocations: null,
    profile: {
      id: '',
      enabled: true,
      firstname: '',
      lastname: '',
      emails: [],
      mobilePhones: [],
      homePhones: [],
      language: 'EN',
      additionals: [
        { id: 'signupComplete', value: { s: 'false' } },
        { id: 'firstLogin', value: { s: 'true' } }
      ],
      unverified: {
        emails: [],
        mobilePhones: [],
        homePhones: []
      },
      pois: []
    },
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
    // required for extending name search flood areas radius
    locationSearchType: null,
    // required for when user changes a location at sign up review
    locationToBeChanged: null,
    // required for tracking areas already on account
    floodAreasAlreadyAdded: null,
    // required for nearby flood areas flow
    nearbyTargetAreaFlow: null,
    nearbyTargetAreasAdded: null,
    selectedFloodWarningArea: null,
    selectedFloodAlertArea: null,
    showOnlySelectedFloodArea: null,
    // required for historical flood warnings and alerts
    severeFloodWarningCount: null,
    floodAlertCount: null,
    // required for predefined boundary flow
    selectedBoundaryType: null,
    selectedBoundary: null,
    locationBoundaries: null,
    consecutiveBoundariesAdded: 0,
    predefinedBoundaryFlow: null,
    // linked locations/contacts
    linkLocations: null,
    linkContacts: null,
    // required for entering an org address manually
    enterAddressManuallyFlow: null,
    orgBuildingName: null,
    previousOrgAddress: null,
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
        { id: 'keywords', value: { s: '[]' } },
        {
          id: 'other',
          value: {
            s: JSON.stringify({
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
              alertTypes: [],
              childrenIDs: [],
              targetAreas: [],
              riverSeaRisk: null,
              groundWaterRisk: null
            })
          }
        }
      ]
    },
    currentTA: null,
    // org data
    organization: {
      id: null,
      name: null,
      description: JSON.stringify({
        name: null,
        address: null,
        compHouseNum: null,
        emergencySector: null,
        isAdminRegistering: null,
        alternativeContact: {
          firstName: null,
          lastName: null,
          email: null,
          telephone: null,
          jobTitle: null
        }
      }),
      postalCode: null,
      longName: null,
      logoUrl: null,
      backgroundUrl: null,
      alertDiffusionZone: null,
      alertDiffusionZoneBoundingBox: null,
      urlSlug: null
    },
    // org contact data
    orgCurrentContact: {
      id: null,
      enabled: true,
      firstname: null,
      lastname: null,
      emails: null,
      mobilePhones: null,
      homePhones: null,
      position: null,
      comments: null,
      pois: null,
      additionals: [
        {
          id: 'keywords',
          value: { s: '[]' }
        },
        {
          id: 'jobTitle',
          value: { s: '' }
        }
      ]
    },
    contacts: null
  },
  reducers: {
    setLastActivity: (state, action) => {
      state.lastActivity = action.payload
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload
    },
    setRegisterToken: (state, action) => {
      state.registerToken = action.payload
    },
    setProfileId: (state, action) => {
      state.profileId = action.payload
    },
    setNotFoundLocations: (state, action) => {
      state.notFoundLocations = action.payload
    },
    setNotInEnglandLocations: (state, action) => {
      state.notInEnglandLocations = action.payload
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
      state.contactPreferences.push(action.payload)
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
    // required for when user changes a location at sign up review
    setLocationToBeChanged: (state, action) => {
      state.locationToBeChanged = action.payload
    },
    // required for extending name search flood areas radius
    setLocationSearchType: (state, action) => {
      state.locationSearchType = action.payload
    },
    // required for tracking areas already on account
    setFloodAreasAlreadyAdded: (state, action) => {
      state.floodAreasAlreadyAdded = action.payload
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
    setNearbyTargetAreasAdded: (state, action) => {
      state.nearbyTargetAreasAdded = action.payload
    },
    // required for historical flood warnings and alerts
    setSevereFloodWarningCount: (state, action) => {
      state.severeFloodWarningCount = action.payload
    },
    setFloodAlertCount: (state, action) => {
      state.floodAlertCount = action.payload
    },
    // required for predefined boundary flow
    setSelectedBoundaryType: (state, action) => {
      state.selectedBoundaryType = action.payload
    },
    setSelectedBoundary: (state, action) => {
      state.selectedBoundary = action.payload
    },
    setConsecutiveBoundariesAdded: (state, action) => {
      state.consecutiveBoundariesAdded = action.payload
    },
    setPredefinedBoundaryFlow: (state, action) => {
      state.predefinedBoundaryFlow = action.payload
    },
    setLinkLocations: (state, action) => {
      state.linkLocations = action.payload
    },
    setLinkContacts: (state, action) => {
      state.linkContacts = action.payload
    },
    // add org address at signup
    setEnterAddressManuallyFlow: (state, action) => {
      state.enterAddressManuallyFlow = action.payload
    },
    setOrgBuildingName: (state, action) => {
      state.orgBuildingName = action.payload
    },
    setPreviousOrgAddress: (state, action) => {
      state.previousOrgAddress = action.payload
    },
    // org location data
    setCurrentTA: (state, action) => {
      state.currentTA = action.payload
    },
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
    clearCurrentLocation: (state) => {
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
          { id: 'keywords', value: { s: '[]' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify({
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
                alertTypes: [],
                childrenIDs: [],
                targetAreas: [],
                riverSeaRisk: null,
                groundWaterRisk: null
              })
            }
          }
        ]
      }
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
      setAdditional(
        state.currentLocation.additionals,
        'locationName',
        action.payload
      )
    },
    setCurrentLocationParentID: (state, action) => {
      setAdditional(
        state.currentLocation.additionals,
        'parentID',
        action.payload
      )
    },
    setCurrentLocationKeywords: (state, action) => {
      setAdditional(
        state.currentLocation.additionals,
        'keywords',
        action.payload
      )
    },
    setCurrentLocationFullAddress: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'full_address',
        action.payload
      )
    },
    setCurrentLocationPostcode: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'postcode',
        action.payload
      )
    },
    setCurrentLocationEasting: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'x_coordinate',
        action.payload
      )
    },
    setCurrentLocationNorthing: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'y_coordinate',
        action.payload
      )
    },
    setCurrentLocationReference: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'internal_reference',
        action.payload
      )
    },
    setCurrentLocationCriticality: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'business_criticality',
        action.payload
      )
    },
    setCurrentLocationType: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'location_type',
        action.payload
      )
    },
    setCurrentLocationActionPlan: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'action_plan',
        action.payload
      )
    },
    setCurrentLocationNotes: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'notes',
        action.payload
      )
    },
    setCurrentLocationDataType: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'location_data_type',
        action.payload
      )
    },
    setCurrentLocationAlertTypes: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'alertTypes',
        action.payload
      )
    },
    setCurrentLocationChildrenIDs: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'childrenIDs',
        action.payload
      )
    },
    setCurrentLocationTargetAreas: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'targetAreas',
        action.payload
      )
    },
    setCurrentLocationRiverSeaRisk: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'riverSeaRisk',
        action.payload
      )
    },
    setCurrentLocationGroundWaterRisk: (state, action) => {
      setLocationOtherAdditionals(
        state.currentLocation.additionals,
        'groundWaterRisk',
        action.payload
      )
    },
    // org data
    setOrganization: (state, action) => {
      state.organization.name = action.payload?.name || null
      state.organization.description =
        action.payload?.description ||
        JSON.stringify({
          name: null,
          address: null,
          compHouseNum: null,
          emergencySector: null,
          isAdminRegistering: null,
          alternativeContact: {
            firstName: null,
            lastName: null,
            email: null,
            telephone: null,
            jobTitle: null
          }
        })
      state.organization.postalCode = action.payload?.postalCode || null
      state.organization.longName = action.payload?.longName || null
      state.organization.logoUrl = action.payload?.logoUrl || null
      state.organization.backgroundUrl = action.payload?.backgroundUrl || null
      state.organization.alertDiffusionZone =
        action.payload?.alertDiffusionZone || null
      state.organization.alertDiffusionZoneBoundingBox =
        action.payload?.alertDiffusionZoneBoundingBox || null
      state.organization.urlSlug = action.payload?.urlSlug || null
    },
    setOrganizationName: (state, action) => {
      state.organization.name = action.payload
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'name',
        action.payload
      )
    },
    setOrganizationAddress: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'address',
        action.payload
      )
    },
    setOrganizationCompHouseNum: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'compHouseNum',
        action.payload
      )
    },
    setOrganizationEmergencySector: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'emergencySector',
        action.payload
      )
    },
    setOrganizationIsAdminRegistering: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'isAdminRegistering',
        action.payload
      )
    },
    setOrganizationAlternativeContact: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'alternativeContact',
        action.payload
      )
    },
    setOrganizationACFirstName: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'firstName',
        action.payload
      )
    },
    setOrganizationACLastName: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'lastName',
        action.payload
      )
    },
    setOrganizationACEmail: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'email',
        action.payload
      )
    },
    setOrganizationACTelephone: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'telephone',
        action.payload
      )
    },
    setOrganizationACJobTitle: (state, action) => {
      state.organization.description = setOrgAdditional(
        state.organization.description,
        'jobTitle',
        action.payload
      )
    },
    setOrganizationDescription: (state, action) => {
      state.organization.description = action.payload
    },
    setOrganizationPostalCode: (state, action) => {
      state.organization.postalCode = action.payload
    },
    setOrganizationLongName: (state, action) => {
      state.organization.longName = action.payload
    },
    setOrganizationLogoUrl: (state, action) => {
      state.organization.logoUrl = action.payload
    },
    setOrganizationBackgroundUrl: (state, action) => {
      state.organization.backgroundUrl = action.payload
    },
    setOrganizationAlertDiffusionZone: (state, action) => {
      state.organization.alertDiffusionZone = action.payload
    },
    setOrganizationAlertDiffusionZoneBoundingBox: (state, action) => {
      state.organization.alertDiffusionZoneBoundingBox = action.payload
    },
    setOrganizationUrlSlug: (state, action) => {
      state.organization.urlSlug = action.payload
    },
    // org contact data
    setOrgCurrentContact: (state, action) => {
      state.orgCurrentContact.id = action.payload.id
      state.orgCurrentContact.enabled = action.payload.enabled
      state.orgCurrentContact.firstname = action.payload.firstname
      state.orgCurrentContact.lastname = action.payload.lastname
      state.orgCurrentContact.emails = action.payload.emails
      state.orgCurrentContact.mobilePhones = action.payload.mobilePhones
      state.orgCurrentContact.homePhones = action.payload.homePhones
      state.orgCurrentContact.position = action.payload.position
      state.orgCurrentContact.additionals = action.payload.additionals
      state.orgCurrentContact.comments = action.payload.comments
      state.orgCurrentContact.pois = action.payload.pois
      state.orgCurrentContact.role = action.payload.role
      state.orgCurrentContact.pendingRole = action.payload.pendingRole
    },
    setOrgCurrentContactId: (state, action) => {
      state.orgCurrentContact.id = action.payload
    },
    setOrgCurrentContactEnabled: (state, action) => {
      state.orgCurrentContact.enabled = action.payload
    },
    setOrgCurrentContactFirstName: (state, action) => {
      state.orgCurrentContact.firstname = action.payload
    },
    setOrgCurrentContactLastName: (state, action) => {
      state.orgCurrentContact.lastname = action.payload
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
    setOrgCurrentContactPois: (state, action) => {
      state.orgCurrentContact.pois = action.payload
    },
    setOrgCurrentContactAdditionals: (state, action) => {
      state.orgCurrentContact.additionals = action.payload
    },
    setOrgCurrentContactKeywords: (state, action) => {
      setAdditional(
        state.orgCurrentContact.additionals,
        'keywords',
        action.payload
      )
    },
    setOrgCurrentContactJobTitle: (state, action) => {
      setAdditional(
        state.orgCurrentContact.additionals,
        'jobTitle',
        action.payload
      )
    },
    setOrgCurrentContactRole: (state, action) => {
      state.orgCurrentContact.role = action.payload
    },
    setOrgCurrentContactPendingRole: (state, action) => {
      state.orgCurrentContact.pendingRole = action.payload
    },
    setAddingAdminFlow: (state, action) => {
      state.addingAdminFlow = action.payload
    },
    clearOrgCurrentContact: (state) => {
      state.orgCurrentContact = {
        id: null,
        enabled: true,
        firstname: null,
        lastname: null,
        emails: null,
        mobilePhones: null,
        homePhones: null,
        position: null,
        comments: null,
        pois: null,
        additionals: [
          {
            id: 'keywords',
            value: { s: '[]' }
          },
          {
            id: 'jobTitle',
            value: { s: '' }
          }
        ]
      }
    },
    setContacts: (state, action) => {
      state.contacts = action.payload
    },
    // Clear state
    clearAuth: (state) => {
      state.lastActivity = null
      state.authToken = null
      state.registerToken = null
      state.profileId = null
      state.notFoundLocations = null
      state.notInEnglandLocations = null
      state.profile = {
        id: '',
        enabled: true,
        firstname: '',
        lastname: '',
        emails: [],
        mobilePhones: [],
        homePhones: [],
        language: 'EN',
        additionals: [
          { id: 'signupComplete', value: { s: 'false' } },
          { id: 'firstLogin', value: { s: 'true' } }
        ],
        unverified: {
          emails: [],
          mobilePhones: [],
          homePhones: []
        },
        pois: []
      }
      state.contactPreferences = null
      state.registrations = null
      state.currentContact = null
      state.signinType = null
      // location data
      state.locationName = null
      state.locationPostCode = null
      state.locationSearchResults = null
      state.selectedLocation = null
      state.additionalAlerts = null
      // required for when user changes a location at sign up review
      state.locationToBeChanged = null
      // required for extending name search flood areas radius
      state.locationSearchType = null
      // required for tracking areas already on account
      state.floodAreasAlreadyAdded = null
      // required for nearby flood areas flow
      state.selectedFloodWarningArea = null
      state.selectedFloodAlertArea = null
      state.showOnlySelectedFloodArea = null
      state.nearbyTargetAreaFlow = null
      state.nearbyTargetAreasAdded = null
      // required for historical flood warnings and alerts
      state.severeFloodWarningCount = null
      state.floodAlertCount = null
      // required for predefined boundary flow
      state.selectedBoundaryType = null
      state.selectedBoundary = null
      state.consecutiveBoundariesAdded = 0
      state.predefinedBoundaryFlow = null
      // required for entering an org address manually
      state.enterAddressManuallyFlow = null
      state.orgBuildingName = null
      state.previousOrgAddress = null
      // org location data
      state.currentTA = null
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
          { id: 'keywords', value: { s: '[]' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify({
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
                alertTypes: [],
                childrenIDs: [],
                targetAreas: [],
                riverSeaRisk: null,
                groundWaterRisk: null
              })
            }
          }
        ]
      }
      // org data
      state.organization = {
        id: null,
        name: null,
        description: JSON.stringify({
          name: null,
          address: null,
          compHouseNum: null,
          emergencySector: null,
          isAdminRegistering: null,
          alternativeContact: {
            firstName: null,
            lastName: null,
            email: null,
            telephone: null,
            jobTitle: null
          }
        }),
        postalCode: null,
        longName: null,
        logoUrl: null,
        backgroundUrl: null,
        alertDiffusionZone: null,
        alertDiffusionZoneBoundingBox: null,
        urlSlug: null
      }
      state.addingAdminFlow = null
      state.orgCurrentContact = {
        id: null,
        enabled: true,
        firstname: null,
        lastname: null,
        emails: null,
        mobilePhones: null,
        homePhones: null,
        position: null,
        comments: null,
        pois: null,
        additionals: [
          {
            id: 'keywords',
            value: { s: '[]' }
          },
          {
            id: 'jobTitle',
            value: { s: '' }
          }
        ]
      }
      state.contacts = null
    }
  },
  selectors: {
    getLocationAdditionals: (state) => {
      return {
        locationName: getAdditional(
          state.currentLocation.additionals,
          'locationName'
        ),
        parentID: getAdditional(state.currentLocation.additionals, 'parentID'),
        keywords: getAdditional(state.currentLocation.additionals, 'keywords'),
        full_address: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'full_address'
        ),
        postcode: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'postcode'
        ),
        x_coordinate: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'x_coordinate'
        ),
        y_coordinate: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'y_coordinate'
        ),
        internal_reference: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'internal_reference'
        ),
        business_criticality: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'business_criticality'
        ),
        location_type: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'location_type'
        ),
        action_plan: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'action_plan'
        ),
        notes: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'notes'
        ),
        location_data_type: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'location_data_type'
        ),
        alertTypes: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'alertTypes'
        ),
        childrenIDs: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'childrenIDs'
        ),
        targetAreas: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'targetAreas'
        ),
        riverSeaRisk: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'riverSeaRisk'
        ),
        groundWaterRisk: getLocationOtherAdditional(
          state.currentLocation.additionals,
          'groundWaterRisk'
        )
      }
    },
    getLocationAdditional: (state, key) => {
      return getAdditional(state.currentLocation.additionals, key)
    },
    getLocationOther: (state, key) => {
      return getLocationOtherAdditional(state.currentLocation.additionals, key)
    },
    getContactAdditional: (state, key) => {
      return getAdditional(state.orgCurrentContact.additionals, key)
    }
  }
})

export const {
  setLastActivity,
  setAuthToken,
  setRegisterToken,
  setProfileId,
  setNotFoundLocations,
  setNotInEnglandLocations,
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
  // required for when user changes a location at sign up review
  setLocationToBeChanged,
  // required for extending name search flood areas radius
  setLocationSearchType,
  // required for tracking areas already on account
  setFloodAreasAlreadyAdded,
  // required for nearby flood areas flow
  setSelectedFloodWarningArea,
  setSelectedFloodAlertArea,
  setShowOnlySelectedFloodArea,
  setNearbyTargetAreasFlow,
  setNearbyTargetAreasAdded,
  // required for historical flood warnings and alerts
  setSevereFloodWarningCount,
  setFloodAlertCount,
  // required for predefined boundary flow
  setSelectedBoundaryType,
  setSelectedBoundary,
  setLocationBoundaries,
  setConsecutiveBoundariesAdded,
  setPredefinedBoundaryFlow,
  setLinkLocations,
  setLinkContacts,
  // org address at sign up flow
  setEnterAddressManuallyFlow,
  setOrgBuildingName,
  setPreviousOrgAddress,
  // org location data
  setCurrentTA,
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
  setCurrentLocationChildrenIDs,
  setCurrentLocationRiverSeaRisk,
  setCurrentLocationGroundWaterRisk,
  // org data
  setOrganization,
  setOrganizationId,
  setOrganizationName,
  setOrganizationAddress,
  setOrganizationCompHouseNum,
  setOrganizationEmergencySector,
  setOrganizationIsAdminRegistering,
  setOrganizationAlternativeContact,
  setOrganizationACFirstName,
  setOrganizationACLastName,
  setOrganizationACEmail,
  setOrganizationACTelephone,
  setOrganizationACJobTitle,
  setOrganizationDescription,
  setOrganizationPostalCode,
  setOrganizationLongName,
  setOrganizationLogoUrl,
  setOrganizationBackgroundUrl,
  setOrganizationAlertDiffusionZone,
  setOrganizationAlertDiffusionZoneBoundingBox,
  setOrganizationUrlSlug,
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
  setOrgCurrentContactKeywords,
  setOrgCurrentContactJobTitle,
  setOrgCurrentContactNotes,
  setOrgCurrentContactPois,
  setOrgCurrentContactRole,
  setOrgCurrentContactPendingRole,
  setContacts,
  // flow
  setAddingAdminFlow,
  // clear state
  clearAuth,
  clearCurrentLocation,
  clearOrgCurrentContact
} = userSlice.actions

export const {
  getLocationAdditionals,
  getLocationAdditional,
  getLocationOther,
  getContactAdditional
} = userSlice.selectors

export default userSlice.reducer
