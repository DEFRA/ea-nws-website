const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')
const getSecretKeyValue = require('./SecretsManager')

const client = new S3Client()

const isLogOld = (logFilePath) => {
  try {
    const logEntry = JSON.parse(
      fs.readFileSync(logFilePath, { encoding: 'utf-8' }).split('\n')[0]
    )
    return logEntry.time < Date.now() - 2 * 24 * 60 * 60 * 1000
  } catch (err) {
    return false
  }
}

const uploadToBucket = (filePath, bucketName) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    const params = {
      Bucket: bucketName,
      Key: `Website/${fileName}`,
      Body: fileContent
    }

    const command = new PutObjectCommand(params)
    client
      .send(command)
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

const processLogs = async (directory, bucketName) => {
  const logFiles = [
    'debug.log',
    'error.log',
    'fatal.log',
    'info.log',
    'warn.log'
  ]

  for (const logFile of logFiles) {
    const logFilePath = path.join(directory, logFile)

    if (fs.existsSync(logFilePath) && isLogOld(logFilePath)) {
      const newName = `${path.basename(logFile, '.log')}_${Date.now()}.log`
      const newPath = path.join(directory, newName)

      try {
        fs.renameSync(logFilePath, newPath)
        await uploadToBucket(newPath, bucketName)
        fs.unlinkSync(newPath) // Delete uploaded log file from system (it will be created again by pino)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const scheduledLPMTransfer = async () => {
  const logDirectory = path.join(__dirname, '../../NWS-logs')
  const bucketName = await getSecretKeyValue('nws/aws', 'S3Bucket')

  await processLogs(logDirectory, bucketName)
}

module.exports = {
  scheduledLPMTransfer
}
