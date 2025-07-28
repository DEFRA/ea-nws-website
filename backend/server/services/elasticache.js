const checkKeyExists = async (client, key) => {
  // send the data
  const keyExists = await client.exists(key)
  return keyExists
}

const deleteData = async (client, key) => {
  // send the data
  await client.del(key)
}

const setJsonData = async (client, key, json, path) => {
  // only store data for 24 hours in the event the browser is closed without signing out
  const time = 60 * 60 * 24
  // send the data
  if (path) {
    await client.json.set(key, '$.' + path, json)
  } else {
    await client.json.set(key, '$', json)
  }
  await client.expire(key, time)
}

const getJsonData = async (client, key, path) => {
  let result
  if (path) {
    result = (await client.json.get(key, { path: '$.' + path }))[0]
  } else {
    result = await client.json.get(key)
  }
  return result
}

const deleteJsonData = async (client, key, path) => {
  // delete the data
  if (path) {
    await client.json.del(key, '$.' + path)
  } else {
    await client.json.del(key)
  }
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

const setLocations = async (client, orgId, locations, statusKey) => {
  const key = orgId + ':t_POIS'
  const formattedLocations = {}
  locations.forEach((location) => {
    formattedLocations[location.id] = location
  })
  const numLocations = Object.keys(formattedLocations).length
  await setJsonData(client, key, formattedLocations)
  let i = 1
  let percent = 0
  Object.keys(formattedLocations).forEach(async (key) => {
    const location = formattedLocations[key]
    let keywords = []
    location.additionals.forEach((additional) => {
      if (additional.id === 'keywords') {
        keywords = JSON.parse(additional.value?.s)
      }
    })
    for (const keyword of keywords) {
      await addToKeywordArr(client, orgId + ':t_Keywords_location', {
        name: keyword,
        linked_ids: [key]
      })
    }
    let newPercent = Math.round((i/numLocations)*100)
    if (percent !== newPercent) {
      percent = newPercent
      await setJsonData(client, statusKey, {
        stage: 'Processing locations',
        status: 'working',
        percent: percent
      })
    }
    i++
  })
}

const addLocation = async (client, orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_POIS'
  await setJsonData(client, key, location, locationID)
  // add location ID to list
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
}

const removeLocationFromKeywords = async (client, orgId, locationID) => {
  const key = orgId + ':t_Keywords_location'
  const arrExists = await checkKeyExists(client, key)
  if (arrExists) {
    const keywordArr = await getJsonData(client, key)
    const updatedKeywordArr = keywordArr
      .map((keyword) => {
        keyword.linked_ids = keyword.linked_ids.filter(
          (id) => id !== locationID
        )
        return keyword
      })
      .filter((keyword) => keyword.linked_ids.length > 0)
    await setJsonData(client, key, updatedKeywordArr)
  }
}

const removeLocation = async (client, orgId, locationID) => {
  const key = orgId + ':t_POIS'
  await removeLocationFromKeywords(client, orgId, locationID)
  await deleteJsonData(client, key, locationID)
}

const updateLocation = async (client, orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_POIS'
  const exists = await getJsonData(client, key, locationID)
  if (exists.length < 1) {
    await removeLocation(client, orgId, locationID)
  }
  await addLocation(client, orgId, location)
}

const listLocations = async (client, orgId) => {
  const locations = await getJsonData(client, orgId + ':t_POIS')
  const locationArr = []
  Object.keys(locations).forEach((key) => {
    const location = locations[key]
    const hasParentID =
      location.additionals.find((additional) => additional.id === 'parentID')
        ?.value?.s?.length > 0 || false
    // We only want to return locations that aren't nearby areas
    if (!hasParentID) {
      locationArr.push(location)
    }
  })
  return locationArr
}

const findLocationByName = async (client, orgId, locationName) => {
  const locations = await getJsonData(client, orgId + ':t_POIS')
  const matchingLocations = []
  Object.keys(locations).forEach((key) => {
    const location = locations[key]
    location.additionals.forEach((additional) => {
      if (additional.id === 'locationName') {
        if (additional.value.s === locationName) {
          matchingLocations.push(location)
        }
      }
    })
  })

  return matchingLocations
}

const listLocationNames = async (client, orgId) => {
  const locations = await getJsonData(client, orgId + ':t_POIS')
  const locationNames = []

  Object.keys(locations).forEach((key) => {
    const location = locations[key]
    location.additionals.forEach((additional) => {
      if (additional.id === 'locationName') {
        locationNames.push(additional.value.s)
      }
    })
  })

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

const getLinkedContactsCount = async (client, orgId) => {
  const key = orgId + ':t_Linked_locations'
  const contactCount = {}

  const arrExists = await checkKeyExists(client, key)

  if (arrExists) {
    const linkedArr = await getJsonData(client, key)
    linkedArr.forEach((link) => {
      contactCount[link.id] = link.linkIDs.length
    })
  }

  return contactCount
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
              const locKey = orgId + ':t_POIS'
              const location = await getJsonData(client, locKey, locationID)
              location && locationArr.push(location)
            })
          )
        }
      })
    )
  }

  return locationArr
}

