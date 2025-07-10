const { addressFormatter } = require('./formatters/AddressFormatter')
const { locationNameFormatter } = require('./formatters/LocationNameFormatter')
const getSecretKeyValue = require('../services/SecretsManager')
const proj4 = require('proj4')
const axios = require('axios')
const { logger } = require('../plugins/logging')
const {
  createGenericErrorResponse
} = require('../services/GenericErrorResponse')

const osPostCodeApiCall = async (postCode) => {
  let responseData
  const osApiKey = await getSecretKeyValue('nws/os', 'apiKey')

  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=${osApiKey}&output_srs=EPSG:4326`

  try {
    const response = await axios.get(url)

    // Handle "NOT_REAL" case - OS API returned no matches at all
    if (!response.data.results || response.data.results.length === 0) {
      return {
        status: 400,
        errorMessage: 'Enter a real postcode'
      }
    }

    // Check that postcode is in England
    if (response.data.results?.[0].DPA.COUNTRY_CODE === 'E') {
      responseData = response.data.results.map((result) => {
        const formattedAddress = addressFormatter(result.DPA.ADDRESS)
        return {
          name: result.DPA.UPRN,
          address: formattedAddress,
          coordinates: { latitude: result.DPA.LAT, longitude: result.DPA.LNG },
          postcode: result.DPA.POSTCODE
        }
      })

      return { status: response.status, data: responseData }
    } else {
      // NOT_IN_ENGLAND case
      return {
        status: 500,
        errorMessage: 'Enter a full postcode in England'
      }
    }
  } catch (error) {
    logger.error(error)

    if (error.response) {
      if (error.response.status === 400) {
        // INCORRECT_FORMAT case
        return {
          status: 400,
          errorMessage: 'Enter a postcode in the correct format, like KT3 3QQ'
        }
      }
    } else {
      return {
        status: 500,
        errorMessage: 'An unknown error has occured'
      }
    }
  }
}

const osFindNameApiCall = async (name, filters, loop) => {
  const fetchOnce = async (url) => {
    try {
      return await axios.get(url)
    } catch (err) {
      if (err.response?.status === 500) {
        // Retry on first 500 call to mask any error
        return await axios.get(url)
      }
      console.log(err)
      throw err
    }
  }

  let responseData = []
  // remove special characters from name
  const formattedName = name.replace('&', '%26').replace(/[^a-zA-Z0-9 ]/g, '')
  const osApiKey = await getSecretKeyValue('nws/os', 'apiKey')
  let url = `https://api.os.co.uk/search/names/v1/find?query=${formattedName}&key=${osApiKey}`
  if (filters !== null) {
    let filterStr = ''
    filters.forEach((filter) => {
      filterStr += 'LOCAL_TYPE:' + filter + ' '
    })
    url = `https://api.os.uk/search/names/v1/find?query=${formattedName}&fq=${filterStr}&key=${osApiKey}`
  }

  proj4.defs(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
  )
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')

  const convertCoordinates = (x, y) => {
    const [longitude, latitude] = proj4('EPSG:27700', 'EPSG:4326', [x, y])
    return { latitude, longitude }
  }

  try {
    let results = []
    let response = await fetchOnce(url)
    results.push(...response.data.results)

    const pageSize = 100
    const totalResults = response.data.header.totalresults
    const totalPages = Math.ceil(totalResults / pageSize)

    // we must filter through all results returned since OS api only returns first 100
    if (loop && totalPages > 1) {
      // Pages are 1-based i.e. page 1 has already been fetched
      for (let page = 2; page <= totalPages; page++) {
        const offset = (page - 1) * pageSize
        const pagedUrl = `${url}&offset=${offset}`

        try {
          const pageResponse = await fetchOnce(pagedUrl)
          if (!pageResponse.data.results.length) break // No results mean we've reached the end before expected
          results.push(...pageResponse.data.results)
        } catch (err) {
          logger.error(`Pagination failed at offset ${offset}: ${err}`)
          break
        }
      }
    }

    if (results.length === 0) {
      return {
        status: 500,
        errorMessage: 'Enter a town or place name'
      }
    } else {
      responseData.push(
        ...results
          .filter((result) => {
            // filter out any non english locations
            return (
              result.GAZETTEER_ENTRY.COUNTRY === 'England' &&
              result.GAZETTEER_ENTRY.NAME1.replace(/[^a-zA-Z0-9 ]/g, '')
                .toLowerCase()
                .includes(formattedName.toLowerCase())
            )
          })
          .map((result) => {
            const formattedLocationName = locationNameFormatter(
              result.GAZETTEER_ENTRY
            )
            const coordinates = convertCoordinates(
              result.GAZETTEER_ENTRY.GEOMETRY_X,
              result.GAZETTEER_ENTRY.GEOMETRY_Y
            )

            return {
              name: '',
              address: formattedLocationName,
              coordinates: coordinates
            }
          })
      )

      // only scottish results were returned
      if (responseData.length === 0) {
        return {
          status: 500,
          errorMessage: 'Enter a town or place name'
        }
      }

      return { status: response.status, data: responseData }
    }
  } catch (error) {
    logger.error(error)
    throw error
  }
}

