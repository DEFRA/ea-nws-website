const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const { Upload } = require('@aws-sdk/lib-storage')
const getSecretKeyValue = require('../../services/SecretsManager')
const unzipper = require('unzipper')
const { PassThrough } = require('stream')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/unzip',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { zipFileName } = request.payload
        if (!zipFileName) {
          return h.response({
            status: 500,
            message: 'No zip file provided'
          })
        }
        const zipFileKey = `zip-uploads/${zipFileName}`
        const s3Client = new S3Client()
        const s3BucketName = await getSecretKeyValue(
          'nws/aws',
          'bulkUploadBucket'
        )

        console.log(`Attempting to retrieve ${zipFileKey}`)
        // Retrieve zip file from S3
        const zipFileStream = await s3Client.send(
          new GetObjectCommand({
            Bucket: s3BucketName,
            Key: zipFileKey
          })
        )
        console.log(`Retrieved! zipFileStream: ${zipFileStream}`)

        if (!zipFileStream) {
          console.log(`No zip stream`)
          return h.response({
            status: 500,
            message: 'Zip file could not be retrieved from bucket'
          })
        }

        const outputFolder = `${zipFileKey.replace('.zip', '/')}`
        console.log(`New output folder is ${outputFolder}`)

        await new Promise((resolve, reject) => {
          const entryPromises = []

          // Unzip each file in the zip stream
          zipFileStream.Body.pipe(unzipper.Parse())
            .on('entry', async (entry) => {
              const filePath = `${outputFolder}${entry.path}`
              const uploadStream = new PassThrough()

              // Stream the file back to the bucket, stored in the new subfolder
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

                entryPromises.push(
                  uploadPromise.done().then(() => {
                    console.log(`Uploaded ${filePath} successfully`)
                  })
                )
              } catch (err) {
                console.log(`Error uploading ${filePath}: ${err}`)
              }
            })
            .on('finish', async () => {
              // Wait for all promises to finish before resolving
              await Promise.all(entryPromises)
                .then(() => resolve())
                .catch((error) => reject(error))
            })
            .on('error', (err) => reject(new Error(`Pipeline Error: ${err}`)))
        })

        return h.response({
          status: 200,
          data: 'Files unzipped and uploaded successfully'
        })
      } catch (error) {
        console.log(error)
        return h.response({
          status: 500,
          errorMessage: error
        })
      }
    }
  }
]
