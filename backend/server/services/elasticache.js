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

module.exports = {
  setJsonData,
  getJsonData,
  deleteJsonData,
  searchLocations
}