const osFindApiCall = async (address, minmatch) => {
  let responseData
  const formattedAddress = address.replace('&', '%26')
  const osApiKey = await getSecretKeyValue('nws/os', 'apiKey')
  const url = `https://api.os.uk/search/places/v1/find?query=${formattedAddress}&minmatch=${minmatch}&key=${osApiKey}`

  proj4.defs(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
  )
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')

  const convertCoordinates = (x, y) => {
    const [longitude, latitude] = proj4('EPSG:27700', 'EPSG:4326', [x, y])
    return { latitude, longitude }
  }

  try {
    const response = await axios.get(url)

    // Check that postcode is in England
    if (response.data.results?.[0].DPA.COUNTRY_CODE === 'E') {
      responseData = response.data.results.map((result) => {
        const formattedAddress = addressFormatter(result.DPA.ADDRESS)
        const coordinates = convertCoordinates(
          result.DPA.X_COORDINATE,
          result.DPA.Y_COORDINATE
        )
        return {
          name: result.DPA.UPRN,
          address: formattedAddress,
          coordinates: coordinates,
          postcode: result.DPA.POSTCODE,
          inEngland: true
        }
      })
      return { status: response.status, data: responseData }
    } else {
      // Check if postcode is not in England
      if (
        response.data.results &&
        response.data.results?.[0].DPA.COUNTRY_CODE !== 'E'
      ) {
        responseData = response.data.results.map((result) => {
          const coordinates = convertCoordinates(
            result.DPA.X_COORDINATE,
            result.DPA.Y_COORDINATE
          )
          return {
            coordinates: coordinates,
            inEngland: false
          }
        })
        return { status: response.status, data: responseData }
      } else {
        return {
          status: 500,
          errorMessage: 'No matches found'
        }
      }
    }
  } catch (error) {
    logger.error(error)
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

const osOAuth2ApiCall = async () => {
  const osApiKey = await getSecretKeyValue('nws/os', 'apiKey')
  const osApiSecret = await getSecretKeyValue('nws/os', 'apiSecret')
  const url = 'https://api.os.uk/oauth2/token/v1'

  const btoa = (str) => Buffer.from(str).toString('base64')
  const encodedCredentials = btoa(`${osApiKey}:${osApiSecret}`)

  try {
    const response = await axios.post(
      url,
      new URLSearchParams({
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    return { status: 200, data: response.data }
  } catch (error) {
    logger.error(error)
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

module.exports = {
  osPostCodeApiCall,
  osFindNameApiCall,
  osOAuth2ApiCall,
  osFindApiCall
}
