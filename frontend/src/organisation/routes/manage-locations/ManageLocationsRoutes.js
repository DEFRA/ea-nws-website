import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/LocationAddAddressInfoPage'
import LocationAddPage from '../../pages/manage-locations/add-location/LocationAddPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/LocationAddUploadFilePage'

const urlManageOrg = '/organisation/manage-locations'
const urlAddLoc = urlManageOrg + '/add'

// Manage location urls
const orgManageLocationsUrls = {
  add: {
    options: urlAddLoc,
    addressInfo: urlAddLoc + '/address-info',
    uploadFile: urlAddLoc + '/upload-file'
  }
}

// Manage location routes
const orgManageLocationRoutes = [
  {
    path: orgManageLocationsUrls.add.options,
    component: <LocationAddPage />
  },
  {
    path: orgManageLocationsUrls.add.addressInfo,
    component: <LocationAddAddressInfoPage />
  },
  {
    path: orgManageLocationsUrls.add.uploadFile,
    component: <LocationAddUploadFilePage />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
