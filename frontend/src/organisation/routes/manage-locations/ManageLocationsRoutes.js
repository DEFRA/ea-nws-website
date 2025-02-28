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
import ConfirmShapefilePolygonPage from '../../pages/manage-locations/add-location/shapefile-zip/ConfirmShapefilePolygonPage'
import LocationAddShapefileInfoPage from '../../pages/manage-locations/add-location/shapefile-zip/LocationAddShapefileInfoPage'
import LocationLoadingShapefilePage from '../../pages/manage-locations/add-location/shapefile-zip/LocationLoadingShapefilePage'
import LocationUploadShapeFilePage from '../../pages/manage-locations/add-location/shapefile-zip/LocationUploadShapeFilePage'
import NotInEnglandShapefilePage from '../../pages/manage-locations/add-location/shapefile-zip/NotInEnglandShapefilePage'
import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddAddressInfoPage'
import LocationAddConfirm from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddConfirmPage'
import LocationAddLoadingPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddLoadingPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/LocationAddUploadFilePage'
import ConfirmAddingLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/confirm-locations/ConfirmAddingLocationsPage'

// Unmatched locations not found
import ConfirmLocationNotFoundPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/ConfirmLocationNotFoundPage'
import FindLocationNotFoundPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/FindLocationNotFoundPage'
import LocationsNotFoundDashboardPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/LocationsNotFoundDashboardPage'
import FindLocationNotFoundByCoordinatesPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/find-by-coordinates/FindLocationByCoordinatesPage'
import CannotFindLocationNotFoundByAddressPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/find-by-postcode/CannotFindLocationByAddressPage'
import FindLocationNotFoundByAddressPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/find-by-postcode/FindLocationByAddressPage'
import FindLocationNotFoundByPostcodePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/find-by-postcode/FindLocationByPostcodePage'
import FindLocationNotFoundByDropPinPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/find-on-map/FindLocationByDropPinPage'
import FindLocationNotFoundOnMapPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/find-on-map/FindLocationOnMapPage'
import LocationNotFoundCoordinatesNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/not-in-england/CoordinatesNotInEnglandPage'
import LocationNotFoundDropPinNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/not-in-england/DropPinNotInEnglandPage'
import LocationNotFoundPostcodeNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-found/not-in-england/PostcodeNotInEnglandPage'

// Unmatched locations: location not in England
import ConfirmLocationNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/ConfirmLocationNotInEnglandPage'
import FindLocationNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/FindLocationNotInEnglandPage'
import LocationNotInEnglandInfoPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/LocationNotInEnglandInfoPage'
import LocationsNotInEnglandDashboardPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/LocationsNotInEnglandDashboardPage'
import FindLocationNotInEnglandByCoordinatesPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/find-by-coordinates/FindLocationByCoordinatesPage'
import CannotFindLocationNotInEnglandByAddressPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/find-by-postcode/CannotFindLocationByAddressPage'
import FindLocationNotInEnglandByAddressPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/find-by-postcode/FindLocationByAddressPage'
import FindLocationNotInEnglandByPostcodePage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/find-by-postcode/FindLocationByPostcodePage'
import FindLocationNotInEnglandByDropPinPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/find-on-map/FindLocationByDropPinPage'
import FindLocationNotInEnglandOnMapPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/find-on-map/FindLocationOnMapPage'
import LocationNotInEnglandCoordinatesNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/not-in-england/CoordinatesNotInEnglandPage'
import LocationNotInEnglandDropPinNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/not-in-england/DropPinNotInEnglandPage'
import LocationNotInEnglandPostcodeNotInEnglandPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/not-in-england/not-in-england/PostcodeNotInEnglandPage'

// Unmatched location: duplicates
import DuplicateLocationComparisonPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/duplicate-locations/DuplicateLocationComparisonPage'
import DuplicateLocationsOptionsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/duplicate-locations/DuplicateLocationsOptionsPage'
import ManageDuplicateLocationsPage from '../../pages/manage-locations/add-location/upload-locations-with-csv/duplicate-locations/ManageDuplicateLocationsPage'

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

// monitoring imports
import LiveFloodMonitoringPage from '../../pages/manage-locations/live-monitoring/LiveFloodMonitoringPage'

// view imports
import LinkLocationsPage from '../../pages/manage-locations/link-locations/LinkLocationsPage'
import FloodAreaPage from '../../pages/manage-locations/view-location/flood-area/FloodAreaPage'
import LinkedContactsPage from '../../pages/manage-locations/view-location/location/LinkedContactsPage'
import ViewLocationInformationPage from '../../pages/manage-locations/view-location/location/LocationInformationPage'
import ViewMessagesPage from '../../pages/manage-locations/view-location/location/LocationMessagesPage'
import ViewLocationsDashboardPage from '../../pages/manage-locations/view-location/locations-dashboard/ViewLocationsDashboardPage'

