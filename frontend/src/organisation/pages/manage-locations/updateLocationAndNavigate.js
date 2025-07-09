import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import store from '../../../common/redux/store'
import { setCurrentLocation } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'

export default function UpdateLocationAndNavigate(setError, message) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)

  const navigateToNextPage = async () => {
    // since we added to currentLocation we need to get that information to pass to the api
    const locationToAdd = store.getState().session.currentLocation
    const dataToSend = { authToken, location: locationToAdd }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/location/update',
      navigate
    )
    if (data) {
      // need to set the current location due to geosafe creating the ID.
      dispatch(setCurrentLocation(data))
      message
        ? navigate(orgManageLocationsUrls.view.viewLocation, {
            state: { successMessage: message }
          })
        : navigate(orgManageLocationsUrls.view.viewLocation)
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  return navigateToNextPage
}
