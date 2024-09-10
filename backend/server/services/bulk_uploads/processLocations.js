const { csvToJson } = require('./csvToJson')
const { validateLocations } = require('./validateLocations')
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')

const params = {
    Bucket: 'paul.chester',
    Key: 'test.csv'
  }

const client = new S3Client({});

const convertToPois = (locations) => {
    let pois = []
    locations.forEach(location => {
        var poi = {
            name: location.Location_name,
            address: location.address,
            coordinates: location.coordinates,
            alert_categories: null,
            meta_data: {
                location_additional: {
                    full_address: location.Full_address,
                    postcode: location.Postcode,
                    x_coordinate: location.X_coordinates,
                    y_coordinate: location.Y_coordinates,
                    internal_reference: location.Internal_reference,
                    business_criticality: location.Business_criticality,
                    location_type: location.Location_type,
                    action_plan: location.Action_plan,
                    notes: location.Notes,
                    keywords: location.Keywords
                }
            }
        }
        pois.push(poi)
    })

    return pois
}

const getCSV = async () => {

    const command = new GetObjectCommand(params);
    let data = []
    let result = {
        errorMessage: null,
        data: null
    }

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    data = await response.Body.transformToString();
    result.data = data
  } catch (err) {
    result.errorMessage = err
  }

  return result

}

const prcoessLocations = async () => {
    const {errorMessage, data} = await getCSV()

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
    //      line_number: 1
    //    }] }
    if (!errorMessage) {
    var jsonData = csvToJson(data);
    if (jsonData.error) {
        console.log('Error: '+jsonData.error)
    } else {
        const locations = await validateLocations(jsonData.locations)
        console.log(locations)
        // Convert to POI object to add to thr profile
        const pois = convertToPois(locations.valid)
        console.log(pois)
        // Update profile with new POIs (in elasticache)
        // function here
        // store invalid in elasticache (create a new key {authtoken}.invalidLocations) to be used later
        // function here
    }
} else {
    console.log(errorMessage)
}
}

// Used for testing
(async () => {
await prcoessLocations()
})()