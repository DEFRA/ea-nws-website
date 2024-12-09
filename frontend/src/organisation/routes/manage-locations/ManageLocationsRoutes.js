import AddLocationOptionsPage from '../../pages/manage-locations/add-location/AddLocationOptionsPage'
import ConfirmLocationPage from '../../pages/manage-locations/add-location/manual-add-location/confirm-location/ConfirmLocationPage'
import LocationAlreadyExists from '../../pages/manage-locations/add-location/manual-add-location/name/LocationAlreadyExists'
import LocationNamePage from '../../pages/manage-locations/add-location/manual-add-location/name/LocationNamePage'
import LocationSearchOptionPage from '../../pages/manage-locations/add-location/manual-add-location/search/LocationSearchOptionsPage'
import DropPinNotInEnglandPage from '../../pages/manage-locations/add-location/manual-add-location/search/drop-pin/DropPinNotInEnglandPage'
import DropPinOnMapPage from '../../pages/manage-locations/add-location/manual-add-location/search/drop-pin/DropPinOnMapPage'
import LocationSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/drop-pin/LocationSearchPage'
import CannotFindAddressPage from '../../pages/manage-locations/add-location/manual-add-location/search/error/CannotFindAddressPage'
import LocationPostCodeSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchPage'
import LocationPostCodeSearchResultsPage from '../../pages/manage-locations/add-location/manual-add-location/search/postcode/LocationPostCodeSearchResultsPage'
import LocationXYCoordinatesSearchPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/LocationXYCoordinatesSearchPage'
import XYCoordinatesNotInEnglandPage from '../../pages/manage-locations/add-location/manual-add-location/search/xy-coordinates/XYCoordinatesNotInEnglandPage'
import AddActionPlan from '../../pages/manage-locations/add-location/optional-information/ActionPlanPage'
import AddKeyInformationPage from '../../pages/manage-locations/add-location/optional-information/AddKeyInformationPage'
import KeywordsForThisLocationPage from '../../pages/manage-locations/add-location/optional-information/AddKeywordsPage'
import AddOptionalAddress from '../../pages/manage-locations/add-location/optional-information/AddOptionalAddress'
import AddNotesPage from '../../pages/manage-locations/add-location/optional-information/NotesPage'
import OptionalLocationInformationPage from '../../pages/manage-locations/add-location/optional-information/OptionalInfoPage'
import AddAnotherPredefinedBoundaryPage from '../../pages/manage-locations/add-location/predefined-boundary/AddAnotherPredefinedBoundaryPage'
import PredefinedBoundaryOptionalInfoPage from '../../pages/manage-locations/add-location/predefined-boundary/OptionalInfoPage'
import SelectPredefinedBoundaryPage from '../../pages/manage-locations/add-location/predefined-boundary/SelectPredefinedBoundaryPage'
import LocationAddShapefilePage from '../../pages/manage-locations/add-location/shapefile-zip/LocationAddShapefileInfoPage'
import LocationUploadShapeFilePage from '../../pages/manage-locations/add-location/shapefile-zip/LocationUploadShapeFilePage'
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

// edit imports
import EditConfirmLocationPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/ConfirmLocationPage'
import EditLocationSearchOptionsPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/LocationSearchOptionsPage'
import EditDropPinOnMapPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/drop-pin/DropPinOnMapPage'
import EditDropPinLocationSearchPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/drop-pin/LocationSearchPage'
import EditDropPinOnMapNotInEnglandPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/drop-pin/NotInEnglandPage'
import EditLinePage from '../../pages/manage-locations/edit-location/edit-individual-location/location/edit-line/CannotChangeLocationLinePage'
import EditPolygonPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/edit-polygon/CannotChangeLocationPolygonPage'
import EditLocationXYCoordinatesSearchPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/xy-coordinates/LocationXYCoordinatesSearchPage'
import EditXyCoordinatesNotInEnglandPage from '../../pages/manage-locations/edit-location/edit-individual-location/location/xy-coordinates/NotInEnglandPage'
import EditActionPlanPage from '../../pages/manage-locations/edit-location/edit-individual-location/optional-information/action-plan/ActionPlanPage'
import EditAddressPage from '../../pages/manage-locations/edit-location/edit-individual-location/optional-information/address/AddressPage'
import EditKeyInformationPage from '../../pages/manage-locations/edit-location/edit-individual-location/optional-information/key-information/KeyInformationPage'
import EditKeywordsPage from '../../pages/manage-locations/edit-location/edit-individual-location/optional-information/keywords/KeywordsPage'
import EditNotesPage from '../../pages/manage-locations/edit-location/edit-individual-location/optional-information/notes/NotesPage'

// view imports
import ViewLocationInformationPage from '../../pages/manage-locations/view-location/location/LocationInformationPage'
import ViewMessagesPage from '../../pages/manage-locations/view-location/location/LocationMessagesPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/locations-dashboard/ViewLocationsDashboardPage'

// link imports
import LinkLocationPage from '../../pages/manage-locations/link-location/LinkLocationPage'

const urlManageOrg = '/organisation/manage-locations'
const urlManageOrgViewLocations = urlManageOrg + '/locations'
const urlManageOrgAddLocations = urlManageOrg + '/add'
const urlManageOrgEditLocations = urlManageOrg + '/edit'
const urlManageOrgUnmatchedLocations = urlManageOrg + '/unmatched-locations'
const urlManageOrgConfirmLocations = urlManageOrg + '/confirm'

