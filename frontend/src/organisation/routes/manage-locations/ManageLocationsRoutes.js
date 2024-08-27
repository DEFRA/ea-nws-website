import LocationAddAddressInfoPage from '../../pages/manage-locations/add-location/LocationAddAddressInfoPage'
import LocationAddPage from '../../pages/manage-locations/add-location/LocationAddPage'
import LocationAddUploadFilePage from '../../pages/manage-locations/add-location/LocationAddUploadFilePage'
import orgManageLocationsUrls from './ManageLocationsUrls'

// Manage location routes
const orgManageLocationRoutes = [
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
  }
]

export default orgManageLocationRoutes
