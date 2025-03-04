import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import store from '../../../../../common/redux/store'
import ActionPlanLayout from '../../../../layouts/optional-info/ActionPlanLayout'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'
import { backendCall } from '../../../../../common/services/BackendService'
import { setCurrentLocation, getLocationOther } from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationDataType from '../../../../../common/enums/LocationDataType'

export default function ActionPlanPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const verifyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()
  const [error, setError] = useState(null)
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const locationType = useSelector((state) =>
    getLocationOther(state, 'location_data_type')
  )

  const navigateToNextPage = async () => {
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

      const dataToSend = { orgId }
      const { contactsData } = await backendCall(
        dataToSend,
        'api/elasticache/list_contacts',
        navigate
      )

      if (locationType === LocationDataType.X_AND_Y_COORDS) {
        await verifyLocationInFloodAreaAndNavigate(
          orgManageLocationsUrls.add.linkLocationToContacts
        )
      } else if (locationType === LocationDataType.BOUNDARY) {
        navigate(orgManageLocationsUrls.add.linkLocationToContacts)
      }
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  return (
    <>
      <ActionPlanLayout
        navigateToNextPage={() => { navigateToNextPage() }}
        error={error}
        setError={setError}
      />
    </>
  )
}
