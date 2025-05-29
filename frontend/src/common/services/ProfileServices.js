const { default: UserContactType } = require('../enums/UserContactType')

const addUnverifiedContact = (profile, type, contact) => {
  let unverifiedContactList
  const formattedContact = { address: contact }

  switch (type) {
    case 'email':
      unverifiedContactList = profile.unverified?.emails || []
      break
    case 'mobile':
      unverifiedContactList = profile.unverified?.mobilePhones || []
      break
    case 'homePhones':
      unverifiedContactList = profile.unverified?.homePhones || []
      break
  }

  // Check for duplicates
  if (
    !unverifiedContactList.some(
      (unverifiedContact) => unverifiedContact.address === contact
    )
  ) {
    const updatedProfile = {
      ...profile,
      unverified: {
        ...profile.unverified,
        // update the correct unverified contacts list based on users input
        [type === 'email'
          ? 'emails'
          : type === 'mobile'
          ? 'mobilePhones'
          : 'homePhones']: [...unverifiedContactList, formattedContact]
      }
    }
    return updatedProfile
  } else {
    // contact exists already, so do nothing
    return profile
  }
}

const removeUnverifiedContact = (profile, contact, type) => {
  let unverifiedContactListKey

  // need to check if there are any unverified
  if (profile.unverified) {
    if (type === UserContactType.Email && profile.unverified.emails) {
      unverifiedContactListKey = 'emails'
    } else if (
      type === UserContactType.Mobile &&
      profile.unverified.mobilePhones
    ) {
      unverifiedContactListKey = 'mobilePhones'
    } else if (
      type === UserContactType.Telephone &&
      profile.unverified.homePhones
    ) {
      unverifiedContactListKey = 'homePhones'
    } else {
      // contact not found in any unverified contacts list
      return profile
    }

    // eslint-disable-next-line no-self-compare
    const newUnverifiedContactList = profile.unverified[
      unverifiedContactListKey
    ].filter((c) => c.address !== contact)

    const updatedUnverified = {
      ...profile.unverified,
      [unverifiedContactListKey]: newUnverifiedContactList
    }

    // We need to remove contactlist from unverified if it's empty now
    updatedUnverified[unverifiedContactListKey].length === 0 &&
      delete updatedUnverified[unverifiedContactListKey]

    const updatedProfile = {
      ...profile,
      unverified: updatedUnverified
    }

    // We need to delete the unverifieed object if it's now empty
    updatedProfile.unverified.length === 0 && delete updatedProfile.unverified

    return updatedProfile
  } else {
    return profile
  }
}

const addVerifiedContact = (profile, type, contact) => {
  let verifiedContactList

  switch (type) {
    case 'email':
      verifiedContactList = profile.emails
      break
    case 'mobile':
      verifiedContactList = profile.mobilePhones
      break
    case 'homePhones':
      verifiedContactList = profile.homePhones
      break
  }

  // Check for duplicates
  if (!verifiedContactList.includes(contact)) {
    const updatedProfile = {
      ...profile,
      // update the correct unverified contacts list based on users input
      [type === 'email'
        ? 'emails'
        : type === 'mobile'
        ? 'mobilePhones'
        : 'homePhones']: [...verifiedContactList, contact]
    }
    return updatedProfile
  } else {
    // contact exists already, so do nothing
    return profile
  }
}

const removeVerifiedContact = (profile, contact, type) => {
  let verifiedContactListKey

  if (type === UserContactType.Email) {
    verifiedContactListKey = 'emails'
  } else if (type === UserContactType.Mobile) {
    verifiedContactListKey = 'mobilePhones'
  } else if (type === UserContactType.Telephone) {
    verifiedContactListKey = 'homePhones'
  } else {
    // contact not found in any unverified contacts list
    return profile
  }

  // eslint-disable-next-line no-self-compare
  const newVerifiedContactList = profile[verifiedContactListKey].filter(
    (c) => c !== contact
  )

  const updatedProfile = {
    ...profile,
    [verifiedContactListKey]: newVerifiedContactList
  }
  return updatedProfile
}

const addAccountName = (profile, firstname, lastname) => {
  const updatedProfile = {
    ...profile,
    firstname,
    lastname
  }

  return updatedProfile
}

const getAdditionals = (profile, id) => {
  if (profile.additionals) {
    if (Array.isArray(profile.additionals)) {
      for (let i = 0; i < profile.additionals.length; i++) {
        if (profile.additionals[i].id === id) {
          return profile.additionals[i].value?.s
        }
      }
    } else {
      return profile.additionals[id] || ''
    }
  }
  return ''
}

const updateAdditionals = (profile, updatedAdditionals) => {
  const additionals = JSON.parse(JSON.stringify(profile.additionals))

  for (let i = 0; i < updatedAdditionals.length; i++) {
    let idFound = false
    const id = updatedAdditionals[i].id
    const value = updatedAdditionals[i].value
    for (let j = 0; j < additionals.length; j++) {
      if (additionals[j].id === id) {
        additionals[j].value = value
        idFound = true
      }
    }
    if (!idFound) {
      additionals.push({ id, value })
    }
  }

  const updatedProfile = {
    ...profile,
    additionals
  }

  return updatedProfile
}

const addLocation = (profile, newLocation) => {
  const currentLocations = profile.pois

  const exists = currentLocations.some(
    (existingLocation) => existingLocation.address === newLocation.address
  )

  if (!exists) {
    const updatedProfile = {
      ...profile,
      pois: [...currentLocations, newLocation]
    }
    return updatedProfile
  } else {
    return profile
  }
}

const removeLocation = (profile, address) => {
  const newLocationList = profile.pois.filter(
    (location) => location.address !== address
  )

  const updatedProfile = {
    ...profile,
    pois: newLocationList
  }

  return updatedProfile
}

const updateLocationsAlertTypes = (profile, location, updatedAlertTypes) => {
  const parsedProfile = JSON.parse(JSON.stringify(profile))

  const locationIndex = parsedProfile.pois.findIndex(
    (poi) => poi.address === location.address
  )

  if (locationIndex !== -1) {
    parsedProfile.pois[locationIndex].additionals = setLocationOtherAdditionals(
      [],
      'alertTypes',
      updatedAlertTypes
    )
  }

  return parsedProfile
}

const getRegistrationParams = (profile, alertTypes) => {
  const channelVoiceEnabled = true
  const channelSmsEnabled = true
  const channelEmailEnabled = true // always true as user will have primary email
  const channelMobileAppEnabled = false

  return {
    channelVoiceEnabled,
    channelSmsEnabled,
    channelEmailEnabled,
    channelMobileAppEnabled,
    partnerCanView: true,
    partnerCanEdit: true,
    alertTypes
  }
}

function findPOIByAddress(profile, address) {
  const parsedProfile = JSON.parse(JSON.stringify(profile))

  return parsedProfile.pois.find((poi) => poi.address === address)
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

  return additionals
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

module.exports = {
  setLocationOtherAdditionals,
  getLocationOtherAdditional,
  findPOIByAddress,
  getRegistrationParams,
  addUnverifiedContact,
  removeUnverifiedContact,
  addVerifiedContact,
  removeVerifiedContact,
  addAccountName,
  getAdditionals,
  updateAdditionals,
  addLocation,
  removeLocation,
  updateLocationsAlertTypes
}