const getLinkedLocationsCount = async (client, orgId) => {
  const key = orgId + ':t_Linked_contacts'
  const locationCount = {}

  const arrExists = await checkKeyExists(client, key)

  if (arrExists) {
    const linkedArr = await getJsonData(client, key)
    linkedArr.forEach((link) => {
      locationCount[link.id] = link.linkIDs.length
    })
  }

  return locationCount
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

const orgSignIn = async (
  client,
  profile,
  organization,
  locations,
  contacts,
  orgId,
  authToken
) => {
  const statusKey = 'signin_status:' + authToken
  await setJsonData(client, profile.id + ':profile', profile)
  await addOrgActiveAdmins(client, orgId, profile.id)
  const orgExists = await checkKeyExists(client, orgId + ':org_data')
  if (orgExists) {
    const existingLocations = await getJsonData(
      client,
      organization.id + ':t_POIS'
    )
    const numLocations = locations.length
    let locIndex = 1
    let locPercent = 0
    for (const location of locations) {
      if (!Object.keys(existingLocations).includes(location.id)) {
        await addLocation(client, organization.id, location)
      }
      let newLocPercent = Math.round((locIndex/numLocations)*100)
      if (locPercent !== newLocPercent) {
        locPercent = newLocPercent
        await setJsonData(client, statusKey, {
          stage: 'Processing locations',
          status: 'working',
          percent: locPercent
        })
      }
      locIndex++
    }
    const existingContacts = await getContactKeys(client, orgId)
    const existingContactIds = existingContacts.map((contact) =>
      contact.split(':').slice(2).join(':')
    )
    const numContacts = contacts.length
    let contactIndex = 1
    let contactPercent = 0
    for (const contact of contacts) {
      if (!existingContactIds.includes(contact.id)) {
        await addContact(client, orgId, contact)
      }
      let newContactPercent = Math.round((contactIndex/numContacts)*100)
      if (contactPercent !== newContactPercent) {
        contactPercent = newContactPercent
        await setJsonData(client, statusKey, {
          stage: 'Retrieving Contacts',
          status: 'working',
          percent: contactPercent
        })
      }
      contactIndex++
    }
  } else {
    await setJsonData(client, organization.id + ':org_data', organization)
    await setLocations(client, organization.id, locations, statusKey)
    const numContacts = contacts.length
    let i = 1
    let percent = 0
    for (const contact of contacts) {
      await addContact(client, orgId, contact)
      let newPercent = Math.round((i/numContacts)*100)
      if (percent !== newPercent) {
        percent = newPercent
        await setJsonData(client, statusKey, {
          stage: 'Retrieving Contacts',
          status: 'working',
          percent: percent
        })
      }
      i++
    }
  }
}

const orgSignOut = async (client, profileId, orgId, authToken) => {
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
    const invLocationKeys = await getInvLocationKeys(client, orgId)
    const contactKeys = await getContactKeys(client, orgId)
    await deleteJsonData(client, orgId + ':t_POIS')

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

    await deleteData(client, orgId + ':t_invPOIS_locID')
    await deleteData(client, orgId + ':t_Contacts_ID')
    // delete contact and location keywords
    await deleteJsonData(client, orgId + ':t_Keywords_location')
    await deleteJsonData(client, orgId + ':t_Keywords_contact')
    await deleteJsonData(client, orgId + ':t_Linked_locations')
    await deleteJsonData(client, orgId + ':t_Linked_contacts')

    // delete session data
    await deleteJsonData(client, authToken)
  }
}

const setTAData = async (client, TA_CODE, data) => {
  const key = 'TAData:' + TA_CODE
  const json = data
  await client.json.set(key, '$', json)
}

const getTAData = async (client, TA_CODE) => {
  const key = 'TAData:' + TA_CODE
  let TAData = null
  const dataExists = await checkKeyExists(client, key)
  if (dataExists) {
    TAData = await getJsonData(client, key)
  }
  return TAData
}

const setFloodHistory = async (client, value) => {
  const key = 'TAHistoryCount'
  const d = new Date(),
    e = new Date(d)
  const secondsSinceMidnight = (e - d.setHours(0, 0, 0, 0)) / 1000
  const secondsInDay = 60 * 60 * 24
  const secondsTillMidnight = parseInt(secondsInDay - secondsSinceMidnight)
  // send the data
  await client.json.set(key, '$', value)
  await client.expire(key, secondsTillMidnight)
}

const getFloodHistory = async (client) => {
  const key = 'TAHistoryCount'
  let floodHistory = null
  const dataExists = await checkKeyExists(client, key)
  if (dataExists) {
    floodHistory = await getJsonData(client, key)
  }
  return floodHistory
}

module.exports = {
  setJsonData,
  getJsonData,
  deleteJsonData,
  addLocation,
  removeLocation,
  updateLocation,
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
  getOrgActiveAdmins,
  setTAData,
  getTAData,
  setFloodHistory,
  getFloodHistory,
  getLinkedContactsCount,
  getLinkedLocationsCount
}
