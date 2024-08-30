const redis = require ('redis');

// TODO: store the endpoint in secrets manager
const redisEndpoint = 'ea-nws-website-pvm2vc.serverless.euw2.cache.amazonaws.com:6379'

const connectToRedis = async (url) => {
    // Create the client
    const client = redis.createClient({url: 'rediss://'+url})
    client.on('error', err => console.log('Redis Client Error', err))
    // Connect to the redis elasticache
    await client.connect();
    return client;
}

const setJsonData = async (key, json) => {
    const client = await connectToRedis(redisEndpoint)
    // send the data 
    await client.json.set(key, '$', json)
    // disconnect as we don't need the connection open anymore
    await client.disconnect();
}

const getJsonData = async (key, paths) => {
    const client = await connectToRedis(redisEndpoint)
    let result
    if (paths) {
        const formattedPaths = {path: paths}
        result = await client.json.get(key, formattedPaths)
    } else {
        result = await client.json.get(key)
    }
    await client.disconnect();
    return result
}

const deleteJsonData = async (key) => {
    const client = await connectToRedis(redisEndpoint)
    // delete the data 
    await client.json.del(key)
    // disconnect as we don't need the connection open anymore
    await client.disconnect();
}

const testFunction = async () => {

    await setJsonData('user1', {profile: 'something'})
    const fullJson = await getJsonData('user1')
    const partialJson = await getJsonData('user1', ['.profile'])
    console.log(fullJson)
    console.log(partialJson)
    await deleteJsonData('user1')
    const newJson = await getJsonData('user1')
    console.log(newJson)
    
}

testFunction()