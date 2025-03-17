const redis = require('redis')
const getSecretKeyValue = require('./SecretsManager')
const { logger } = require('../plugins/logging')

const connectToRedis = async () => {
  const redisEndpoint = await getSecretKeyValue('nws/aws', 'redisEndpoint')
  // Create the client
  const client = redis.createClient({ url: 'rediss://' + redisEndpoint })
  client.on('error', (error) => {
    logger.error(`Redis Client Error: ${error}`)
    throw error
  })
  // Connect to the redis elasticache
  await client.connect()
  return client
}

const checkKeyExists = async (key) => {
  const client = await connectToRedis()
  // send the data
  const keyExists = await client.exists(key)
  // disconnect as we don't need the connection open anymore
  await client.disconnect()
  return keyExists
}

const deleteData = async (key) => {
  const client = await connectToRedis()
  // send the data
  await client.del(key)
  // disconnect as we don't need the connection open anymore
  await client.disconnect()
}

const setJsonData = async (key, json) => {
  // only store data for 24 hours in the event the browser is closed without signing out
  const time = 60 * 60 * 24
  const client = await connectToRedis()
  // send the data
  await client.json.set(key, '$', json)
  await client.expire(key, time)
  // disconnect as we don't need the connection open anymore
  await client.disconnect()
}

const getJsonData = async (key, paths) => {
  const client = await connectToRedis()
  let result
  if (paths) {
    const formattedPaths = { path: paths }
    result = await client.json.get(key, formattedPaths)
  } else {
    result = await client.json.get(key)
  }
  await client.disconnect()
  return result
}

const deleteJsonData = async (key) => {
  const client = await connectToRedis()
  // delete the data
  await client.json.del(key)
  // disconnect as we don't need the connection open anymore
  await client.disconnect()
}

const getList = async (key) => {
  const client = await connectToRedis()
  const keys = await client.lRange(key, 0, -1)
  await client.disconnect()
  return keys
}

const addToList = async (key, value) => {
  const client = await connectToRedis()
  await client.lPush(key, value)
  const time = 60 * 60 * 24
  await client.expire(key, time)
  await client.disconnect()
}

const removeFromList = async (key, value) => {
  const client = await connectToRedis()
  await client.lRem(key, 0, value)
  await client.disconnect()
}

const addToJsonArr = async (key, value) => {
  const arrExists = await checkKeyExists(key)
  if (arrExists) {
    const client = await connectToRedis()
    await client.json.arrAppend(key, '.', value)
    await client.disconnect()
  } else {
    await setJsonData(key, [value])
  }
}

const addToKeywordArr = async (key, value) => {
  const arrExists = await checkKeyExists(key)
  if (arrExists) {
    const keywordArr = await getJsonData(key)
    let keywordExists = false
    keywordArr.forEach((keyword) => {
      if (keyword.name === value.name) {
        keywordExists = true
        keyword.linked_ids.push(value.linked_ids[0])
      }
    })
    if (keywordExists) {
      await setJsonData(key, keywordArr)
    } else {
      await addToJsonArr(key, value)
    }
  } else {
    await setJsonData(key, [value])
  }
}

/*
Functions for Valid locations to be used accross the
entire site
*/

