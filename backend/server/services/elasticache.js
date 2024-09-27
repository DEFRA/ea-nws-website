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

const getKeys = async (partialKey) => {
  const client = await connectToRedis()
  const keys = await client.keys(partialKey + '*')
  return keys
}

/*
Functions for Valid locations to be used accross the
entire site
*/

const addLocation = async (authToken, location) => {
  const locationID = location.meta_data.location_id
  const key = authToken + ':t_POIS:' + locationID
  await setJsonData(key, location)
}

const removeLocation = async (authToken, locationID) => {
  const key = authToken + ':t_POIS:' + locationID
  await deleteJsonData(key)
}

const updateLocation = async (authToken, location) => {
  // Can call to add location as setting a value for a
  // key will overwrite it's previous value.
  await addLocation(authToken, location)
}

const getLocationKeys = async (authToken) => {
  const keys = await getKeys(authToken + ':t_POIS:')
  return keys
}

const listLocations = async (authToken) => {
  const locationKeys = await getLocationKeys(authToken)
  const locationArr = []
  locationKeys.forEach((key) => {
    const location = getJsonData(key)
    locationArr.push(location)
  })
  return locationArr
}

const searchLocations = async (authToken, searchKey, value) => {
  const locationKeys = await getLocationKeys(authToken)
  const locationArr = []
  const searchKeyArr = searchKey.split('.')
  locationKeys.forEach((key) => {
    const location = getJsonData(key)
    let jsonValue = searchKeyArr[0]
    if (searchKeyArr.length < 1) {
      for (let i = 1; i < searchKeyArr.length; i++) {
        jsonValue = jsonValue[searchKeyArr[i]]
      }
    }
    if (value === jsonValue) {
      locationArr.push(location)
    }
  })
  return locationArr
}

/*
Functions for invalid locations to be used during bulk upload
for manually matching locations to coordinates
*/

const addInvLocation = async (authToken, location) => {
  const locationID = location.meta_data.location_id
  const key = authToken + ':t_invPOIS:' + locationID
  await setJsonData(key, location)
}

const removeInvLocation = async (authToken, locationID) => {
  const key = authToken + ':t_invPOIS:' + locationID
  await deleteJsonData(key)
}

const getInvLocationKeys = async (authToken) => {
  const keys = await getKeys(authToken + ':t_invPOIS:')
  return keys
}

const listInvLocations = async (authToken) => {
  const locationKeys = await getInvLocationKeys(authToken)
  const locationArr = []
  locationKeys.forEach((key) => {
    const location = getJsonData(key)
    locationArr.push(location)
  })
  return locationArr
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
  listInvLocations
}
