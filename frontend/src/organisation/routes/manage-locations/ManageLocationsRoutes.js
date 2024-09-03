import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/LocationAddAddressInfoPage'
import LocationAddPage from '../../pages/manage-locations/add-location/LocationAddPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/LocationAddUploadFilePage'
import DoNotAddLocationsPage from '../../pages/manage-locations/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/unmatched-locations/find-unmatched-locations/FindUnmatchedLocationsPage'
import ConfirmLocationsPage from '../../pages/manage-locations/confirm-locations/ConfirmAddingLocationsPage'

const urlManageOrg = '/organisation/manage-locations'
const urlAddLoc = urlManageOrg + '/add'
const urlManageOrgUnmatchedLocations = '/organisation/manage-locations/unmatched-locations'
const urlManageOrgConfirmLocations = '/organisation/manage-locations/confirm'

// Manage location urls
const orgManageLocationsUrls = {
  add: {
    options: urlAddLoc,
    addressInfo: urlAddLoc + '/address-info',
    uploadFile: urlAddLoc + '/upload-file'
  },

  unmatchedLocations: {
    doNotAdd: urlManageOrgUnmatchedLocations + '/do-not-add',
    findUnmatchedLocations: urlManageOrgUnmatchedLocations + '/find-unmatched-locations'
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
  },
  {
    path: orgManageLocationsUrls.add.uploadFile,
    component: <LocationAddUploadFilePage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.doNotAdd,
    component: <DoNotAddLocationsPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.findUnmatchedLocations,
    component: <FindUnmatchedLocationsPage />
  },
  {
    path: urlManageOrgConfirmLocations,
    component: <ConfirmLocationsPage />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
