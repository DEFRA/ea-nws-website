import LocationInAlertAreaPage from '../../pages/manage-locations/add-location/LocationInAlertAreaPage'
import LocationInSevereWarningAreaPage from '../../pages/manage-locations/add-location/LocationInSevereWarningAreaPage'
import LocationNotNearDangerPage from '../../pages/manage-locations/add-location/LocationNotNearDangerPage'
import LocationSearchPage from '../../pages/manage-locations/add-location/LocationSearchPage'
import LocationSearchResultsPage from '../../pages/manage-locations/add-location/LocationSearchResultsPage'

// manage location routes
const manageLocationRoutes = [
  //add a location
  {
    path: '/manage-locations/add/search',
    component: <LocationSearchPage />
  },
  {
    path: '/manage-locations/add/search-results',
    component: <LocationSearchResultsPage />
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
  }
]

export default manageLocationRoutes
