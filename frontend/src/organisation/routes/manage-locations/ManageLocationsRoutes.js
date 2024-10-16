import AddLocationOptionsPage from '../../pages/manage-locations/add-location/AddLocationOptionsPage'
import ConfirmLocationPage from '../../pages/manage-locations/add-location/manual-add-location/confirm-location/ConfirmLocationPage'
import LocationNamePage from '../../pages/manage-locations/add-location/manual-add-location/name/LocationNamePage'
import LocationSearchOptionPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationSearchOptionPage'
import DropPinNotInEnglandPage from '../../pages/manage-locations/add-location/manual-add-location/search/drop-pin/DropPinNotInEnglandPage'
import LocationDropPinSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/drop-pin/LocationDropPinSearchPage'
import LocationDropPinSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/drop-pin/LocationDropPinSearchResultsPage'
import CannotFindAddressPage from '../../pages/manage-locations/add-location/manual-add-location/search/error/CannotFindAddressPage'
import LocationPostCodeSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchPage'
import LocationPostCodeSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchResultsPage'
import LocationXYCoordinatesSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/LocationXYCoordinatesSearchPage'
import XYCoordinatesNotInEnglandPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/XYCoordinatesNotInEnglandPage'
import AddLocationNotInEnglandPage from '../../pages/manage-locations/add-location/manual-add-location/unmatched-locations/NotInEnglandPage'
import AddActionPlan from '../../pages/manage-locations/add-location/optional-information/AddActionPlanPage'
import AddKeyInformationPage from '../../pages/manage-locations/add-location/optional-information/AddKeyInformationPage'
import KeywordsForThisLocationPage from '../../pages/manage-locations/add-location/optional-information/AddKeywordsForThisLocationPage'
import AddNotesPage from '../../pages/manage-locations/add-location/optional-information/AddNotesPage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/optional-information/AddOptionalAddress'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/optional-information/OptionalLocationInformationPage'
import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddAddressInfoPage'
import LocationAddConfirm from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddConfirmPage'
import LocationAddLoadingPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddLoadingPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddUploadFilePage'
import ConfirmAddingLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/confirm-locations/ConfirmAddingLocationsPage'
import FindUnmatchedLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/FindUnmatchedLocationsPage'
import DoNotAddLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import ManuallyFindLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/ManuallyFindLocationsPage'
import SelectHowToFindThisLocationPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/SelectHowToFindThisLocationPage'
import FindLocationByMatchedAddressesPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-by-address/FindLocationByMatchedAddressesPage'
import NotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/NotInEnglandPage'
import ProvideAreaNamePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/ProvideAreaNamePage'
import SelectOnMapPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/unmatched-locations/manually-find-locations/find-location-on-map/SelectOnMapPage'
import EditLocationOptionsPage from '../../pages/manage-locations/edit-location/edit-individual-location/EditLocationSearchOptionsPage'
import LocationDropPinEditPage from '../../pages/manage-locations/edit-location/edit-individual-location/drop-pin/LocationDropPinEditPage'
import CannotChangeLocationLinePage from '../../pages/manage-locations/edit-location/edit-individual-location/edit-line/CannotChangeLocationLinePage'
import CannotChangeLocationPolygonPage from '../../pages/manage-locations/edit-location/edit-individual-location/edit-polygon/CannotChangeLocationPolygonPage'
import EditLocationXYCoordinatesSearchPage from '../../pages/manage-locations/edit-location/edit-individual-location/xy-coordinates/EditLocationXYCoordinatesSearchPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/locations-dashboard/ViewLocationsDashboardPage'
import LocationInformationPage from '../../pages/manage-locations/view-location/view-location-information/LocationInformationPage'

const urlManageOrg = '/organisation/manage-locations'
const urlManageOrgAddLocations = '/organisation/manage-locations/add'
const urlManageOrgUnmatchedLocations = urlManageOrg + '/unmatched-locations'
const urlManageOrgConfirmLocations = urlManageOrg + '/confirm'

