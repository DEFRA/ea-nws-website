const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const { Upload } = require('@aws-sdk/lib-storage')
const getSecretKeyValue = require('../SecretsManager')
const unzipper = require('unzipper')
const { PassThrough } = require('stream')
const { logger } = require('../../plugins/logging')

const unzipShapefile = async (zipFileName) => {
  try {
    const zipFileKey = `zip-uploads/zip/${zipFileName}`
    const s3Client = new S3Client()
    const s3BucketName = await getSecretKeyValue(
      'nws/aws',
      'bulkUploadBucket'
    )

    // Retrieve zip file from S3
    const zipFileStream = await s3Client.send(
      new GetObjectCommand({
        Bucket: s3BucketName,
        Key: zipFileKey
      })
    )
    if (!zipFileStream) {
      return {
        errorMessage: 'Oops, something happened!'
      }
    }

    // Subfolder to store new files in bucket, named after zip file
    const outputFolder = `zip-uploads/${zipFileName.replace('.zip', '/')}`

    await new Promise((resolve, reject) => {
      const entryPromises = []

      // Unzip each file in the zip stream
      zipFileStream.Body.pipe(unzipper.Parse())
        .on('entry', async (entry) => {
          const filePath = `${outputFolder}${entry.path}`
          const uploadStream = new PassThrough()

          // Stream the file back to the bucket, stored in the subfolder
          try {
            const uploadPromise = new Upload({
              client: s3Client,
              params: {
                Bucket: s3BucketName,
                Key: filePath,
                Body: uploadStream
              }
            })
            entry.pipe(uploadStream)

            entryPromises.push(uploadPromise.done())
          } catch (err) {
            throw new Error(err)
          }
        })
        .on('finish', async () => {
          // Wait for all promises to finish before resolving
          await Promise.all(entryPromises)
            .then(() => resolve())
            .catch((error) => reject(error))
        })
        .on('error', (err) => reject(new Error(err)))
    })

    return {}
  } catch (error) {
    logger.error(error)
    return {
      errorMessage: error.message
    }
  }
}

module.exports = { unzipShapefile }