const addToAlert = async (orgId, location) => {
  const key = orgId + ':alertLocations'
  const exists = await checkKeyExists(key)
  if (!exists) {
    const struct = {
      severeWarningAlert: [],
      severeWarning: [],
      alert: [],
      noAlert: []
    }
    await setJsonData(key, struct)
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
  const client = await connectToRedis()
  if (alertTypes.length === 3) {
    await client.json.arrAppend(key, '.severeWarningAlert', location.id)
  } else if (alertTypes.length === 2) {
    await client.json.arrAppend(key, '.severeWarning', location.id)
  } else if (alertTypes.length === 1) {
    await client.json.arrAppend(key, '.alert', location.id)
  } else {
    await client.json.arrAppend(key, '.noAlert', location.id)
  }
  await client.disconnect()
}

const addLocation = async (orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_POIS:' + locationID
  await setJsonData(key, location)
  // add location ID to list
  await addToList(orgId + ':t_POIS_locID', locationID)
  let keywords = []
  location.additionals.forEach((additional) => {
    if (additional.id === 'keywords') {
      keywords = JSON.parse(additional.value?.s)
    }
  })
  for (const keyword of keywords) {
    await addToKeywordArr(orgId + ':t_Keywords_location', {
      name: keyword,
      linked_ids: [locationID]
    })
  }

  await addToAlert(orgId, location)
}

const removeLocationFromKeywords = async (orgId, locationID) => {
  const key = orgId + ':t_Keywords_location'
  const arrExists = await checkKeyExists(key)
  if (arrExists) {
    const keywordArr = await getJsonData(key)
    keywordArr.forEach((keyword) => {
      let linkedIds = keyword.linked_ids
      linkedIds = linkedIds.filter((id) => id !== locationID)
      keyword.linked_ids = linkedIds
    })
    await setJsonData(key, keywordArr)
  }
}

const removeLocation = async (orgId, locationID) => {
  const key = orgId + ':t_POIS:' + locationID
  await removeLocationFromKeywords(orgId, locationID)
  await deleteJsonData(key)
  await removeFromList(orgId + ':t_POIS_locID', locationID)
}

const updateLocation = async (orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_POIS:' + locationID
  const exists = await checkKeyExists(key)
  if (exists) {
    await removeLocation(orgId, locationID)
  }
  await addLocation(orgId, location)
}

const getLocationKeys = async (orgId) => {
  // Location keys are stored as a list
  const ids = await getList(orgId + ':t_POIS_locID')
  const keys = []
  ids.forEach((id) => {
    keys.push(orgId + ':t_POIS:' + id)
  })
  return keys
}

const listLocations = async (orgId) => {
  const locationKeys = await getLocationKeys(orgId)
  const locationArr = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(key)
      const hasParentID = location.additionals.find((additional) =>
        additional.id === 'parentID')?.value?.s?.length > 0 || false
      // We only want to return locations that aren't nearby areas
      if (!hasParentID) {
        locationArr.push(location)
      }
    })
  )
  return locationArr
}

const searchLocations = async (orgId, searchKey, value) => {
  const locationKeys = await getLocationKeys(orgId)
  const locationArr = []
  const searchKeyArr = searchKey.split('.')
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(key)
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

const searchInvLocations = async (orgId, searchKey, value) => {
  const locationKeys = await getInvLocationKeys(orgId)
  const locationArr = []
  const searchKeyArr = searchKey.split('.')
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(key)
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

const findLocationByName = async (orgId, locationName) => {
  const locationKeys = await getLocationKeys(orgId)
  const matchingLocations = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(key)
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

const listLocationNames = async (orgId) => {
  const locationKeys = await getLocationKeys(orgId)
  const locationNames = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(key)
      location.additionals.forEach((additional) => {
        if (additional.id === 'locationName') {
          locationNames.push(additional.value.s)
          
        }
      })
    })
  )
  return locationNames
}

