import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/LocationAddAddressInfoPage'
import LocationAddPage from '../../pages/manage-locations/add-location/LocationAddPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/LocationAddUploadFilePage'
import AddActionPlan from '../../pages/manage-locations/add-location/optional-address/ActionPlanPage'
import AddKeyInformationPage from '../../pages/manage-locations/add-location/optional-address/AddKeyInformationPage'
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

// Manage location urls
const orgManageLocationsUrls = {
  view: {
    dashboard: urlManageOrg + '/view-locations'
  },
  add: {
    options: urlManageOrg + '/add',
    addressInfo: urlManageOrg + '/add/address-info',
    uploadFile: urlManageOrg + '/add/upload-file',
    addKeyInformation:
      urlManageOrg + '/add/optional-address/add-key-information',
    addKeywords: urlManageOrg + '/add/optional-address/add-keywords',
    addActionPlan: urlManageOrg + '/add/optional-address/add-action-plan',
    addNotes: urlManageOrg + '/add/optional-address/add-notes',
    uploadFile: urlManageOrg + '/add/upload-file',
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
    path: orgManageLocationsUrls.add.addKeyInformation,
    component: <AddKeyInformationPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.findUnmatchedLocations,
    component: <FindUnmatchedLocationsPage />
  },
  {
    path: orgManageLocationsUrls.add.addActionPlan,
    component: <AddActionPlan />
  },
  {
    path: orgManageLocationsUrls.add.addNotes,
    component: <AddNotesPage />
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
    path: orgManageLocationsUrls.add.optionalAddress,
    component: <AddOptionalAddress />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
