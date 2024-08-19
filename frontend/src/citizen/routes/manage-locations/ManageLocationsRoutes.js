import LocationInAlertAreaPage from '../../pages/manage-locations/add-location/LocationInAlertAreaPage'
import LocationInSevereWarningAreaPage from '../../pages/manage-locations/add-location/LocationInSevereWarningAreaPage'
import LocationInWarningAreaProximityPage from '../../pages/manage-locations/add-location/LocationInWarningAreaProximityPage'
import LocationNotNearDangerPage from '../../pages/manage-locations/add-location/LocationNotNearDangerPage'
import LocationSearchPage from '../../pages/manage-locations/add-location/LocationSearchPage'
import LocationSearchResultsPage from '../../pages/manage-locations/add-location/LocationSearchResultsPage'
import ConfirmDeleteContactDetailsPage from '../../pages/manage-locations/remove-location/ConfirmDeleteSingleLocationPage'
import ViewLocationPage from '../../pages/manage-locations/view-location/ViewLocationPage'

// manage location routes
const manageLocationRoutes = [
  // add a location
  {
    path: '/manage-locations/add/search',
    component: <LocationSearchPage />
  },
  {
    path: '/manage-locations/add/search-results',
    component: <LocationSearchResultsPage />
  },
  {
    path: '/manage-locations/add/location-in-proximity-area/:type',
    component: <LocationInWarningAreaProximityPage />
  },
  {
    path: '/manage-locations/add/location-in-severe-warning-area',
    component: <LocationInSevereWarningAreaPage />
  },
  {
    path: '/manage-locations/add/location-in-alert-area',
    component: <LocationInAlertAreaPage />
  },
  {
    path: '/manage-locations/add/no-danger',
    component: <LocationNotNearDangerPage />
  },
  // remove a location
  {
    path: '/manage-locations/remove',
    component: <ConfirmDeleteContactDetailsPage />
  }, // view a location
  {
    path: '/manage-locations/view/:type',
    component: <ViewLocationPage />
  }
]

export default manageLocationRoutes
