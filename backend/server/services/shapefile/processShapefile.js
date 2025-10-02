const { convertShapefile } = require('./convertShapefile')
const { unzipShapefile } = require('./unzipShapefile')
const { validateShapefile } = require('./validateShapefile')

const processShapefile = async (zipFileName) => {
  // Unzip the uploaded file and send output back to S3
  const { errorMessage } = await unzipShapefile(zipFileName)
  if (errorMessage) {
    return { errorMessage: [{ errorType: 'S3 error', errorMessage: 'Error uploading file' }] }
  } else {
    // Validate the files contained within the zip
    const { errorMessage } = await validateShapefile(zipFileName)
    if (errorMessage) {
      return { errorMessage: errorMessage }
    } else {
      const { data: geojsonData, errorMessage } = await convertShapefile(zipFileName)
      if (errorMessage) {
        return { errorMessage: [{ errorType: 'generic', errorMessage: errorMessage }] }
      } else {
        return { data: geojsonData }
      }
    }
  }
}

module.exports = { processShapefile }
