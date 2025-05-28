import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import store from '../../../../../common/redux/store'
import { getLocationOther, setCurrentLocation } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import ActionPlanLayout from '../../../../layouts/optional-info/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'

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
      dispatch(setCurrentLocation(data))

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
      <Helmet>
        <title>Action Plan - GOV.UK</title>
      </Helmet>
      <ActionPlanLayout
        navigateToNextPage={() => { navigateToNextPage() }}
        error={error}
        setError={setError}
      />
    </>
  )
}
