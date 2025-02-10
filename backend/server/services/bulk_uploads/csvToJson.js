const template = require('./template')

function splitLines (text) {
  return text.split('\n')
}

function splitLine (line) {
  let lineArr = line.match(/((".*?"|[^",]+)(?=\s*,|\s*$))|(^,|(,(?=,))|,$)/g)
  lineArr = lineArr.map(element => element.replace(/^,$|^\s+$|["]+/g, ''))
  return lineArr
}

const getErrors = (result) => {
  const errors = []

  const duplicates = () => {
    const nameReduce = result.reduce((prev, curr) => {
      const found = prev.find((location) => location.Location_name === curr.Location_name)
      if (found) {
        found.Line_number = found.Line_number + ', ' + curr.Line_number
        found.count++
        return prev
      }
      prev.push({ Location_name: curr.Location_name, Line_number: curr.Line_number, count: 1 })
      return prev
    }, [])
    const duplicates = nameReduce.filter((location) => { return location.count !== 1 })
    return Array.from(duplicates, (duplicate) => duplicate.Line_number)
  }

  const missingLocationDetails = () => {
    const missingLocationDetails = []
    result.forEach((location) => {
      if (!(location.X_coordinates && location.Y_coordinates) && !((location.Full_address && location.Postcode))) {
        missingLocationDetails.push(location.Line_number)
      }
    })
    return missingLocationDetails
  }

  const missingLocationName = () => {
    const missingLocationName = []
    result.forEach((location) => {
      if (!location.Location_name) {
        missingLocationName.push(location.Line_number)
      }
    })
    return missingLocationName
  }

  const duplicatesArr = duplicates()
  const missingLocationDetailsArr = missingLocationDetails()
  const missingLocationNameArr = missingLocationName()

  if (duplicatesArr.length > 0) {
    errors.push({
      errorType: 'Duplicates',
      errorMessage: 'The selected file could not be uploaded because there are duplicate location names',
      errorDetails: duplicatesArr
    })
  }
  if (missingLocationDetailsArr.length > 0) {
    errors.push({
      errorType: 'Missing location details',
      errorMessage: 'The selected file could not be uploaded because all locations need to include either a full address and postcode or X and Y coordinates',
      errorDetails: missingLocationDetailsArr
    })
  }
  if (missingLocationNameArr.length > 0) {
    errors.push({
      errorType: 'Missing location name',
      errorMessage: 'The selected file could not be uploaded because some location names are missing',
      errorDetails: missingLocationNameArr
    })
  }

  return errors
}

const csvToJson = (csv) => {
  let lines = splitLines(csv)
  // filter array to remove any empty items cased by no data on the last line(s) of the csv
  lines = lines.filter(element => element)
  // Check the headers match the template
  if (lines[0] !== template) {
    return {
      error: [{
        errorType: 'incorrect template',
        errorMessage: 'The selected file could not be uploaded because it is not the correct template'
      }]
    }
  }
  // Get all the headers and format them
  const formattedHeaders = lines[0].replaceAll(' ', '_')
  const headers = splitLine(formattedHeaders)

  const result = []

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const keywords = []
    const currentLine = splitLine(lines[i])

    for (let j = 0; j < headers.length; j++) {
      // put all keywords in an array with a single key
      if (headers[j].toLowerCase().includes('keyword')) {
        keywords.push(currentLine[j])
      } else {
        obj[headers[j]] = currentLine[j]
      }
    }

    const keywordHeader = 'Keywords'
    // add the keywords to the object
    obj[keywordHeader] = keywords
    obj.Line_number = i + 1

    result.push(obj)
  }

  const errors = getErrors(result)

  if (errors.length > 0) {
    return { error: errors }
  } else {
    return { locations: result }
  }
}

module.exports = { csvToJson }
