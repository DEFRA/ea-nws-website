// Manage locations urls
const urlManageOrg = '/organisation/manage-locations'
const urlAddLoc = urlManageOrg + '/add'

const orgManageLocationsUrls = {
  // Add location
  add: {
    options: urlAddLoc,
    addressInfo: urlAddLoc + '/address-info',
    uploadFile: urlAddLoc + '/upload-file'
  }
}

export default orgManageLocationsUrls
