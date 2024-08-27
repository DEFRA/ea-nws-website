// Manage locations urls
const urlManageOrg = '/organisation/manage-locations'
const urlAddLoc = urlManageOrg + '/add'

const orgManageLocationsUrls = {
  // Add location
  add: {
    options: urlAddLoc,
    addressInfo: urlAddLoc + '/address-info',
    uploadFile: urlAddLoc + '/upload-file',
    uploadTemplate: 'http://d39yn09rf1d1o9.cloudfront.net/template.csv'
  }
}

export default orgManageLocationsUrls
