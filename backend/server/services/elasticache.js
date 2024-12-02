const redis = require('redis')
const getSecretKeyValue = require('./SecretsManager')

const connectToRedis = async () => {
  const redisEndpoint = await getSecretKeyValue('nws/aws', 'redisEndpoint')
  // Create the client
  const client = redis.createClient({ url: 'rediss://' + redisEndpoint })
  client.on('error', error => {
    console.log('Redis Client Error', error)
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
    await addToKeywordArr(orgId + ':t_Keywords_location', { name: keyword, linked_ids: [locationID] })
  }
}

const removeLocation = async (orgId, locationID) => {
  const key = orgId + ':t_POIS:' + locationID
  await deleteJsonData(key)
  await removeFromList(orgId + ':t_POIS_locID', locationID)
}

const updateLocation = async (orgId, location) => {
  // Can call to add location as setting a value for a
  // key will overwrite it's previous value.
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
  await Promise.all(locationKeys.map(async (key) => {
    const location = await getJsonData(key)
    locationArr.push(location)
  }))
  return locationArr
}

const searchLocations = async (orgId, searchKey, value) => {
  const locationKeys = await getLocationKeys(orgId)
  const locationArr = []
  const searchKeyArr = searchKey.split('.')
  await Promise.all(locationKeys.map(async (key) => {
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
  }))
  return locationArr
}

const findLocationByName = async (orgId, locationName) => {
  const locationKeys = await getLocationKeys(orgId)
  const matchingLocations = []
  await Promise.all(locationKeys.map(async (key) => {
    const location = await getJsonData(key)
    location.additionals.forEach((additional) => {
      if (additional.id === 'locationName') {
        if (additional.value.s === locationName) {
          matchingLocations.push(location)
        }
      }
    })
  }))
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
  await Promise.all(locationKeys.map(async (key) => {
    const location = await getJsonData(key)
    locationArr.push(location)
  }))
  return locationArr
}

const addContact = async (orgId, contact) => {
  const contactID = contact.id
  const key = orgId + ':t_Contacts:' + contactID
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
    await addToKeywordArr(orgId + ':t_Keywords_contact', { name: keyword, linked_ids: [contactID] })
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

const orgSignIn = async (profile, organization, locations, contacts) => {
  await setJsonData(profile.id + ':profile', profile)
  const orgExists = await checkKeyExists(organization.id + ':org_data')
  if (orgExists) {
    const existingLocations = await getLocationKeys(organization.id)
    const existingLocationIds = existingLocations.map(location => location.split(':').at(-1)
    )
    for (const location of locations) {
      if (!existingLocationIds.includes(location.id)) {
        await addLocation(organization.id, location)
      }
    }
    const existingContacts = await getContactKeys(organization.id)
    const existingContactIds = existingContacts.map(contact => contact.split(':').at(-1)
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
  const contactKeys = await getContactKeys(orgId)
  await Promise.all(locationKeys.map(async (key) => {
    await deleteJsonData(key)
  }))
  await Promise.all(contactKeys.map(async (key) => {
    await deleteJsonData(key)
  }))

  await deleteData(orgId + ':t_POIS_locID')
  await deleteData(orgId + ':t_Contacts_ID')
  // delete contact and location keywords
  await deleteJsonData(orgId + ':t_Keywords_location')
  await deleteJsonData(orgId + ':t_Keywords_contact')
}

module.exports = {
  setJsonData,
  getJsonData,
  deleteJsonData,
  addLocation,
  removeLocation,
  updateLocation,
  searchLocations,
  findLocationByName,
  listLocations,
  addInvLocation,
  removeInvLocation,
  listInvLocations,
  orgSignIn,
  orgSignOut
}
