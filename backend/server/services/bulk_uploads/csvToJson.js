const fs = require('node:fs');

function splitLines(text) {
  return text.split('\n')
}

function splitLine(line) {
  var lineArr = line.match(/((".*?"|[^",]+)(?=\s*,|\s*$))|(^,|(,(?=,))|,$)/g);
  lineArr = lineArr.map(element => element.replace(/^,$|["]+/g, ''))
  return lineArr;
}

const csvToJson = (csv) => {
  const templateHeader = fs.readFileSync('template.csv').toString()
  var lines = splitLines(csv)
  //filter array to remove any empty items cased by no data on the last line(s) of the csv
  lines = lines.filter(element => element)
  // Check the headers match the template
  if (lines[0] != templateHeader) {
    return {error: 'Headers do not match!'}
  }
  // Get all the headers and format them
  var formattedHeaders = lines[0].replaceAll(' ', '_')
  var headers = splitLine(formattedHeaders)

  var result = []

  for (var i = 1; i < lines.length; i++ ) {
    var obj = {};
    var keywords = []
    var currentLine = splitLine(lines[i]);

    for (var j = 0; j < headers.length; j++) {
      // put all keywords in an array with a single key
      if (headers[j].toLowerCase().includes('keyword')) {
        keywords.push(currentLine[j])
      } else {
        obj[headers[j]] = currentLine[j]
      }
    }

    const keywordHeader = 'Keywords';
    // add the keywords to the object
    obj[keywordHeader] = keywords
    obj.line_Number = i+1

    result.push(obj);
  }

  var duplicate = new Set();
  const hasDuplicates = result.some(location => duplicate.size === duplicate.add(location.Location_name).size)

  if (hasDuplicates) {
    return {error: 'Duplicates'}
  } else {
    return {locations: result};
  }
}

module.exports = {csvToJson}