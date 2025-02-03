import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import store from '../../../../../../../common/redux/store'
import { setCurrentLocation } from '../../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../../common/services/BackendService'
import NotesLayout from '../../../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const [error, setError] = useState(null)

  const navigateToNextPage = async () => {
    // since we added to currentLocation we need to get that information to pass to the api
    const locationToAdd = store.getState().session.currentLocation
    const dataToSend = { authToken, orgId, location: locationToAdd }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/location/update',
      navigate
    )
    if (data) {
      // need to set the current location due to geosafe creating the ID.
      dispatch(setCurrentLocation(data))
      navigate(orgManageLocationsUrls.view.viewLocation, {
        state: { successMessage: 'Notes changed' }
      })
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  return (
    <>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
        error={error}
        setError={setError}
      />
    </>
  )
}
