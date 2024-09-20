import AddLocationOptionsPage from '../../pages/manage-locations/add-location/AddLocationOptionsPage'
import ConfirmLocationPage from '../../pages/manage-locations/add-location/manual-add-location/confirm-location/ConfirmLocationPage'
import LocationNamePage from '../../pages/manage-locations/add-location/manual-add-location/name/LocationNamePage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/manual-add-location/optional-address/AddOptionalAddress'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/manual-add-location/optional-address/OptionalLocationInformationPage'
import LocationPostCodeSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationPostCodeSearchPage'
import LocationPostCodeSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationPostCodeSearchResultsPage'
import LocationSearchOptionPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationSearchOptionPage'
import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddAddressInfoPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddUploadFilePage'
import ConfirmAddingLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/confirm-locations/ConfirmAddingLocationsPage'
import DoNotAddLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/find-unmatched-locations/FindUnmatchedLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/ViewLocationsDashboardPage'

const urlManageOrg = '/organisation/manage-locations'
const urlManageOrgUnmatchedLocations =
  '/organisation/manage-locations/unmatched-locations'
const urlManageOrgConfirmLocations = '/organisation/manage-locations/confirm'

// Manage location urls
const orgManageLocationsUrls = {
  view: {
    dashboard: urlManageOrg + '/view-locations'
  },
  add: {
    addLocationWithinBoundaries: {},
    manualAddLocation: {},
    uploadLocationsWithCsv: {},
    addLocationsWithShapefile: {},
    options: urlManageOrg + '/add',
    addressInfo: urlManageOrg + '/add/address-info',
    uploadFile: urlManageOrg + '/add/upload-file',
    name: urlManageOrg + '/add/name',
    searchOption: urlManageOrg + '/add/search-option',
    postCodeSearch: urlManageOrg + '/add/postcode-search',
    postCodeSearchResults: urlManageOrg + '/add/postcode-search-results',
    confirmManualSearchedLocation: urlManageOrg + '/add/location-in-area/:type',
    optionalInfo: urlManageOrg + '/add/optional-location-info',
    optionalAddress: urlManageOrg + '/add/optional-address'
  },
  unmatchedLocations: {
    doNotAdd: urlManageOrgUnmatchedLocations + '/do-not-add',
    findUnmatchedLocations:
      urlManageOrgUnmatchedLocations + '/find-unmatched-locations',
    manuallyfind: urlManageOrgUnmatchedLocations + '/manually-find'
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
    component: <AddLocationOptionsPage />
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
    path: orgManageLocationsUrls.add.name,
    component: <LocationNamePage />
  },
  {
    path: orgManageLocationsUrls.add.searchOption,
    component: <LocationSearchOptionPage />
  },
  {
    path: orgManageLocationsUrls.add.postCodeSearchResults,
    component: <LocationPostCodeSearchResultsPage />
  },

  {
    path: orgManageLocationsUrls.add.confirmManualSearchedLocation,
    component: <ConfirmLocationPage />
  },
  {
    path: orgManageLocationsUrls.add.postCodeSearch,
    component: <LocationPostCodeSearchPage />
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
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind,
    component: <ManuallyFindLocationsPage />
  },
  {
    path: urlManageOrgConfirmLocations,
    component: <ConfirmAddingLocationsPage />
  },
  {
    path: orgManageLocationsUrls.add.optionalInfo,
    component: <OptionalLocationInformationPage />
  },
  {
    path: orgManageLocationsUrls.add.optionalAddress,
    component: <AddOptionalAddress />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
