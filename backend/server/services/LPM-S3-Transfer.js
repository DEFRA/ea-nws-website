const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')

const client = new S3Client()
const logDirectory = path.join(__dirname, '../../NWS-logs')
const bucketName = 'ean-951' // This will only work if the machine's aws credentials give access to the int-lpm-bucket in integration environment
const bucketFolder = 'Website/'

// Function to read file and upload contents to S3 bucket
const uploadToBucket = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath)
    const fileContent = fs.readFileSync(filePath)

    const params = {
      Bucket: bucketName,
      Key: `${bucketFolder}${fileName}`,
      Body: fileContent
    }

    const command = new PutObjectCommand(params)
    client
      .send(command)
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

// Function to process relevant logs in the given directory
const processLogs = async (directory) => {
  const logFiles = [
    'debug.log',
    'error.log',
    'fatal.log',
    'info.log',
    'warn.log'
  ]

  for (const logFile of logFiles) {
    // Grab current log file path
    const logFilePath = path.join(directory, logFile)

    // For each existing log file, rename with a timestamp to upload to bucket
    // pino should appropriately handle this by creating a new log file when it next logs a message
    if (fs.existsSync(logFilePath)) {
      // Form new name/path with timestamp
      const epochTimeStamp = Date.now()
      const newName = `${path.basename(logFile, '.log')}_${epochTimeStamp}.log`
      const newPath = path.join(directory, newName)

      // Rename log file with timestamp
      fs.renameSync(logFilePath, newPath)

      try {
        // Upload log file to S3 bucket
        await uploadToBucket(newPath) // Can add error handling depending on whether promise is fulfilled/rejected

        // Delete log file from system (it will be created again)
        fs.unlinkSync(newPath)
      } catch (err) {
        // If promise is rejected, then upload failed
        console.log(err)
      }
    }
  }
}

const scheduledLPMTransfer = async () => {
  await processLogs(logDirectory)
}

module.exports = {
  scheduledLPMTransfer
}
