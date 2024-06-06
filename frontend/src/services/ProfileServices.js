const addUnverifiedContact = (profile, type, contact) => {
  let unverifiedContactList

  switch (type) {
    case 'email':
      unverifiedContactList = profile.unverified.emails
      break
    case 'mobile':
      unverifiedContactList = profile.unverified.mobilePhones
      break
    case 'homePhone':
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
    console.log('contact not found')
    return profile
  }

  const newUnverifiedContactList = profile.unverified[
    unverifiedContactListKey
  ].filter((contact) => contact !== contact)

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
    case 'homePhone':
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

module.exports = {
  addUnverifiedContact,
  removeUnverifiedContact,
  addVerifiedContact
}
