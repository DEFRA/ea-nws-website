import AddLocationOptionsPage from '../../pages/manage-locations/add-location/AddLocationOptionsPage'
import ConfirmLocationPage from '../../pages/manage-locations/add-location/manual-add-location/confirm-location/ConfirmLocationPage'
import LocationNamePage from '../../pages/manage-locations/add-location/manual-add-location/name/LocationNamePage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/manual-add-location/optional-address/AddOptionalAddress'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/manual-add-location/optional-address/OptionalLocationInformationPage'
import LocationSearchOptionPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationSearchOptionPage'
import LocationPostCodeSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchPage'
import LocationPostCodeSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchResultsPage'
import LocationXYCoordinatesSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/LocationXYCoordinatesSearchPage'
import XYCoordinatesNotInEnglandPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/XYCoordinatesNotInEnglandPage'
import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddAddressInfoPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddUploadFilePage'
import ConfirmAddingLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/confirm-locations/ConfirmAddingLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/FindUnmatchedLocationsPage'
import DoNotAddLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
import NotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/NotInEnglandPage'
import ProvideAreaNamePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/ProvideAreaNamePage'
import SelectOnMapPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/SelectOnMapPage'
import EditLocationOptionsPage from '../../pages/manage-locations/edit-location/EditLocationOptionsPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/ViewLocationsDashboardPage'

const urlManageOrg = '/organisation/manage-locations'
const urlManageOrgUnmatchedLocations = urlManageOrg + '/unmatched-locations'
const urlManageOrgConfirmLocations = urlManageOrg + '/confirm'

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
    xyCoordinatesSearch: urlManageOrg + '/add/xy-coordinates-search',
    xyCoordinatesNotInEngland:
      urlManageOrg + '/add/xy-coordinates-not-in-england',
    confirmManualSearchedLocation:
      urlManageOrg + '/add/location-in-area/:flow/:type',
    optionalInfo: urlManageOrg + '/add/optional-location-info',
    optionalAddress: urlManageOrg + '/add/optional-address'
  },
  unmatchedLocations: {
    index: urlManageOrgUnmatchedLocations,
    doNotAdd: urlManageOrgUnmatchedLocations + '/do-not-add',
    manuallyfind: {
      index: urlManageOrgUnmatchedLocations + '/manually-find',
      areaName: urlManageOrgUnmatchedLocations + '/manually-find/area-name',
      map: urlManageOrgUnmatchedLocations + '/manually-find/map',
      notInEngland:
        urlManageOrgUnmatchedLocations + '/manually-find/not-in-england'
    }
  },
  edit: {
    options: urlManageOrg + '/edit/location-options'
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
    path: orgManageLocationsUrls.add.xyCoordinatesSearch,
    component: <LocationXYCoordinatesSearchPage />
  },
  {
    path: orgManageLocationsUrls.add.xyCoordinatesNotInEngland,
    component: <XYCoordinatesNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.doNotAdd,
    component: <DoNotAddLocationsPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.index,
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
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind.map,
    component: <SelectOnMapPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind.notInEngland,
    component: <NotInEnglandPage />
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
  },
  {
    path: orgManageLocationsUrls.edit.options,
    component: <EditLocationOptionsPage />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
