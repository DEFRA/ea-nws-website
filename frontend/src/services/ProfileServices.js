const addUnverifiedContact = (profile, type, contact) => {
  let unverifiedContactList

  switch (type) {
    case 'email':
      unverifiedContactList = profile.unverified.emails
      break
    case 'mobile':
      unverifiedContactList = profile.unverified.mobilePhones
      break
    case 'homePhones':
      unverifiedContactList = profile.unverified.homePhones
      break
  }

  // Check for duplicates
  if (!unverifiedContactList.includes(contact)) {
    const updatedProfile = {
      ...profile,
      unverified: {
        ...profile.unverified,
        // update the correct unverified contacts list based on users input
        [type === 'email'
          ? 'emails'
          : type === 'mobile'
            ? 'mobilePhones'
            : 'homePhones']: [...unverifiedContactList, contact]
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

  if (profile.unverified.emails.includes(contact)) {
    unverifiedContactListKey = 'emails'
  } else if (profile.unverified.mobilePhones.includes(contact)) {
    unverifiedContactListKey = 'mobilePhones'
  } else if (profile.unverified.homePhones.includes(contact)) {
    unverifiedContactListKey = 'homePhones'
  } else {
    // contact not found in any unverified contacts list
    return profile
  }

  // eslint-disable-next-line no-self-compare
  const newUnverifiedContactList = profile.unverified[
    unverifiedContactListKey
  ].filter((c) => c !== contact)

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
      return profile.additionals[i].value
    }
  }
  return ''
}

const updateAdditionals = (profile, id, value) => {
  let idFound = false
  for (let i = 0; i < profile.additionals.length; i++) {
    if (profile.additionals[i].id === id) {
      profile.additionals[i].value = value
      idFound = true
    }
  }
  if (!idFound) {
    profile.additionals.push({ id, value })
  }
}

const addLocation = (profile, newLocation) => {
  const currentLocations = profile.pois

  const exists = currentLocations.some(
    (existingLocation) => existingLocation.name === newLocation.name
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

const removeLocation = (profile, name) => {
  const newLocationList = profile.pois.filter(
    (location) => location.name !== name
  )

  const updatedProfile = {
    ...profile,
    pois: newLocationList
  }

  console.log(updatedProfile)

  return updatedProfile
}

// TODO i have no idea how to fix this
const updateLocationsFloodCategory = (profile, location, updatedCategories) => {
  // const locationIndex = profile.pois.findIndex(
  //   (poi) => poi.name === location.name
  // )

  // if (locationIndex !== -1) {
  //   profile.pois[locationIndex].categories = updatedCategories
  // }

  return profile
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
  updateLocationsFloodCategory
}