const findInvLocationByName = async (orgId, locationName) => {
  const locationKeys = await getInvLocationKeys(orgId)
  const matchingLocations = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(key)
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

const addInvLocation = async (orgId, location) => {
  const locationID = location.id
  const key = orgId + ':t_invPOIS:' + locationID
  await setJsonData(key, location)
  await addToList(orgId + ':t_invPOIS_locID', locationID)
}

const removeInvLocation = async (orgId, locationID) => {
  const key = orgId + ':t_invPOIS:' + locationID
  await deleteJsonData(key)
  await removeFromList(orgId + ':t_invPOIS_locID', locationID)
}

const getInvLocationKeys = async (orgId) => {
  // Location IDs are stored in a list
  const ids = await getList(orgId + ':t_invPOIS_locID')
  const keys = []
  ids.forEach((id) => {
    keys.push(orgId + ':t_invPOIS:' + id)
  })
  return keys
}

const listInvLocations = async (orgId) => {
  const locationKeys = await getInvLocationKeys(orgId)
  const locationArr = []
  await Promise.all(
    locationKeys.map(async (key) => {
      const location = await getJsonData(key)
      locationArr.push(location)
    })
  )
  return locationArr
}

const addContact = async (orgId, contact) => {
  const contactID = contact.id
  const key = orgId + ':t_Contacts:' + contactID
  const exists = await checkKeyExists(key)
  if (!exists) {
    await setJsonData(key, contact)
    // add Contact ID to list
    await addToList(orgId + ':t_Contacts_ID', contactID)
    let keywords = []
    contact.additionals.forEach((additional) => {
      if (additional.id === 'keywords') {
        keywords = JSON.parse(additional.value?.s)
      }
    })
    for (const keyword of keywords) {
      await addToKeywordArr(orgId + ':t_Keywords_contact', {
        name: keyword,
        linked_ids: [contactID]
      })
    }
  }
}

const getContactKeys = async (orgId) => {
  // Contact keys are stored as a list
  const ids = await getList(orgId + ':t_Contacts_ID')
  const keys = []
  ids.forEach((id) => {
    keys.push(orgId + ':t_Contacts:' + id)
  })
  return keys
}

const updateContact = async (orgId, contact) => {
  await removeContact(orgId, contact.id)
  await addContact(orgId, contact)
}

const removeContact = async (orgId, contactID) => {
  const key = orgId + ':t_Contacts:' + contactID
  await removeContactFromKeywords(orgId, contactID)
  await deleteJsonData(key)
  await removeFromList(orgId + ':t_Contacts_ID', contactID)
}

const removeContactFromKeywords = async (orgId, contactID) => {
  const key = orgId + ':t_Keywords_contact'
  const arrExists = await checkKeyExists(key)
  if (arrExists) {
    const keywordArr = await getJsonData(key)
    keywordArr.forEach((keyword) => {
      let linkedIds = keyword.linked_ids
      linkedIds = linkedIds.filter((id) => id !== contactID)
      keyword.linked_ids = linkedIds
    })
    await setJsonData(key, keywordArr)
  }
}

const listContacts = async (orgId) => {
  const contactKeys = await getContactKeys(orgId)
  const contactArr = []
  await Promise.all(
    contactKeys.map(async (key) => {
      const contact = await getJsonData(key)
      contact && contactArr.push(contact)
    })
  )
  return contactArr
}

const listLinkedContacts = async (orgId, locationID) => {
  const key = orgId + ':t_Linked_locations'
  const contactArr = []

  const arrExists = await checkKeyExists(key)

  if (arrExists) {
    const linkedArr = await getJsonData(key)
    await Promise.all(linkedArr.map(async (link) => {
      if (link.id === locationID) {
        await Promise.all(
          link.linkIDs.map(async (contactID) => {
            const contactKey = orgId + ':t_Contacts:' + contactID
            const contact = await getJsonData(contactKey)
            contactArr.push(contact)
          }))
      }
    }))
  }

  return contactArr
}

const listLinkedLocations = async (orgId, contactID) => {
  const key = orgId + ':t_Linked_contacts'
  const locationArr = []

  const arrExists = await checkKeyExists(key)

  if (arrExists) {
    const linkedArr = await getJsonData(key)

    await Promise.all(linkedArr.map(async (link) => {
      if (link.id === contactID) {
        await Promise.all(
          link.linkIDs.map(async (locationID) => {
            const locKey = orgId + ':t_POIS:' + locationID
            const location = await getJsonData(locKey)
            location && locationArr.push(location)
          }))
      }
    }))
  }

  return locationArr
}

const addToLinkedArr = async (key, value) => {
  const arrExists = await checkKeyExists(key)
  if (arrExists) {
    const linkedArr = await getJsonData(key)
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
        await setJsonData(key, linkedArr)
      } else {
        await addToJsonArr(key, value)
      }
    } else {
      await setJsonData(key, [value])
    }
  } else {
    await setJsonData(key, [value])
  }
}

