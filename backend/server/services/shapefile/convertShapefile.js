const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../SecretsManager')
const { logger } = require('../../plugins/logging')
const turf = require('@turf/turf')

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

    if (!geojson || !geojson.features) {
      throw new Error('Could not read shapefile')
    }

    // Buffer any LineString / MultiLineString into a thin polygon (5m total width)
    const bufferedFeatures = geojson.features.map((f) => {
      if (['LineString', 'MultiLineString'].includes(f.geometry.type)) {
        return turf.buffer(f, 0.005, { units: 'kilometers' })
      }
      return f
    })

    const processed = {
      type: 'FeatureCollection',
      features: bufferedFeatures,
      fileName: geojson.fileName
    }

    return {
      data: processed
    }
  } catch (error) {
    logger.error(error)
    return {
      errorMessage: error.message || 'An unexpected error occurred'
    }
  }
}

module.exports = { convertShapefile }
