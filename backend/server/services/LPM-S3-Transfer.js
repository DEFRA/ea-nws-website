const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')
const getSecretKeyValue = require('./SecretsManager')
const { logger } = require('../plugins/logging')

const client = new S3Client()

// Checks the most recent entry in a file to determine if it is older than 2 day threshold
const isLogOld = (logFilePath) => {
  try {
    const fileStats = fs.statSync(logFilePath)
    const fileCreated = fileStats.mtime.getTime()
    const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000
    return fileCreated < twoDaysAgo
  } catch (err) {
    logger.error(err)
    return false
  }
}

const logCleanUp = async (directory) => {
  const rotatedDir = path.join(directory, 'rotated-logs')

  if (fs.existsSync(rotatedDir)) {
    const files = fs.readdirSync(rotatedDir)

    // Sort files by modification time
    const sortedFiles = files
      .map((file) => ({
        name: file,
        path: path.join(rotatedDir, file),
        time: fs.statSync(path.join(rotatedDir, file)).mtimeMs
      }))
      .sort((a, b) => b.time - a.time)

    const toDelete = sortedFiles.filter((file) => isLogOld(file.path))

    toDelete.forEach((file) => {
      const filePath = path.join(rotatedDir, file.name)
      fs.unlinkSync(filePath)
    })
  }
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
  const rotatedDir = path.join(directory, 'rotated-logs')

  if (!fs.existsSync(rotatedDir)) {
    fs.mkdirSync(rotatedDir)
  }

  for (const logFile of logFiles) {
    const logFilePath = path.join(directory, logFile)

    if (fs.existsSync(logFilePath) && fs.statSync(logFilePath).size !== 0) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const newName = `${path.basename(logFile, '.log')}_${timestamp}.log`
      const newPath = path.join(rotatedDir, newName)

      try {
        fs.renameSync(logFilePath, newPath)
        await uploadToBucket(newPath, bucketName)
        fs.writeFileSync(logFilePath, '')
      } catch (err) {
        logger.error(`Failed to process log file: ${logFile}, ${err}`)
      }
    }
  }
}

const scheduledLPMTransfer = async () => {
  const logDirectory = path.join(__dirname, '../../NWS-logs')
  const bucketName = await getSecretKeyValue('nws/aws', 'S3Bucket')

  await processLogs(logDirectory, bucketName)
  await logCleanUp(logDirectory)
}

module.exports = {
  scheduledLPMTransfer
}
