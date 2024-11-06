const addUnverifiedContact = (profile, type, contact) => {
  let unverifiedContactList
  const formattedContact = { address: contact }

  switch (type) {
    case 'email':
      unverifiedContactList = profile.unverified?.emails
      break
    case 'mobile':
      unverifiedContactList = profile.unverified?.mobilePhones
      break
    case 'homePhones':
      unverifiedContactList = profile.unverified?.homePhones
      break
  }

  // Check for duplicates
  if (unverifiedContactList &&
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

const removeUnverifiedContact = (profile, contact) => {
  let unverifiedContactListKey

  if (profile.unverified.emails.some((email) => email.address === contact)) {
    unverifiedContactListKey = 'emails'
  } else if (
    profile.unverified.mobilePhones.some(
      (mobilePhone) => mobilePhone.address === contact
    )
  ) {
    unverifiedContactListKey = 'mobilePhones'
  } else if (
    profile.unverified.homePhones.some(
      (homePhone) => homePhone.address === contact
    )
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

  const updatedProfile = {
    ...profile,
    unverified: {
      ...profile.unverified,
      [unverifiedContactListKey]: newUnverifiedContactList
    }
  }

  return updatedProfile
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

const removeVerifiedContact = (profile, contact) => {
  let verifiedContactListKey

  if (profile.emails.includes(contact)) {
    verifiedContactListKey = 'emails'
  } else if (profile.mobilePhones.includes(contact)) {
    verifiedContactListKey = 'mobilePhones'
  } else if (profile.homePhones.includes(contact)) {
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
  profile.firstname = firstname
  profile.lastname = lastname

  const updatedProfile = {
    ...profile,
    firstname,
    lastname
  }

  return updatedProfile
}

const getAdditionals = (profile, id) => {
  for (let i = 0; i < profile.additionals.length; i++) {
    if (profile.additionals[i].id === id) {
      return profile.additionals[i].value.s
    }
  }
  return ''
}

const updateAdditionals = (profile, updatedAdditionals) => {
  let idFound = false
  const additionals = JSON.parse(JSON.stringify(profile.additionals))

  for (let i = 0; i < updatedAdditionals.length; i++) {
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
const setOrganisationAdditionals = (profile) => {
  const orgJson = {
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
  }
  return updateOrganisationAdditionals(profile, orgJson)
}
const getOrganisationAdditionals = (profile) => {
  return getAdditionals(profile, 'organisation')
}

const updateOrganisationAdditionals = (profile, updatedOrganisation) => {
  return updateAdditionals(profile, [
    { id: 'organisation', value: updatedOrganisation }
  ])
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

const updateLocationsFloodCategory = (profile, location, updatedCategories) => {
  const parsedProfile = JSON.parse(JSON.stringify(profile))

  const locationIndex = parsedProfile.pois.findIndex(
    (poi) => poi.address === location.address
  )
  if (locationIndex !== -1) {
    parsedProfile.pois[locationIndex].categories = updatedCategories
  }

  return parsedProfile
}

module.exports = {
  addUnverifiedContact,
  removeUnverifiedContact,
  addVerifiedContact,
  removeVerifiedContact,
  addAccountName,
  getAdditionals,
  updateAdditionals,
  addLocation,
  removeLocation,
  updateLocationsFloodCategory,
  setOrganisationAdditionals,
  getOrganisationAdditionals,
  updateOrganisationAdditionals
}
