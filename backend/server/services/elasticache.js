const checkKeyExists = async (client, key) => {
  // send the data
  const keyExists = await client.exists(key)
  return keyExists
}

const deleteData = async (client, key) => {
  // send the data
  await client.del(key)
}

const setJsonData = async (client, key, json) => {
  // only store data for 24 hours in the event the browser is closed without signing out
  const time = 60 * 60 * 24
  // send the data
  await client.json.set(key, '$', json)
  await client.expire(key, time)
}

const getJsonData = async (client, key, paths) => {
  let result
  if (paths) {
    const formattedPaths = { path: paths }
    result = await client.json.get(key, formattedPaths)
  } else {
    result = await client.json.get(key)
  }
  return result
}

const deleteJsonData = async (client, key) => {
  // delete the data
  await client.json.del(key)
}

const getList = async (client, key) => {
  const keys = await client.lRange(key, 0, -1)
  return keys
}

const addToList = async (client, key, value) => {
  await client.lPush(key, value)
  const time = 60 * 60 * 24
  await client.expire(key, time)
}

const removeFromList = async (client, key, value) => {
  await client.lRem(key, 0, value)
}

const addToJsonArr = async (client, key, value) => {
  const arrExists = await checkKeyExists(client, key)
  if (arrExists) {
    await client.json.arrAppend(key, '.', value)
  } else {
    await setJsonData(client, key, [value])
  }
}

const addToKeywordArr = async (client, key, value) => {
  const arrExists = await checkKeyExists(client, key)
  if (arrExists) {
    const keywordArr = await getJsonData(client, key)
    let keywordExists = false
    keywordArr.forEach((keyword) => {
      if (keyword.name === value.name) {
        keywordExists = true
        keyword.linked_ids.push(value.linked_ids[0])
      }
    })
    if (keywordExists) {
      await setJsonData(client, key, keywordArr)
    } else {
      await addToJsonArr(client, key, value)
    }
  } else {
    await setJsonData(client, key, [value])
  }
}

/*
Functions for Valid locations to be used accross the
entire site
*/

const addToAlert = async (client, orgId, location) => {
  const key = orgId + ':alertLocations'
  const exists = await checkKeyExists(client, key)
  if (!exists) {
    const struct = {
      severeWarningAlert: [],
      severeWarning: [],
      alert: [],
      noAlert: []
    }
    await setJsonData(client, key, struct)
  }
  let alertTypes = []
  location.additionals.forEach((additional) => {
    if (additional.id === 'other') {
      const other = JSON.parse(additional.value?.s)
      alertTypes = other.alertTypes
      if (!alertTypes) {
        alertTypes = []
      }
    }
  })
  if (alertTypes.length === 3) {
    await client.json.arrAppend(key, '.severeWarningAlert', location.id)
  } else if (alertTypes.length === 2) {
    await client.json.arrAppend(key, '.severeWarning', location.id)
  } else if (alertTypes.length === 1) {
    await client.json.arrAppend(key, '.alert', location.id)
  } else {
    await client.json.arrAppend(key, '.noAlert', location.id)
  }
}

const addLocation = async (client, orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_POIS:' + locationID
  await setJsonData(client, key, location)
  // add location ID to list
  await addToList(client, orgId + ':t_POIS_locID', locationID)
  let keywords = []
  location.additionals.forEach((additional) => {
    if (additional.id === 'keywords') {
      keywords = JSON.parse(additional.value?.s)
    }
  })
  for (const keyword of keywords) {
    await addToKeywordArr(client, orgId + ':t_Keywords_location', {
      name: keyword,
      linked_ids: [locationID]
    })
  }

  await addToAlert(client, orgId, location)
}

const removeLocationFromKeywords = async (client, orgId, locationID) => {
  const key = orgId + ':t_Keywords_location'
  const arrExists = await checkKeyExists(client, key)
  if (arrExists) {
    const keywordArr = await getJsonData(client, key)
    const updatedKeywordArr = keywordArr
      .map((keyword) => {
        keyword.linked_ids = keyword.linked_ids.filter((id) => id !== locationID)
        return keyword
      })
      .filter((keyword) => keyword.linked_ids.length > 0)
    await setJsonData(client, key, updatedKeywordArr)
  }
}

const removeLocation = async (client, orgId, locationID) => {
  const key = orgId + ':t_POIS:' + locationID
  await removeLocationFromKeywords(client, orgId, locationID)
  await deleteJsonData(client, key)
  await removeFromList(client, orgId + ':t_POIS_locID', locationID)
}

const updateLocation = async (client, orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_POIS:' + locationID
  const exists = await checkKeyExists(client, key)
  if (exists) {
    await removeLocation(client, orgId, locationID)
  }
  await addLocation(client, orgId, location)
}

