import { useNavigate } from 'react-router'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import store from '../../../../../common/redux/store'
import {
  getFloodAreas,
  getFloodAreasFromShape
} from '../../../../../common/services/WfsFloodDataService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export function useVerifyLocationInFloodArea () {
  const navigate = useNavigate()

  return async (successPage) => {
    let location = store.getState().session.currentLocation
    location = geoSafeToWebLocation(location)
    let withinAreas = []

    const locationType = location.additionals.other.location_data_type

    if (locationType === LocationDataType.X_AND_Y_COORDS) {
      withinAreas = await getFloodAreas(
        location.coordinates.latitude,
        location.coordinates.longitude
      )
    } else {
      const geoJson = JSON.parse(location.geometry.geoJson)
      withinAreas = getFloodAreasFromShape(geoJson)
    }

    if (withinAreas.length === 0) {
      navigate(orgManageLocationsUrls.add.notInFloodArea.locationNotInFloodArea)
    } else {
      navigate(successPage)
    }
  }
}
