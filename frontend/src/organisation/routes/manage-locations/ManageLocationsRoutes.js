import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/LocationAddAddressInfoPage'
import LocationAddPage from '../../pages/manage-locations/add-location/LocationAddPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/LocationAddUploadFilePage'
import ConfirmLocationsPage from '../../pages/manage-locations/confirm-locations/ConfirmAddingLocationsPage'
import DoNotAddLocationsPage from '../../pages/manage-locations/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/unmatched-locations/find-unmatched-locations/FindUnmatchedLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
import ProvideAreaNamePage from '../../pages/manage-locations/unmatched-locations/manually-find-locations/find-location-on-map/ProvideAreaNamePage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/ViewLocationsDashboardPage'

const urlManageOrg = '/organisation/manage-locations'
const UnmatchedLocations = urlManageOrg + '/unmatched-locations'
const ConfirmLocations = urlManageOrg + '/confirm'

// Manage location urls
const orgManageLocationsUrls = {
  view: {
    dashboard: urlManageOrg + '/view-locations'
  },
  add: {
    options: urlManageOrg + '/add',
    addressInfo: urlManageOrg + '/add/address-info',
    uploadFile: urlManageOrg + '/add/upload-file'
  },
  unmatchedLocations: {
    doNotAdd: UnmatchedLocations + '/do-not-add',
    findUnmatchedLocations: UnmatchedLocations + '/find-unmatched-locations',
    manuallyfind: {
      index: UnmatchedLocations + '/manually-find',
      areaName: UnmatchedLocations + '/manually-find/area-name',
      map: UnmatchedLocations + '/manually-find/map'
    }
  }
}

// Manage location routes
const orgManageLocationRoutes = [
  {
    path: orgManageLocationsUrls.view.dashboard,
    component: <ViewLocationsDashboardPage />
  },
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
    path: orgManageLocationsUrls.unmatchedLocations.doNotAdd,
    component: <DoNotAddLocationsPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.findUnmatchedLocations,
    component: <FindUnmatchedLocationsPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind.index,
    component: <ManuallyFindLocationsPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind.areaName,
    component: <ProvideAreaNamePage />
  },
  {
    path: ConfirmLocations,
    component: <ConfirmLocationsPage />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