const getLocationKeys = async (client, orgId) => {
  // Location keys are stored as a list
  const ids = await getList(client, orgId + ':t_POIS_locID')
  const keys = []
  ids.forEach((id) => {
    keys.push(orgId + ':t_POIS:' + id)
  })
  return keys
}

const listLocations = async (client, orgId) => {
  const locationKeys = await getLocationKeys(client, orgId)
  const locationArr = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(client, key)
      const hasParentID =
        location.additionals.find((additional) => additional.id === 'parentID')
          ?.value?.s?.length > 0 || false
      // We only want to return locations that aren't nearby areas
      if (!hasParentID) {
        locationArr.push(location)
      }
    })
  )
  return locationArr
}

const searchLocations = async (client, orgId, searchKey, value) => {
  const locationKeys = await getLocationKeys(client, orgId)
  const locationArr = []
  const searchKeyArr = searchKey.split('.')
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(client, key)
      let jsonValue = location[searchKeyArr[0]]
      if (searchKeyArr.length > 1) {
        for (let i = 1; i < searchKeyArr.length; i++) {
          jsonValue = jsonValue[searchKeyArr[i]]
        }
      }
      if (value === jsonValue) {
        locationArr.push(location)
      }
    })
  )
  return locationArr
}

const searchInvLocations = async (client, orgId, searchKey, value) => {
  const locationKeys = await getInvLocationKeys(client, orgId)
  const locationArr = []
  const searchKeyArr = searchKey.split('.')
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(client, key)
      let jsonValue = location[searchKeyArr[0]]
      if (searchKeyArr.length > 1) {
        for (let i = 1; i < searchKeyArr.length; i++) {
          jsonValue = jsonValue[searchKeyArr[i]]
        }
      }
      if (value === jsonValue) {
        locationArr.push(location)
      }
    })
  )
  return locationArr
}

const findLocationByName = async (client, orgId, locationName) => {
  const locationKeys = await getLocationKeys(client, orgId)
  const matchingLocations = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(client, key)
      location.additionals.forEach((additional) => {
        if (additional.id === 'locationName') {
          if (additional.value.s === locationName) {
            matchingLocations.push(location)
          }
        }
      })
    })
  )
  return matchingLocations
}

const listLocationNames = async (client, orgId) => {
  const locationKeys = await getLocationKeys(client, orgId)
  const locationNames = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(client, key)
      location.additionals.forEach((additional) => {
        if (additional.id === 'locationName') {
          locationNames.push(additional.value.s)
        }
      })
    })
  )
  return locationNames
}

const findInvLocationByName = async (client, orgId, locationName) => {
  const locationKeys = await getInvLocationKeys(client, orgId)
  const matchingLocations = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(client, key)
      location.additionals.forEach((additional) => {
        if (additional.id === 'locationName') {
          if (additional.value.s === locationName) {
            matchingLocations.push(location)
          }
        }
      })
    })
  )
  return matchingLocations
}

/*
Functions for invalid locations to be used during bulk upload
for manually matching locations to coordinates
*/

const addInvLocation = async (client, orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_invPOIS:' + locationID
  await setJsonData(client, key, location)
  await addToList(client, orgId + ':t_invPOIS_locID', locationID)
}

const removeInvLocation = async (client, orgId, locationID) => {
  const key = orgId + ':t_invPOIS:' + locationID
  await deleteJsonData(client, key)
  await removeFromList(client, orgId + ':t_invPOIS_locID', locationID)
}

const getInvLocationKeys = async (client, orgId) => {
  // Location IDs are stored in a list
  const ids = await getList(client, orgId + ':t_invPOIS_locID')
  const keys = []
  ids.forEach((id) => {
    keys.push(orgId + ':t_invPOIS:' + id)
  })
  return keys
}

const listInvLocations = async (client, orgId) => {
  const locationKeys = await getInvLocationKeys(client, orgId)
  const locationArr = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(client, key)
      locationArr.push(location)
    })
  )
  return locationArr
}

const addContact = async (client, orgId, contact) => {
  const contactID = contact.id
  const key = orgId + ':t_Contacts:' + contactID
  const exists = await checkKeyExists(client, key)
  if (!exists) {
    await setJsonData(client, key, contact)
    // add Contact ID to list
    await addToList(client, orgId + ':t_Contacts_ID', contactID)
    let keywords = []
    contact.additionals.forEach((additional) => {
      if (additional.id === 'keywords') {
        keywords = JSON.parse(additional.value?.s)
      }
    })
    for (const keyword of keywords) {
      await addToKeywordArr(client, orgId + ':t_Keywords_contact', {
        name: keyword,
        linked_ids: [contactID]
      })
    }
  }
}

