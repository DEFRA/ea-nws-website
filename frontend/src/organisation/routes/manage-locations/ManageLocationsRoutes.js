import AddLocationOptionsPage from '../../pages/manage-locations/add-location/AddLocationOptionsPage'
import LocationNamePage from '../../pages/manage-locations/add-location/manual-add-location/name/LocationNamePage'
import LocationPostCodeSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationPostCodeSearchPage'
import LocationPostCodeSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationPostCodeSearchResultsPage'
import LocationSearchOptionPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationSearchOptionPage'
import AddActionPlan from '../../pages/manage-locations/add-location/optional-address/AddActionPlanPage'
import AddKeyInformationPage from '../../pages/manage-locations/add-location/optional-address/AddKeyInformationPage'
import KeywordsForThisLocationPage from '../../pages/manage-locations/add-location/optional-address/AddKeywordsForThisLocationPage'
import AddNotesPage from '../../pages/manage-locations/add-location/optional-address/AddNotesPage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/optional-address/AddOptionalAddress'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/optional-address/OptionalLocationInformationPage'
import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddAddressInfoPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddUploadFilePage'
import ConfirmLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/confirm-locations/ConfirmAddingLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/FindUnmatchedLocationsPage'
import DoNotAddLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
import NotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/NotInEnglandPage'
import ProvideAreaNamePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/ProvideAreaNamePage'
import SelectOnMapPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/SelectOnMapPage'
import EditLocationOptionsPage from '../../pages/manage-locations/edit-location/EditLocationOptionsPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/ViewLocationsDashboardPage'

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
    options: urlManageOrgAddLocations,
    addressInfo: urlManageOrgAddLocations + '/address-info',
    uploadFile: urlManageOrgAddLocations + '/upload-file',
    name: urlManageOrg + '/add/name'
  },
  search: {
    searchOption: urlManageOrg + '/add/search-option',
    postCodeSearch: urlManageOrg + '/add/postcode-search',
    postCodeSearchResults: urlManageOrg + '/add/postcode-search-results',
    xyCoordinatesSearch: urlManageOrg + '/add/xy-coordinates-search'
  },
  optionalAddress: {
    optionalLocation:
      urlManageOrgAddLocations + '/optional-address/optional-location',
    optionalInfo: urlManageOrgAddLocations + '/optional-address/info',
    addKeyInformation:
      urlManageOrgAddLocations + '/optional-address/add-key-information',
    addKeywords: urlManageOrgAddLocations + '/optional-address/add-keywords',
    addActionPlan:
      urlManageOrgAddLocations + '/optional-address/add-action-plan',
    addNotes: urlManageOrgAddLocations + '/optional-address/add-notes'
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
    path: orgManageLocationsUrls.unmatchedLocations.doNotAdd,
    component: <DoNotAddLocationsPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.addKeyInformation,
    component: <AddKeyInformationPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.index,
    component: <FindUnmatchedLocationsPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.addActionPlan,
    component: <AddActionPlan />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.addNotes,
    component: <AddNotesPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.addKeywords,
    component: <KeywordsForThisLocationPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.addActionPlan,
    component: <AddActionPlan />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.addNotes,
    component: <AddNotesPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.addKeywords,
    component: <KeywordsForThisLocationPage />
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
    component: <ConfirmLocationsPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.optionalInfo,
    component: <OptionalLocationInformationPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.optionalLocation,
    component: <AddOptionalAddress />
  },
  {
    path: orgManageLocationsUrls.edit.options,
    component: <EditLocationOptionsPage />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
