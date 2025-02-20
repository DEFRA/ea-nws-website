const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../SecretsManager')
const { logger } = require('../../plugins/logging')

const convertShapefile = async (zipFileName) => {
  try {
    const zipFilePath = `zip-uploads/zip/${zipFileName}`

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
        throw new Error('Failed to process file')
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

    return {
      data: geojson
    }
  } catch (error) {
    logger.error(error)
    return {
      errorMessage: error.message || 'An unexpected error occurred'
    }
  }
}

module.exports = { convertShapefile }