// Manage location urls
const orgManageLocationsUrls = {
  view: {
    dashboard: urlManageOrgViewLocations,
    viewLocation: urlManageOrgViewLocations + '/view',
    viewMessages: urlManageOrgViewLocations + '/view-messages'
  },
  add: {
    addLocationWithinBoundaries: {},
    manualAddLocation: {
      confirmManualSearchedLocation: urlManageOrg + '/add/confirm'
    },
    uploadLocationsWithCsv: {},
    addLocationsWithShapefile: urlManageOrgAddLocations + '/shapefile-info',
    uploadLocationsWithShapefile:
      urlManageOrgAddLocations + '/shapefile-upload',
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
      dropPinNotInEngland: urlManageOrg + '/add/drop-pin-not-in-england',
      alreadyExists: urlManageOrg + '/add/location-already-exists'
    },
    search: {
      searchOption: urlManageOrg + '/add/search-option',
      postCodeSearch: urlManageOrg + '/add/postcode-search',
      postCodeSearchResults: urlManageOrg + '/add/postcode-search-results',
      xyCoordinatesSearch: urlManageOrg + '/add/xy-coordinates-search',
      dropPinSearch: urlManageOrg + '/add/drop-pin-search',
      dropPinSearchResults: urlManageOrg + '/add/drop-pin-search-results'
    },
    predefinedBoundary: {
      optionalInfo:
        urlManageOrgAddLocations + '/predefined-boundary/optional-information',
      select: urlManageOrg + '/add/predefined-boundary',
      addAnother: urlManageOrg + '/add/another-predefined-boundary'
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
  edit: {
    individualLocation: {
      location: {
        search: urlManageOrgEditLocations + '/search-options',
        confirm: urlManageOrgEditLocations + '/confirm-location',
        xyCoords: {
          search: urlManageOrgEditLocations + '/xy-coordinates-search',
          error: urlManageOrgEditLocations + '/xy-coordinates-not-in-england'
        },
        dropPin: {
          search: urlManageOrgEditLocations + '/location-search',
          drop: urlManageOrgEditLocations + '/drop-pin',
          error: urlManageOrgEditLocations + '/pin-not-in-england'
        },
        shape: {
          polygon: urlManageOrgEditLocations + '/polygon',
          line: urlManageOrgEditLocations + '/line'
        }
      },
      optionalInformation: {
        address: urlManageOrgEditLocations + '/address',
        actionPlan: urlManageOrgEditLocations + '/action-plan',
        keyInformation: urlManageOrgEditLocations + '/key-information',
        keywords: urlManageOrgEditLocations + '/keywords',
        notes: urlManageOrgEditLocations + '/notes'
      }
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
  link: {
    linkLocation: urlManageOrg + '/link-locations'
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
    component: <ViewLocationInformationPage />
  },
  {
    path: orgManageLocationsUrls.view.viewMessages,
    component: <ViewMessagesPage />
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
    path: orgManageLocationsUrls.add.addLocationsWithShapefile,
    component: <LocationAddShapefilePage />
  },
  {
    path: orgManageLocationsUrls.add.uploadLocationsWithShapefile,
    component: <LocationUploadShapeFilePage />
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
  {
    path: orgManageLocationsUrls.add.error.alreadyExists,
    component: <LocationAlreadyExists />
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
    component: <LocationSearchPage />
  },
  {
    path: orgManageLocationsUrls.add.search.dropPinSearchResults,
    component: <DropPinOnMapPage />
  },
  {
    path: orgManageLocationsUrls.add.predefinedBoundary.select,
    component: <SelectPredefinedBoundaryPage />
  },
  {
    path: orgManageLocationsUrls.add.predefinedBoundary.addAnother,
    component: <AddAnotherPredefinedBoundaryPage />
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
  // predefined boundary
  {
    path: orgManageLocationsUrls.add.predefinedBoundary.optionalInfo,
    component: <PredefinedBoundaryOptionalInfoPage />
  },
  // edit
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.search,
    component: <EditLocationSearchOptionsPage />
  },
  // xy coords
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.xyCoords
      .search,
    component: <EditLocationXYCoordinatesSearchPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.xyCoords
      .error,
    component: <EditXyCoordinatesNotInEnglandPage />
  },
  // pin drop
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.dropPin
      .search,
    component: <EditDropPinLocationSearchPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.dropPin.drop,
    component: <EditDropPinOnMapPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.dropPin.error,
    component: <EditDropPinOnMapNotInEnglandPage />
  },
  // confirm
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.confirm,
    component: <EditConfirmLocationPage />
  },

  // edit shape - line
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.shape.line,
    component: <EditLinePage />
  },
  // edit shape - polygon
  {
    path: orgManageLocationsUrls.edit.individualLocation.location.shape.polygon,
    component: <EditPolygonPage />
  },
  // optional information
  // edit location address
  {
    path: orgManageLocationsUrls.edit.individualLocation.optionalInformation
      .address,
    component: <EditAddressPage />
  },
  // edit notes
  {
    path: orgManageLocationsUrls.edit.individualLocation.optionalInformation
      .notes,
    component: <EditNotesPage />
  },
  // edit action plan
  {
    path: orgManageLocationsUrls.edit.individualLocation.optionalInformation
      .actionPlan,
    component: <EditActionPlanPage />
  },
  // edit keywords
  {
    path: orgManageLocationsUrls.edit.individualLocation.optionalInformation
      .keyInformation,
    component: <EditKeyInformationPage />
  },
  {
    path: orgManageLocationsUrls.edit.individualLocation.optionalInformation
      .keywords,
    component: <EditKeywordsPage />
  },
  // link location
  {
    path: orgManageLocationsUrls.link.linkLocation,
    component: <LinkLocationPage />
  },
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
