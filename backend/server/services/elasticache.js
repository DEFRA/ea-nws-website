const redis = require('redis')
const getSecretKeyValue = require('./SecretsManager')

const connectToRedis = async () => {
  const redisEndpoint = await getSecretKeyValue('nws/aws', 'redisEndpoint')
  // Create the client
  const client = redis.createClient({ url: 'rediss://' + redisEndpoint })
  client.on('error', err => console.log('Redis Client Error', err))
  // Connect to the redis elasticache
  await client.connect()
  return client
}

const checkKeyExists = async (key) => {
  const client = await connectToRedis()
  // send the data
  await client.exists(key)
  const keyExists = await client.expire(key, time)
  // disconnect as we don't need the connection open anymore
  await client.disconnect()
  return keyExists
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
  await client.disconnect()
}

const removeFromList = async (key, value) => {
  const client = await connectToRedis()
  await client.lRem(key, 0, value)
  await client.disconnect()
}

/*
Functions for Valid locations to be used accross the
entire site
*/

const addLocation = async (orgId, location) => {
  const locationID = location.meta_data.location_id
  const key = orgId + ':t_POIS:' + locationID
  await setJsonData(key, location)
  // add location ID to list
  await addToList(orgId + ':t_POIS_locID', locationID)
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
  locationKeys.forEach((key) => {
    const location = getJsonData(key)
    locationArr.push(location)
  })
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

/*
Functions for invalid locations to be used during bulk upload
for manually matching locations to coordinates
*/

const addInvLocation = async (orgId, location) => {
  const locationID = location.meta_data.location_id
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

const orgSignIn = async (profile, organization, locations) => {
  await setJsonData(profile.id+':profile', profile)
  const orgExists = await checkKeyExists(organization.id)
  if (orgExists) {
    const existingLocations = await getLocationKeys(organization.id)
    const existingLocationIds = existingLocations.forEach((location) => {
      location = location.split(':')[0]
    })
    await Promise.all(locations.map(async (location) => {
      if (!existingLocationIds.includes(location.id)) {
        await addLocation(organization.id, location)
      }
    }))
  } else {
    await setJsonData(organization.id+':org_data', organization)
    await Promise.all(locations.map(async (location) => {
      await addLocation(organization.id, location)
    }))
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
  listLocations,
  addInvLocation,
  removeInvLocation,
  listInvLocations,
  orgSignIn
}