const getContactKeys = async (client, orgId) => {
  // Contact keys are stored as a list
  const ids = await getList(client, orgId + ':t_Contacts_ID')
  const keys = []
  ids.forEach((id) => {
    keys.push(orgId + ':t_Contacts:' + id)
  })
  return keys
}

const updateContact = async (client, orgId, contact) => {
  await removeContact(client, orgId, contact.id)
  await addContact(client, orgId, contact)
}

const removeContact = async (client, orgId, contactID) => {
  const key = orgId + ':t_Contacts:' + contactID
  await removeContactFromKeywords(client, orgId, contactID)
  await deleteJsonData(client, key)
  await removeFromList(client, orgId + ':t_Contacts_ID', contactID)
}

const removeContactFromKeywords = async (client, orgId, contactID) => {
  const key = orgId + ':t_Keywords_contact'
  const arrExists = await checkKeyExists(client, key)
  if (arrExists) {
    const keywordArr = await getJsonData(client, key)
    const updatedKeywordArr = keywordArr
      .map((keyword) => {
        keyword.linked_ids = keyword.linked_ids.filter((id) => id !== contactID)
        return keyword
      })
      .filter((keyword) => keyword.linked_ids.length > 0)
    await setJsonData(client, key, updatedKeywordArr)
  }
}

const listContacts = async (client, orgId) => {
  const contactKeys = await getContactKeys(client, orgId)
  const contactArr = []
  await Promise.all(
    contactKeys.map(async (key) => {
      const contact = await getJsonData(client, key)
      contact && contactArr.push(contact)
    })
  )
  return contactArr
}

const listLinkedContacts = async (client, orgId, locationID) => {
  const key = orgId + ':t_Linked_locations'
  const contactArr = []

  const arrExists = await checkKeyExists(client, key)

  if (arrExists) {
    const linkedArr = await getJsonData(client, key)
    await Promise.all(
      linkedArr.map(async (link) => {
        if (link.id === locationID) {
          await Promise.all(
            link.linkIDs.map(async (contactID) => {
              const contactKey = orgId + ':t_Contacts:' + contactID
              const contact = await getJsonData(client, contactKey)
              contact && contactArr.push(contact)
            })
          )
        }
      })
    )
  }

  return contactArr
}

const listLinkedLocations = async (client, orgId, contactID) => {
  const key = orgId + ':t_Linked_contacts'
  const locationArr = []

  const arrExists = await checkKeyExists(client, key)

  if (arrExists) {
    const linkedArr = await getJsonData(client, key)

    await Promise.all(
      linkedArr.map(async (link) => {
        if (link.id === contactID) {
          await Promise.all(
            link.linkIDs.map(async (locationID) => {
              const locKey = orgId + ':t_POIS:' + locationID
              const location = await getJsonData(client, locKey)
              location && locationArr.push(location)
            })
          )
        }
      })
    )
  }

  return locationArr
}

const addToLinkedArr = async (client, key, value) => {
  const arrExists = await checkKeyExists(client, key)
  if (arrExists) {
    const linkedArr = await getJsonData(client, key)
    if (linkedArr) {
      let linkExists = false
      linkedArr.forEach((link) => {
        if (link.id === value.id) {
          linkExists = true
          if (!link.linkIDs.includes(value.linkIDs[0])) {
            link.linkIDs.push(value.linkIDs[0])
          }
        }
      })
      if (linkExists) {
        await setJsonData(client, key, linkedArr)
      } else {
        await addToJsonArr(client, key, value)
      }
    } else {
      await setJsonData(client, key, [value])
    }
  } else {
    await setJsonData(client, key, [value])
  }
}

const removeFromLinkedArr = async (client, key, value) => {
  const arrExists = await checkKeyExists(client, key)
  if (arrExists) {
    const linkedArr = await getJsonData(client, key)
    if (linkedArr) {
      let removedLink = false
      linkedArr.forEach((link) => {
        if (link.id === value.id) {
          const itemIndex = link.linkIDs.indexOf(value.linkIDs[0])
          if (itemIndex > -1) {
            link.linkIDs.splice(itemIndex, 1)
            removedLink = true
          }
        }
      })
      if (removedLink) {
        await setJsonData(client, key, linkedArr)
      }
    }
  }
}

const addLinkedLocations = async (client, orgId, contactID, locationIDs) => {
  if (locationIDs) {
    for (const locationID of locationIDs) {
      await addToLinkedArr(client, orgId + ':t_Linked_locations', {
        id: locationID,
        linkIDs: [contactID]
      })

      await addToLinkedArr(client, orgId + ':t_Linked_contacts', {
        id: contactID,
        linkIDs: [locationID]
      })
    }
  }
}