// link imports
import LinkLocationPage from '../../pages/manage-locations/link-location/LinkLocationPage'

// delete location
import DeleteLocationPage from '../../pages/manage-locations/delete/DeleteLocationPage'

const urlManageOrg = '/organisation/manage-locations'
export const urlManageOrgViewLocations = urlManageOrg + '/locations'
const urlManageOrgLiveMonitoring = urlManageOrg + '/live-monitoring'
export const urlManageOrgAddLocations = urlManageOrg + '/add'
const urlManageOrgEditLocations = urlManageOrg + '/edit'
const urlManageOrgConfirmLocations = urlManageOrg + '/confirm'
const urlUnmatchedLocationsNotFound =
  urlManageOrg + '/unmatched-locations-not-found'
const urlUnmatchedLocationsNotInEngland =
  urlManageOrg + '/unmatched-locations-not-in-england'

// Manage location urls
const orgManageLocationsUrls = {
  view: {
    dashboard: urlManageOrgViewLocations,
    viewLocation: urlManageOrgViewLocations + '/view',
    viewMessages: urlManageOrgViewLocations + '/view-messages',
    viewLinkedContacts: urlManageOrgViewLocations + '/view-linked-contacts',
    viewFloodArea: urlManageOrgViewLocations + '/view-flood-area'
  },
  monitoring: {
    view: urlManageOrgLiveMonitoring + '/view'
  },
  add: {
    addLocationWithinBoundaries: {},
    manualAddLocation: {
      confirmManualSearchedLocation: urlManageOrg + '/add/confirm'
    },
    addLocationsWithShapefile: urlManageOrgAddLocations + '/shapefile-info',
    uploadLocationsWithShapefile:
      urlManageOrgAddLocations + '/shapefile-upload',
    loadingShapefilePage:
      urlManageOrgAddLocations + '/shapefile-upload/loading',
    confirmLocationsWithShapefile:
      urlManageOrgAddLocations + '/shapefile-confirm',
    options: urlManageOrgAddLocations,
    addressInfo: urlManageOrgAddLocations + '/address-info',
    uploadFile: urlManageOrgAddLocations + '/upload-file',
    loadingPage: urlManageOrgAddLocations + '/upload-file/loading',
    duplicateLocationsOptionsPage:
      urlManageOrgAddLocations + '/upload-file/duplicate-locations-options',
    manageDuplicateLocationsPage:
      urlManageOrgAddLocations + '/upload-file/manage-duplicate-locations',
    duplicateLocationComparisonPage:
      urlManageOrgAddLocations + '/upload-file/duplicate-location-comparison',
    confirm: urlManageOrgAddLocations + '/bulk/confirm',
    name: urlManageOrg + '/add/name',
    error: {
      cannotFindAddress: urlManageOrg + '/add/cannot-find-address',
      xyCoordinatesNotInEngland:
        urlManageOrg + '/add/xy-coordinates-not-in-england',
      shapefileNotInEngland: urlManageOrg + '/add/shapefile-not-in-england',
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
    },
    linkToTargetArea: urlManageOrg + '/add/link'
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
    notFound: {
      dashboard: urlUnmatchedLocationsNotFound,
      find: urlUnmatchedLocationsNotFound + '/find-location',
      postcode: urlUnmatchedLocationsNotFound + '/find-location-postcode',
      address: urlUnmatchedLocationsNotFound + '/find-location-address',
      cannotFindAddress:
        urlUnmatchedLocationsNotFound + '/cannot-find-location-address',
      coordinates: urlUnmatchedLocationsNotFound + '/find-location-coordinates',
      map: urlUnmatchedLocationsNotFound + '/find-location-on-map',
      mapDropPin:
        urlUnmatchedLocationsNotFound + '/find-location-on-map/drop-pin',
      notInEngland: {
        postcode:
          urlUnmatchedLocationsNotFound + '/postcode/location-not-in-england',
        coordinates:
          urlUnmatchedLocationsNotFound +
          '/coordinates/location-not-in-england',
        dropPin:
          urlUnmatchedLocationsNotFound + '/drop-pin/location-not-in-england'
      },
      confirm: urlUnmatchedLocationsNotFound + '/confirm-location'
    },
    notInEngland: {
      dashboard: urlUnmatchedLocationsNotInEngland,
      info: urlUnmatchedLocationsNotInEngland + '/location-info',
      find: urlUnmatchedLocationsNotInEngland + '/find-location',
      postcode: urlUnmatchedLocationsNotInEngland + '/find-location-postcode',
      address: urlUnmatchedLocationsNotInEngland + '/find-location-address',
      cannotFindAddress:
        urlUnmatchedLocationsNotInEngland + '/cannot-find-location-address',
      coordinates:
        urlUnmatchedLocationsNotInEngland + '/find-location-coordinates',
      map: urlUnmatchedLocationsNotInEngland + '/find-location-on-map',
      mapDropPin:
        urlUnmatchedLocationsNotInEngland + '/find-location-on-map/drop-pin',
      notInEngland: {
        postcode:
          urlUnmatchedLocationsNotInEngland +
          '/postcode/location-not-in-england',
        coordinates:
          urlUnmatchedLocationsNotInEngland +
          '/coordinates/location-not-in-england',
        dropPin:
          urlUnmatchedLocationsNotInEngland +
          '/drop-pin/location-not-in-england'
      },
      confirm: urlUnmatchedLocationsNotInEngland + '/confirm-location'
    }
  },
  link: {
    linkLocation: urlManageOrg + '/link-locations'
  },
  delete: urlManageOrg + '/delete-location'
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
  {
    path: orgManageLocationsUrls.view.viewFloodArea,
    component: <FloodAreaPage />
  },
  {
    path: orgManageLocationsUrls.view.viewLinkedContacts,
    component: <LinkedContactsPage />
  },
  // monitoring
  {
    path: orgManageLocationsUrls.monitoring.view,
    component: <LiveFloodMonitoringPage />
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
    component: <LocationAddShapefileInfoPage />
  },
  {
    path: orgManageLocationsUrls.add.uploadLocationsWithShapefile,
    component: <LocationUploadShapeFilePage />
  },
  {
    path: orgManageLocationsUrls.add.loadingShapefilePage,
    component: <LocationLoadingShapefilePage />
  },
  {
    path: orgManageLocationsUrls.add.confirmLocationsWithShapefile,
    component: <ConfirmShapefilePolygonPage />
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
    path: orgManageLocationsUrls.add.duplicateLocationsOptionsPage,
    component: <DuplicateLocationsOptionsPage />
  },
  {
    path: orgManageLocationsUrls.add.manageDuplicateLocationsPage,
    component: <ManageDuplicateLocationsPage />
  },
  {
    path: orgManageLocationsUrls.add.duplicateLocationComparisonPage,
    component: <DuplicateLocationComparisonPage />
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
    path: orgManageLocationsUrls.add.error.shapefileNotInEngland,
    component: <NotInEnglandShapefilePage />
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
  // unmatched locations: location not found
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.dashboard,
    component: <LocationsNotFoundDashboardPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.find,
    component: <FindLocationNotFoundPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.postcode,
    component: <FindLocationNotFoundByPostcodePage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.address,
    component: <FindLocationNotFoundByAddressPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.cannotFindAddress,
    component: <CannotFindLocationNotFoundByAddressPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.coordinates,
    component: <FindLocationNotFoundByCoordinatesPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.confirm,
    component: <ConfirmLocationNotFoundPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.map,
    component: <FindLocationNotFoundOnMapPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.mapDropPin,
    component: <FindLocationNotFoundByDropPinPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.notInEngland
      .dropPin,
    component: <LocationNotFoundDropPinNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.notInEngland
      .coordinates,
    component: <LocationNotFoundCoordinatesNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notFound.notInEngland
      .postcode,
    component: <LocationNotFoundPostcodeNotInEnglandPage />
  },
  // unmatched locations: location not in England
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard,
    component: <LocationsNotInEnglandDashboardPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.info,
    component: <LocationNotInEnglandInfoPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.find,
    component: <FindLocationNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.postcode,
    component: <FindLocationNotInEnglandByPostcodePage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.address,
    component: <FindLocationNotInEnglandByAddressPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland
      .cannotFindAddress,
    component: <CannotFindLocationNotInEnglandByAddressPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.coordinates,
    component: <FindLocationNotInEnglandByCoordinatesPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.confirm,
    component: <ConfirmLocationNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.map,
    component: <FindLocationNotInEnglandOnMapPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.mapDropPin,
    component: <FindLocationNotInEnglandByDropPinPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.notInEngland
      .dropPin,
    component: <LocationNotInEnglandDropPinNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.notInEngland
      .coordinates,
    component: <LocationNotInEnglandCoordinatesNotInEnglandPage />
  },
  {
    path: orgManageLocationsUrls.unmatchedLocations.notInEngland.notInEngland
      .postcode,
    component: <LocationNotInEnglandPostcodeNotInEnglandPage />
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
    path: orgManageLocationsUrls.add.linkToTargetArea,
    component: <LinkLocationsPage />
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
  // Delete location
  {
    path: orgManageLocationsUrls.delete,
    component: <DeleteLocationPage />
  }
]

export { orgManageLocationRoutes, orgManageLocationsUrls }
