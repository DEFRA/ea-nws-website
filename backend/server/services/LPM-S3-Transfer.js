const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')
const getSecretKeyValue = require('./SecretsManager')

const client = new S3Client()

// Returns whether the log data is older than the 2 day threshold
const isLogOld = (logFilePath) => {
  try {
    const lastLogEntry = JSON.parse(
      fs.readFileSync(logFilePath, 'utf-8').trim().split('\n').pop()
    )
    return lastLogEntry.time < Date.now() - 2 * 24 * 60 * 60 * 1000
  } catch (err) {
    return false
  }
}

const logCleanUp = async (directory, excludedFiles) => {
  const savedLogs = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.log') && !excludedFiles.includes(file))

  console.log(savedLogs)
  savedLogs.forEach((log) => {
    const logFilePath = path.join(directory, log)
    console.log(`Processing - ${logFilePath}`)
    if (isLogOld(logFilePath)) {
      fs.unlinkSync(logFilePath)
    }
  })
}

const uploadToBucket = async (filePath, bucketName) => {
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
  const logFiles = ['error.log', 'fatal.log', 'info.log', 'warn.log']

  await logCleanUp(directory, logFiles)

  for (const logFile of logFiles) {
    const logFilePath = path.join(directory, logFile)

    if (fs.existsSync(logFilePath) && fs.statSync(logFilePath).size !== 0) {
      const newName = `${path.basename(logFile, '.log')}_${Date.now()}.log`
      const newPath = path.join(directory, newName)

      try {
        fs.renameSync(logFilePath, newPath)
        await uploadToBucket(newPath, bucketName)
        fs.openSync(logFilePath, 'w')
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

scheduledLPMTransfer()

module.exports = {
  scheduledLPMTransfer
}
