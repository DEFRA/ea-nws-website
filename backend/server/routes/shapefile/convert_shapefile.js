const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../../services/SecretsManager')
const shapefile = require('shapefile')
const { Readable } = require('stream')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const convertShapefileToGeoJSON = async (shp, dbf, shx) => {
  try {
    console.log('Converting shapefile components to GeoJSON...')
    console.log(`SHP size: ${shp.length} bytes`)
    console.log(`DBF size: ${dbf.length} bytes`)
    console.log(`SHX size: ${shx.length} bytes`)

    const source = await shapefile.open(
      Readable.from(shp),
      Readable.from(dbf),
      Readable.from(shx)
    )

    const geojson = []
    let result

    while (!(result = await source.read()).done()) {
      geojson.push(result.value)
    }

    return geojson
  } catch (error) {
    console.error('Error processing shapefile components:', error)
    throw new Error('Failed to process shapefile components')
  }
}

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
        const zipFileFolder = `zip-uploads/${zipFileName.replace('.zip', '/')}`
        const baseFileName = zipFileName.replace(/^\d+_/, '') // Remove prepended timestamp

        console.log('BEGIN CONVERSION')

        console.log(`Base file: ${baseFileName}`)
        console.log(`Zip file: ${zipFileName}`)
        console.log(`Zip file path: ${zipFileFolder}`)

        const s3Client = new S3Client()
        const s3BucketName = await getSecretKeyValue(
          'nws/aws',
          'bulkUploadBucket'
        )

        const getFileFromS3 = async (key) => {
          console.log(`Attempting to retrieve ${key} from ${s3BucketName}`)
          const command = new GetObjectCommand({
            Bucket: s3BucketName,
            Key: key
          })
          const { Body } = await s3Client.send(command)

          if (!Body) {
            throw new Error(`Failed to retrieve file from S3: ${key}`)
          }

          // Convert body to buffer
          const chunks = []
          for await (const chunk of Body) {
            chunks.push(chunk)
          }

          const buffer = Buffer.concat(chunks)

          console.log(`${key} size: ${buffer.length} bytes`) // Log size of the buffer
          return buffer
        }

        // DEBUG
        console.log('Expected shapefile names:')
        console.log(`${zipFileFolder}${baseFileName.replace('.zip', '.shp')}`)
        console.log(`${zipFileFolder}${baseFileName.replace('.zip', '.shx')}`)
        console.log(`${zipFileFolder}${baseFileName.replace('.zip', '.dbf')}`)

        // Retrieve shapefile components (.shp, .shx, .dbf)
        const shpFile = await getFileFromS3(
          `${zipFileFolder}${baseFileName.replace('.zip', '.shp')}`
        )
        const shxFile = await getFileFromS3(
          `${zipFileFolder}${baseFileName.replace('.zip', '.shx')}`
        )
        const dbfFile = await getFileFromS3(
          `${zipFileFolder}${baseFileName.replace('.zip', '.dbf')}`
        )

        const geojson = await convertShapefileToGeoJSON(
          shpFile,
          dbfFile,
          shxFile
        )
        console.log(geojson)

        // Return GeoJSON response
        return h.response({
          status: 200,
          data: geojson
        })
      } catch (error) {
        console.error(error)
        return h.response({
          status: 500,
          errorMessage: error.message || error
        })
      }
    }
  }
]
