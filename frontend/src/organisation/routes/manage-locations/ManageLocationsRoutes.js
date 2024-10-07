import AddLocationOptionsPage from '../../pages/manage-locations/add-location/AddLocationOptionsPage'
import ConfirmLocationPage from '../../pages/manage-locations/add-location/manual-add-location/confirm-location/ConfirmLocationPage'
import LocationNamePage from '../../pages/manage-locations/add-location/manual-add-location/name/LocationNamePage'
import LocationSearchOptionPage from '../../pages/manage-locations/add-location/manual-add-location/search/AddLocationSearchOptionsPage'
import CannotFindAddressPage from '../../pages/manage-locations/add-location/manual-add-location/search/error/CannotFindAddressPage'
import LocationPostCodeSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchPage'
import LocationPostCodeSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchResultsPage'
import LocationXYCoordinatesSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/LocationXYCoordinatesSearchPage'
import XYCoordinatesNotInEnglandPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/XYCoordinatesNotInEnglandPage'
import AddActionPlan from '../../pages/manage-locations/add-location/optional-information/AddActionPlanPage'
import AddKeyInformationPage from '../../pages/manage-locations/add-location/optional-information/AddKeyInformationPage'
import KeywordsForThisLocationPage from '../../pages/manage-locations/add-location/optional-information/AddKeywordsForThisLocationPage'
import AddNotesPage from '../../pages/manage-locations/add-location/optional-information/AddNotesPage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/optional-information/AddOptionalAddress'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/optional-information/OptionalLocationInformationPage'
import AddLocationNotInEnglandPage from '../../pages/manage-locations/add-location/unmatched-location/NotInEnglandPage'
import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddAddressInfoPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddUploadFilePage'
import ConfirmAddingLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/confirm-locations/ConfirmAddingLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/FindUnmatchedLocationsPage'
import DoNotAddLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
import NotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/NotInEnglandPage'
import ProvideAreaNamePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/ProvideAreaNamePage'
import SelectOnMapPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/SelectOnMapPage'
import EditLocationOptionsPage from '../../pages/manage-locations/edit-location/EditLocationSearchOptionsPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/ViewLocationsDashboardPage'
import EditLocationXYCoordinatesSearchPage from '../../pages/manage-locations/edit-location/xy-coordinates/EditLocationXYCoordinatesSearchPage'

const urlManageOrg = '/organisation/manage-locations'
const urlManageOrgAddLocations = '/organisation/manage-locations/add'
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
    options: urlManageOrgAddLocations,
    addressInfo: urlManageOrgAddLocations + '/address-info',
    uploadFile: urlManageOrgAddLocations + '/upload-file',
    name: urlManageOrg + '/add/name',
    confirmManualSearchedLocation:
      urlManageOrg + '/add/location-in-area/:flow/:type',
    error: {
      cannotFindAddress: urlManageOrg + '/add/cannot-find-address',
      xyCoordinatesNotInEngland:
        urlManageOrg + '/add/xy-coordinates-not-in-england'
    }
  },
  search: {
    searchOption: urlManageOrg + '/add/search-option',
    postCodeSearch: urlManageOrg + '/add/postcode-search',
    postCodeSearchResults: urlManageOrg + '/add/postcode-search-results',
    xyCoordinatesSearch: urlManageOrg + '/add/xy-coordinates-search'
  },
  optionalInformation: {
    optionalInfo: urlManageOrgAddLocations + '/optional-information',
    optionalLocation:
      urlManageOrgAddLocations + '/optional-information/address',
    addKeyInformation:
      urlManageOrgAddLocations + '/optional-information/key-information',
    addKeywords: urlManageOrgAddLocations + '/optional-information/keywords',
    addActionPlan:
      urlManageOrgAddLocations + '/optional-information/action-plan',
    addNotes: urlManageOrgAddLocations + '/optional-information/notes'
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
    SelectLocationOptions: urlManageOrg + '/edit/select-location-options',
    xyCoordinatesSearch: urlManageOrg + '/edit/xy-coordinates-search',
    ConfirmEditLocations: urlManageOrg + '/edit/location-in-area/:flow/:type',
    error: {
      xyCoordinatesNotInEngland:
        urlManageOrg + '/edit/xy-coordinates-not-in-england'
    }
  }
}

// Manage location routes
const orgManageLocationRoutes = [
  {
    path: orgManageLocationsUrls.view.dashboard,
    component: <ViewLocationsDashboardPage />
  },
  // add
  {
    path: orgManageLocationsUrls.add.options,
    component: <AddLocationOptionsPage />
  },
  {
    path: orgManageLocationsUrls.add.addressInfo,
    component: <LocationAddAddressInfoPage />
  },
  {
    path: orgManageLocationsUrls.add.confirmManualSearchedLocation,
    component: <ConfirmLocationPage />
  },
  {
    path: orgManageLocationsUrls.add.uploadFile,
    component: <LocationAddUploadFilePage />
  },
  {
    path: orgManageLocationsUrls.add.name,
    component: <LocationNamePage />
  },
  // add error
  {
    path: orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland,
    component: <XYCoordinatesNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.add.error.cannotFindAddress,
    component: <CannotFindAddressPage />
  },
  // search
  {
    path: orgManageLocationsUrls.search.searchOption,
    component: <LocationSearchOptionPage />
  },
  {
    path: orgManageLocationsUrls.search.postCodeSearchResults,
    component: <LocationPostCodeSearchResultsPage />
  },
  {
    path: orgManageLocationsUrls.search.postCodeSearch,
    component: <LocationPostCodeSearchPage />
  },
  {
    path: orgManageLocationsUrls.search.xyCoordinatesSearch,
    component: <LocationXYCoordinatesSearchPage />
  },
  // unmatched locations
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
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind.notInEnglandLP,
    component: <AddLocationNotInEnglandPage />
  },
  // optional information
  {
    path: orgManageLocationsUrls.optionalInformation.addKeyInformation,
    component: <AddKeyInformationPage />
  },
  {
    path: orgManageLocationsUrls.optionalInformation.addActionPlan,
    component: <AddActionPlan />
  },
  {
    path: orgManageLocationsUrls.optionalInformation.addNotes,
    component: <AddNotesPage />
  },
  {
    path: orgManageLocationsUrls.optionalInformation.addKeywords,
    component: <KeywordsForThisLocationPage />
  },
  {
    path: orgManageLocationsUrls.optionalInformation.optionalInfo,
    component: <OptionalLocationInformationPage />
  },
  {
    path: orgManageLocationsUrls.optionalInformation.optionalLocation,
    component: <AddOptionalAddress />
  },
  {
    path: urlManageOrgConfirmLocations,
    component: <ConfirmAddingLocationsPage />
  },
  {
    path: orgManageLocationsUrls.edit.SelectLocationOptions,
    component: <EditLocationOptionsPage />
  },
  {
    path: orgManageLocationsUrls.edit.xyCoordinatesSearch,
    component: <EditLocationXYCoordinatesSearchPage />
  },
  {
    path: orgManageLocationsUrls.edit.ConfirmEditLocations,
    component: <ConfirmLocationPage />
  },
  {
    path: orgManageLocationsUrls.edit.error.xyCoordinatesNotInEngland,
    component: <XYCoordinatesNotInEnglandPage />
  }

]

export { orgManageLocationRoutes, orgManageLocationsUrls }