const removeFromLinkedArr = async (key, value) => {
  const arrExists = await checkKeyExists(key)
  if (arrExists) {
    const linkedArr = await getJsonData(key)
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
        await setJsonData(key, linkedArr)
      }
    }
  }
}

const addLinkedLocations = async (orgId, contactID, locationIDs) => {
  if (locationIDs) {
    for (const locationID of locationIDs) {
      await addToLinkedArr(orgId + ':t_Linked_locations', {
        id: locationID,
        linkIDs: [contactID]
      })

      await addToLinkedArr(orgId + ':t_Linked_contacts', {
        id: contactID,
        linkIDs: [locationID]
      })
    }
  }
}

const addLinkedContacts = async (orgId, locationID, contactIDs) => {
  if (contactIDs) {
    for (const contactID of contactIDs) {
      await addToLinkedArr(orgId + ':t_Linked_locations', {
        id: locationID,
        linkIDs: [contactID]
      })
      await addToLinkedArr(orgId + ':t_Linked_contacts', {
        id: contactID,
        linkIDs: [locationID]
      })
    }
  }
}

const removeLinkedContacts = async (orgId, locationID, contactIDs) => {
  if (contactIDs) {
    for (const contactID of contactIDs) {
      await removeFromLinkedArr(orgId + ':t_Linked_locations', {
        id: locationID,
        linkIDs: [contactID]
      })
      await removeFromLinkedArr(orgId + ':t_Linked_contacts', {
        id: contactID,
        linkIDs: [locationID]
      })
    }
  }
}

const orgSignIn = async (profile, organization, locations, contacts) => {
  await setJsonData(profile.id + ':profile', profile)
  const orgExists = await checkKeyExists(organization.id + ':org_data')
  if (orgExists) {
    const existingLocations = await getLocationKeys(organization.id)
    const existingLocationIds = existingLocations.map((location) =>
      location.split(':').slice(2).join(':')
    )
    for (const location of locations) {
      if (!existingLocationIds.includes(location.id)) {
        await addLocation(organization.id, location)
      }
    }
    const existingContacts = await getContactKeys(organization.id)
    const existingContactIds = existingContacts.map((contact) =>
      contact.split(':').slice(2).join(':')
    )
    for (const contact of contacts) {
      if (!existingContactIds.includes(contact.id)) {
        await addContact(organization.id, contact)
      }
    }
  } else {
    await setJsonData(organization.id + ':org_data', organization)
    for (const location of locations) {
      await addLocation(organization.id, location)
    }
    for (const contact of contacts) {
      await addContact(organization.id, contact)
    }
  }
}

const orgSignOut = async (profileId, orgId) => {
  // delete all data from elasticache
  // delete profile
  await deleteJsonData(profileId + ':profile')
  // delete org
  await deleteJsonData(orgId + ':org_data')
  // delete locations
  // delete contacts
  const locationKeys = await getLocationKeys(orgId)
  const invLocationKeys = await getInvLocationKeys(orgId)
  const contactKeys = await getContactKeys(orgId)
  await Promise.all(
    locationKeys.map(async (key) => {
      await deleteJsonData(key)
    })
  )
  await Promise.all(
    invLocationKeys.map(async (key) => {
      await deleteJsonData(key)
    })
  )
  await Promise.all(
    contactKeys.map(async (key) => {
      await deleteJsonData(key)
    })
  )

  await deleteData(orgId + ':t_POIS_locID')
  await deleteData(orgId + ':t_invPOIS_locID')
  await deleteData(orgId + ':t_Contacts_ID')
  // delete contact and location keywords
  await deleteJsonData(orgId + ':t_Keywords_location')
  await deleteJsonData(orgId + ':t_Keywords_contact')
  await deleteJsonData(orgId + ':alertLocations')
  await deleteJsonData(orgId + ':t_Linked_locations')
  await deleteJsonData(orgId + ':t_Linked_contacts')
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
  orgSignOut
}
