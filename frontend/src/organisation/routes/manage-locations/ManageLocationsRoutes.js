import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/LocationAddAddressInfoPage'
import LocationAddPage from '../../pages/manage-locations/add-location/LocationAddPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/LocationAddUploadFilePage'
import AddActionPlan from '../../pages/manage-locations/add-location/optional-address/AddActionPlanPage'
import AddKeyInformationPage from '../../pages/manage-locations/add-location/optional-address/AddKeyInformationPage'
import KeywordsForThisLocationPage from '../../pages/manage-locations/add-location/optional-address/AddKeywordsForThisLocationPage'
import AddNotesPage from '../../pages/manage-locations/add-location/optional-address/AddNotesPage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/optional-address/AddOptionalAddress'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/optional-address/OptionalLocationInformationPage'
import ConfirmLocationsPage from '../../pages/manage-locations/confirm-locations/ConfirmAddingLocationsPage'
import DoNotAddLocationsPage from '../../pages/manage-locations/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/unmatched-locations/find-unmatched-locations/FindUnmatchedLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
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
    uploadFile: urlManageOrgAddLocations + '/upload-file'
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
    path: orgManageLocationsUrls.optionalAddress.optionalInfo,
    component: <OptionalLocationInformationPage />
  },
  {
    path: orgManageLocationsUrls.optionalAddress.optionalAddress,
    component: <AddOptionalAddress />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
