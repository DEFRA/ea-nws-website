import AddLocationOptionsPage from '../../pages/manage-locations/add-location/AddLocationOptionsPage'
import LocationNamePage from '../../pages/manage-locations/add-location/manual-add-location/name/LocationNamePage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/manual-add-location/optional-address/AddOptionalAddress'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/manual-add-location/optional-address/OptionalLocationInformationPage'
import LocationPostCodeSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationPostCodeSearchPage'
import LocationPostCodeSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationPostCodeSearchResultsPage'
import LocationSearchOptionPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationSearchOptionPage'
import AddActionPlan from '../../pages/manage-locations/add-location/optional-address/AddActionPlanPage'
import AddKeyInformationPage from '../../pages/manage-locations/add-location/optional-address/AddKeyInformationPage'
import KeywordsForThisLocationPage from '../../pages/manage-locations/add-location/optional-address/AddKeywordsForThisLocationPage'
import AddNotesPage from '../../pages/manage-locations/add-location/optional-address/AddNotesPage'
import ConfirmLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/confirm-locations/ConfirmAddingLocationsPage'
import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddAddressInfoPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddUploadFilePage'
import DoNotAddLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/find-unmatched-locations/FindUnmatchedLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/ViewLocationsDashboardPage'

const urlManageOrg = '/organisation/manage-locations'
const urlManageOrgUnmatchedLocations =
  '/organisation/manage-locations/unmatched-locations'
const urlManageOrgConfirmLocations = '/organisation/manage-locations/confirm'
const urlManageOrgAddLocations = '/organisation/manage-locations/add'
// Manage location urls
const orgManageLocationsUrls = {
  view: {
    dashboard: urlManageOrg + '/view-locations'
  },
  add: {
    options: urlManageOrgAddLocations,
    addressInfo: urlManageOrgAddLocations + '/address-info',
    uploadFile: urlManageOrgAddLocations + '/upload-file',
    name: urlManageOrg + '/add/name',
    searchOption: urlManageOrg + '/add/search-option',
    postCodeSearch: urlManageOrg + '/add/postcode-search',
    postCodeSearchResults: urlManageOrg + '/add/postcode-search-results'
  },
  optionalAddress: {
    optionalAddress: urlManageOrgAddLocations + '/optional-address',
    optionalInfo: urlManageOrgAddLocations + '/optional-location-info',
    addKeyInformation:
      urlManageOrgAddLocations + '/optional-address/add-key-information',
    addKeywords: urlManageOrgAddLocations + '/optional-address/add-keywords',
    addActionPlan:
      urlManageOrgAddLocations + '/optional-address/add-action-plan',
    addNotes: urlManageOrgAddLocations + '/optional-address/add-notes'
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
    path: orgManageLocationsUrls.add.postCodeSearch,
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
    path: orgManageLocationsUrls.unmatchedLocations.findUnmatchedLocations,
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
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind,
    component: <ManuallyFindLocationsPage />
  },
  {
    path: urlManageOrgConfirmLocations,
    component: <ConfirmLocationsPage />
  },
  {
    path: orgManageLocationsUrls.add.optionalInfo,
    component: <OptionalLocationInformationPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.optionalAddress,
    component: <AddOptionalAddress />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
