import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import store from '../../../../../common/redux/store'
import { setCurrentLocation } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import ActionPlanLayout from '../../../../layouts/optional-info/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ActionPlanPage () {
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
      navigate(orgManageLocationsUrls.view.viewLocation)
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  return (
    <>
      <ActionPlanLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
