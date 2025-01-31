const { csvToJson } = require('./csvToJson')
const { validateLocations } = require('./validateLocations')
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../SecretsManager')
const { logger } = require('../../plugins/logging')

const convertToPois = (locations) => {
  const pois = []
  locations.forEach((location) => {
    const poi = {
      name: null,
      address: location.address,
      coordinates: location.coordinates,
      geometry: null,
      geocode: null,
      additionals: [
        { id: 'locationName', value: { s: location.Location_name } },
        { id: 'parentID', value: { s: '' } },
        { id: 'targetAreas', value: { s: '' } },
        { id: 'keywords', value: { s: JSON.stringify(location.Keywords) } },
        {
          id: 'other',
          value: {
            s: JSON.stringify(
              {
                full_address: location.Full_address,
                postcode: location.Postcode,
                x_coordinate: location.X_coordinates,
                y_coordinate: location.Y_coordinates,
                internal_reference: location.Internal_reference,
                business_criticality: location.Business_criticality,
                location_type: location.Location_type,
                action_plan: location.Action_plan,
                notes: location.Notes,
                location_data_type: 'xycoords',
                alertTypes: []
              }
            )
          }
        }
      ]
    }
    if (location.error) {
      poi.error = location.error
    }
    pois.push(poi)
  })

  return pois
}

const getCSV = async (fileName) => {
  const client = new S3Client({})
  const bucket = await getSecretKeyValue('nws/aws', 'bulkUploadBucket')
  const params = {
    Bucket: bucket,
    Key: `csv-uploads/${fileName}`
  }
  const command = new GetObjectCommand(params)
  let data = []
  const result = {
    errorMessage: null,
    data: null
  }

  try {
    const response = await client.send(command)
    data = await response.Body.transformToString()
    result.data = data
  } catch (err) {
    logger.error(err)
    result.errorMessage = [{ errorType: 'S3 error', errorMessage: err }]
  }

  return result
}

const processLocations = async (fileName) => {
  const { errorMessage, data } = await getCSV(fileName)
  if (!errorMessage) {
    // convert the CSV to JSON
    // The json is in the below format:
    // { locations : [{
    //      Location_name: 'Location name',
    //      Full_address: 'Full address',
    //      Postcode: 'Postcode',
    //      X_coordinates: 'X coordinates',
    //      Y_coordinates: 'Y coordinates',
    //      Internal_reference: 'Internal reference',
    //      Business_criticality: 'Business criticality',
    //      Location_type: 'Location type',
    //      Action_plan: 'Action plan',
    //      Notes: 'Notes',
    //      Keywords: [Array],
    //      Line_n
    const jsonData = csvToJson(data)
    if (jsonData.error) {
      return { errorMessage: jsonData.error }
    } else {
      const locations = await validateLocations(jsonData.locations)
      return { data: locations }
    }
  } else {
    return { errorMessage: errorMessage }
  }
}

module.exports = { convertToPois, processLocations }
