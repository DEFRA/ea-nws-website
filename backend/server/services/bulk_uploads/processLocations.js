const proj4 = require('proj4')

// const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')

// const params = {
//   Bucket: bucketName,
//   Key: `Website/${fileName}`
// }

// const client = new S3Client({});

// export const main = async () => {
//   const command = new GetObjectCommand(params);

//   try {
//     const response = await client.send(command);
//     // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
//     const str = await response.Body.transformToString();
//     console.log(str);
//   } catch (err) {
//     console.error(err);
//   }
// };

const fs = require('node:fs');
const { csvToJson } = require('./csvToJson')

const data = fs.readFileSync('test.csv').toString()

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
//      Keywords: [Array]
//    }] }
var jsonData = csvToJson(data);

// used to store valid and invalid locations
var valid = []
var invalid = []

const locations = jsonData.locations

// if there is location data we need to process it
if (locations) {
    locations.forEach(location => {
        // Location name is mandatory
        if (!location.Location_name) {
            location.error = 'No location name'
            invalid.push(location)
            return
        }
        // Location coords/address is mandatory
        if (location.X_coordinates && location.Y_coordinates) {
            const isValid = validateCoords(location.X_coordinates, location.Y_coordinates)
            if (isValid) {
                // convert coords
                location.coordinates = convertCoords(location.X_coordinates, location.Y_coordinates)
                valid.push(location)
                return 
            } 
        }

        if (location.Full_Address && location.Postcode) {
            // calculate X and Y based on address and postcode
            const coords = getCoords(location.Full_Address, location.Postcode)
            if (coords.length === 0) {
                location.error = 'Unable get coordinates from provided address'
                invalid.push(location)
                return
            } else {
                location.X_coordinates = coords[0]
                location.Y_coordinates = coords[1]
                // convert coords
                location.coordinates = convertCoords(location.X_coordinates, location.Y_coordinates)
                valid.push(location)
                return
            }
        } else {
            location.error = 'Insufficient information for location'
            invalid.push(location)
            return
        }
    })
}

jsonData.locations.forEach(location => {
    console.log(location.Location_name)
    
});

function validateCoords (X, Y) {
    // check is valid
    // TODO nore logic
    if (X.length === 6 && Y.length === 6) {
        return true
    } else {
        return false
    }    
}

function getCoords (address, postcode) {
    // TODO add a lot of logic to validate address/postcode and generate coords
    const coords = []
    if (address && postcode) {
        // get coords
    }
    return coords
}

function convertCoords (X, Y) {
    proj4.defs(
        'EPSG:27700',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
      )
    proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')
    const [longitude, latitude] = proj4('EPSG:27700', 'EPSG:4326', [Number(X), Number(Y)])
    return {latitude: latitude, longitude: longitude}
}

console.log(jsonData)
console.log(valid)
console.log(invalid)