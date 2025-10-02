import { useNavigate } from 'react-router'
import store from '../../../../../common/redux/store'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export function useVerifyLocationInFloodArea () {
  const navigate = useNavigate()

  return async (successPage) => {
    let location = store.getState().session.currentLocation
    location = geoSafeToWebLocation(location)
    if (!location?.additionals?.other?.targetAreas?.length > 0) {
      navigate(orgManageLocationsUrls.add.notInFloodArea.locationNotInFloodArea)
    } else {
      navigate(successPage)
    }
  }
}
