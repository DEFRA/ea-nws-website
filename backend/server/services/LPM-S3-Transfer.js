const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')

const client = new S3Client()
const logDirectory = path.join(__dirname, '../../NWS-logs')
const bucketName = 'ean-951' // This will only work if the machine's aws credentials give access to the int-lpm-bucket in integration environment
const bucketFolder = 'Website/'

// Function to determine whether log data is older than the 2 day threshold
const isLogOld = (logFilePath) => {
  try {
    // Read first entry to determine log date
    const logEntry = JSON.parse(
      fs.readFileSync(logFilePath, { encoding: 'utf-8' }).split('\n')[0]
    )
    return logEntry.time < Date.now() - 2 * 24 * 60 * 60 * 1000
  } catch (err) {
    // Return false if error while reading log file (most likely empty)
    return false
  }
}

// Function to read file and upload contents to S3 bucket
const uploadToBucket = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

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

  // Loop through logs and upload any that have 2 day old data
  for (const logFile of logFiles) {
    const logFilePath = path.join(directory, logFile)

    if (fs.existsSync(logFilePath) && isLogOld(logFilePath)) {
      // Form new file name/path with timestamp
      const epochTimeStamp = Date.now()
      const newName = `${path.basename(logFile, '.log')}_${epochTimeStamp}.log`
      const newPath = path.join(directory, newName)

      try {
        // Rename log file with timestamp
        fs.renameSync(logFilePath, newPath)

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

scheduledLPMTransfer()

module.exports = {
  scheduledLPMTransfer
}