// Manage location urls
const orgManageLocationsUrls = {
  view: {
    dashboard: urlManageOrg + '/view-locations',
    viewLocation: urlManageOrg + '/location/view-location'
  },
  add: {
    addLocationWithinBoundaries: {},
    manualAddLocation: {
      confirmManualSearchedLocation:
        urlManageOrg + '/add/location-in-area/:flow/:type'
    },
    uploadLocationsWithCsv: {},
    addLocationsWithShapefile: {},
    options: urlManageOrgAddLocations,
    addressInfo: urlManageOrgAddLocations + '/address-info',
    uploadFile: urlManageOrgAddLocations + '/upload-file',
    loadingPage: urlManageOrgAddLocations + '/upload-file/loading',
    confirm: urlManageOrgAddLocations + '/confirm',
    name: urlManageOrg + '/add/name',
    error: {
      cannotFindAddress: urlManageOrg + '/add/cannot-find-address',
      xyCoordinatesNotInEngland:
        urlManageOrg + '/add/xy-coordinates-not-in-england',
      dropPinNotInEngland: urlManageOrg + '/add/drop-pin-not-in-england'
    },
    search: {
      searchOption: urlManageOrg + '/add/search-option',
      postCodeSearch: urlManageOrg + '/add/postcode-search',
      postCodeSearchResults: urlManageOrg + '/add/postcode-search-results',
      xyCoordinatesSearch: urlManageOrg + '/add/xy-coordinates-search',
      dropPinSearch: urlManageOrg + '/add/drop-pin-search',
      dropPinSearchResults: urlManageOrg + '/add/drop-pin-search-results'
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
    }
  },
  unmatchedLocations: {
    index: urlManageOrgUnmatchedLocations,
    doNotAdd: urlManageOrgUnmatchedLocations + '/do-not-add',
    manuallyfind: {
      index: urlManageOrgUnmatchedLocations + '/manually-find',
      selectHow: urlManageOrgUnmatchedLocations + '/manually-find/select-how',
      address: urlManageOrgUnmatchedLocations + '/manually-find/address',
      areaName: urlManageOrgUnmatchedLocations + '/manually-find/area-name',
      map: urlManageOrgUnmatchedLocations + '/manually-find/map',
      notInEngland:
        urlManageOrgUnmatchedLocations + '/manually-find/not-in-england'
    }
  },
  edit: {
    individualLocation: {
      editLocationCoords: {
        SelectLocationOptions: urlManageOrg + '/edit/select-location-options',
        xyCoordinatesSearch: urlManageOrg + '/edit/xy-coordinates-search',
        ConfirmEditLocations:
          urlManageOrg + '/edit/location-in-area/:flow/:type',
        dropPinEdit: urlManageOrg + '/edit/drop-pin-edit'
      },
      editShape: {
        editPolygon: urlManageOrg + '/edit/edit-polygon',
        editLine: urlManageOrg + '/edit/edit-line'
      }
    },
    error: {
      xyCoordinatesNotInEngland:
        urlManageOrg + '/edit/xy-coordinates-not-in-england'
    }
  }
}

// Manage location routes
const orgManageLocationRoutes = [
  // view
  {
    path: orgManageLocationsUrls.view.dashboard,
    component: <ViewLocationsDashboardPage />
  },
  {
    path: orgManageLocationsUrls.view.viewLocation,
    component: <LocationInformationPage />
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
    path: orgManageLocationsUrls.add.manualAddLocation
      .confirmManualSearchedLocation,
    component: <ConfirmLocationPage />
  },
  {
    path: orgManageLocationsUrls.add.uploadFile,
    component: <LocationAddUploadFilePage />
  },
  {
    path: orgManageLocationsUrls.add.loadingPage,
    component: <LocationAddLoadingPage />
  },
  {
    path: orgManageLocationsUrls.add.confirm,
    component: <LocationAddConfirm />
  },
  {
    path: orgManageLocationsUrls.add.name,
    component: <LocationNamePage />
  },
  // add error
  {
    path: orgManageLocationsUrls.add.error.cannotFindAddress,
    component: <CannotFindAddressPage />
  },
  {
    path: orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland,
    component: <XYCoordinatesNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.add.error.dropPinNotInEngland,
    component: <DropPinNotInEnglandPage />
  },
  // search
  {
    path: orgManageLocationsUrls.add.search.searchOption,
    component: <LocationSearchOptionPage />
  },
  {
    path: orgManageLocationsUrls.add.search.postCodeSearchResults,
    component: <LocationPostCodeSearchResultsPage />
  },
  {
    path: orgManageLocationsUrls.add.search.postCodeSearch,
    component: <LocationPostCodeSearchPage />
  },
  {
    path: orgManageLocationsUrls.add.search.xyCoordinatesSearch,
    component: <LocationXYCoordinatesSearchPage />
  },
  {
    path: orgManageLocationsUrls.add.search.dropPinSearch,
    component: <LocationDropPinSearchPage />
  },
  {
    path: orgManageLocationsUrls.add.search.dropPinSearchResults,
    component: <LocationDropPinSearchResultsPage />
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
  {
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind.selectHow,
    component: <SelectHowToFindThisLocationPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.manuallyfind.address,
    component: <FindLocationByMatchedAddressesPage />
  },
  // optional information
  {
    path: orgManageLocationsUrls.add.optionalInformation.addKeyInformation,
    component: <AddKeyInformationPage />
  },
  {
    path: orgManageLocationsUrls.add.optionalInformation.addActionPlan,
    component: <AddActionPlan />
  },
  {
    path: orgManageLocationsUrls.add.optionalInformation.addNotes,
    component: <AddNotesPage />
  },
  {
    path: orgManageLocationsUrls.add.optionalInformation.addKeywords,
    component: <KeywordsForThisLocationPage />
  },
  {
    path: orgManageLocationsUrls.add.optionalInformation.optionalInfo,
    component: <OptionalLocationInformationPage />
  },
  {
    path: orgManageLocationsUrls.add.optionalInformation.optionalLocation,
    component: <AddOptionalAddress />
  },
  {
    path: urlManageOrgConfirmLocations,
    component: <ConfirmAddingLocationsPage />
  },
  // edit
  {
    path: orgManageLocationsUrls.edit.individualLocation.editLocationCoords
      .SelectLocationOptions,
    component: <EditLocationOptionsPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.editShape.editLine,
    component: <CannotChangeLocationLinePage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.editShape.editPolygon,
    component: <CannotChangeLocationPolygonPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.editLocationCoords
      .xyCoordinatesSearch,
    component: <EditLocationXYCoordinatesSearchPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.editLocationCoords
      .ConfirmEditLocations,
    component: <ConfirmLocationPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.editLocationCoords
      .dropPinEdit,
    component: <LocationDropPinEditPage />
  },
  {
    path: orgManageLocationsUrls.edit.error.xyCoordinatesNotInEngland,
    component: <XYCoordinatesNotInEnglandPage />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