const addLinkedContacts = async (client, orgId, locationID, contactIDs) => {
  if (contactIDs) {
    for (const contactID of contactIDs) {
      await addToLinkedArr(client, orgId + ':t_Linked_locations', {
        id: locationID,
        linkIDs: [contactID]
      })
      await addToLinkedArr(client, orgId + ':t_Linked_contacts', {
        id: contactID,
        linkIDs: [locationID]
      })
    }
  }
}

const removeLinkedContacts = async (client, orgId, locationID, contactIDs) => {
  if (contactIDs) {
    for (const contactID of contactIDs) {
      await removeFromLinkedArr(client, orgId + ':t_Linked_locations', {
        id: locationID,
        linkIDs: [contactID]
      })
      await removeFromLinkedArr(client, orgId + ':t_Linked_contacts', {
        id: contactID,
        linkIDs: [locationID]
      })
    }
  }
}

const addOrgActiveAdmins = async (client, orgId, id) => {
  const key = orgId + ':org_active_admins'
  await addToList(client, key, id)
}

const removeOrgActiveAdmins = async (client, orgId, id) => {
  const key = orgId + ':org_active_admins'
  await removeFromList(client, key, id)
}

const getOrgActiveAdmins = async (client, orgId) => {
  const key = orgId + ':org_active_admins'
  const activeAdmins = await getList(client, key)
  return activeAdmins
}

const orgSignIn = async (client, profile, organization, locations, contacts, authToken) => {
  await setJsonData(client, profile.id + ':profile', profile)
  await addOrgActiveAdmins(client, organization.id, profile.id)
  const orgExists = await checkKeyExists(client, organization.id + ':org_data')
  if (orgExists) {
    const existingLocations = await getLocationKeys(client, organization.id)
    const existingLocationIds = existingLocations.map((location) =>
      location.split(':').slice(2).join(':')
    )
    for (const location of locations) {
      if (!existingLocationIds.includes(location.id)) {
        await addLocation(client, organization.id, location)
      }
    }
    const existingContacts = await getContactKeys(client, organization.id)
    const existingContactIds = existingContacts.map((contact) =>
      contact.split(':').slice(2).join(':')
    )
    for (const contact of contacts) {
      if (!existingContactIds.includes(contact.id)) {
        await addContact(client, organization.id, contact)
      }
    }
  } else {
    await setJsonData(client, organization.id + ':org_data', organization)
    for (const location of locations) {
      await addLocation(client, organization.id, location)
    }
    for (const contact of contacts) {
      await addContact(client, organization.id, contact)
    }
  }
}

const orgSignOut = async (client, profileId, orgId) => {
  // delete profile
  await deleteJsonData(client, profileId + ':profile')
  await removeOrgActiveAdmins(client, orgId, profileId)
  // get the new list to see if there are any admins still logged in
  const activeAdmins = await getOrgActiveAdmins(client, orgId)
  // delete all data from elasticache if there are no org Admins logged in
  if (activeAdmins.length === 0) {
    // delete org
    await deleteJsonData(client, orgId + ':org_data')
    // delete locations
    // delete contacts
    const locationKeys = await getLocationKeys(client, orgId)
    const invLocationKeys = await getInvLocationKeys(client, orgId)
    const contactKeys = await getContactKeys(client, orgId)
    await Promise.all(
      locationKeys.map(async (key) => {
        await deleteJsonData(client, key)
      })
    )
    await Promise.all(
      invLocationKeys.map(async (key) => {
        await deleteJsonData(client, key)
      })
    )
    await Promise.all(
      contactKeys.map(async (key) => {
        await deleteJsonData(client, key)
      })
    )

    await deleteData(client, orgId + ':t_POIS_locID')
    await deleteData(client, orgId + ':t_invPOIS_locID')
    await deleteData(client, orgId + ':t_Contacts_ID')
    // delete contact and location keywords
    await deleteJsonData(client, orgId + ':t_Keywords_location')
    await deleteJsonData(client, orgId + ':t_Keywords_contact')
    await deleteJsonData(client, orgId + ':alertLocations')
    await deleteJsonData(client, orgId + ':t_Linked_locations')
    await deleteJsonData(client, orgId + ':t_Linked_contacts')
  }
}

module.exports = {
  setJsonData,
  getJsonData,
  deleteJsonData,
  addLocation,
  removeLocation,
  updateLocation,
  searchLocations,
  searchInvLocations,
  findLocationByName,
  listLocationNames,
  findInvLocationByName,
  listLocations,
  listContacts,
  addInvLocation,
  removeInvLocation,
  listInvLocations,
  addContact,
  updateContact,
  removeContact,
  listLinkedContacts,
  listLinkedLocations,
  addLinkedLocations,
  addLinkedContacts,
  removeLinkedContacts,
  orgSignIn,
  orgSignOut,
  checkKeyExists,
  addOrgActiveAdmins,
  getOrgActiveAdmins
}
