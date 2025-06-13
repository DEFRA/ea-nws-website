import LocationInFloodAreasPage from '../../pages/manage-locations/add-location/LocationInFloodAreasPage'
import LocationNearFloodAreasPage from '../../pages/manage-locations/add-location/LocationNearFloodAreasPage'
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
    path: '/manage-locations/add/location-in-flood-areas',
    component: <LocationInFloodAreasPage />
  },
  {
    path: '/manage-locations/add/location-near-flood-areas',
    component: <LocationNearFloodAreasPage />
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
