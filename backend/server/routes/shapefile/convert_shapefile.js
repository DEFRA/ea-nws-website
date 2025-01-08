const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../../services/SecretsManager')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/convert',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { zipFileName } = request.payload
        const zipFilePath = `zip-uploads/${zipFileName}`

        const s3Client = new S3Client()
        const s3BucketName = await getSecretKeyValue(
          'nws/aws',
          'bulkUploadBucket'
        )

        // Retrieve file from S3 and convert it to a buffer
        const getFileFromS3 = async (key) => {
          const command = new GetObjectCommand({
            Bucket: s3BucketName,
            Key: key
          })
          const { Body } = await s3Client.send(command)

          if (!Body) {
            throw new Error(`Failed to retrieve file from S3: ${key}`)
          }

          const chunks = []
          for await (const chunk of Body) {
            chunks.push(chunk)
          }

          return Buffer.concat(chunks)
        }

        const shapefileBuffer = await getFileFromS3(zipFilePath)

        // Convert Buffer to ArrayBuffer for shpjs library
        const shapefileArrayBuffer = shapefileBuffer.buffer.slice(
          shapefileBuffer.byteOffset,
          shapefileBuffer.byteOffset + shapefileBuffer.byteLength
        )

        const { parseZip } = await import('shpjs')
        const geojson = await parseZip(shapefileArrayBuffer)

        if (!geojson) {
          throw new Error('Could not read shapefile')
        }

        return h.response({
          status: 200,
          data: geojson
        })
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: error.message || 'An unexpected error occurred'
        })
      }
    }
  }
]
