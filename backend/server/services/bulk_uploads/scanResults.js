const { S3Client, GetObjectTaggingCommand } = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../SecretsManager')
const { logger } = require('../../plugins/logging')

const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

const getTags = async (fileName, folder) => {
  const client = new S3Client({})
  const bucket = await getSecretKeyValue('nws/aws', 'bulkUploadBucket')
  const params = {
    Bucket: bucket,
    Key: `${folder}/${fileName}`
  }
  const command = new GetObjectTaggingCommand(params)
  const result = {
    data: {
      scanComplete: false,
      scanResult: null
    },
    errorMessage: null
  }

  try {
    const response = await client.send(command)
    const malwareTag = response?.TagSet?.find(
      (tag) => tag.Key === 'GuardDutyMalwareScanStatus'
    )
    if (malwareTag) {
      result.data.scanComplete = true
      result.data.scanResult = malwareTag.Value
    }
  } catch (err) {
    logger.error(err)
    result.errorMessage = [{ errorType: 'S3 error', errorMessage: err }]
  }

  return result
}

const scanResults = async (fileName, folder) => {
  let scanCompleted = false
  let { errorMessage, data } = { errorMessage: null, data: null }
  while (!scanCompleted) {
    const result = await getTags(fileName, folder)
    if (result.errorMessage) {
      scanCompleted = true
      errorMessage = result.errorMessage
    }
    if (result.data) {
      data = result.data
    }
    scanCompleted = data.scanComplete
    if (!scanCompleted) {
      // Wait 1 second before continuing the while loop
      await timer(1000)
    }
  }

  return { errorMessage, data }
}

module.exports = { scanResults }
