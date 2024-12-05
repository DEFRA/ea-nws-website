import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLocationAdditional } from '../../../../../../../common/redux/userSlice'
import AddressLayout from '../../../../../../layouts/optional-info/AddressLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddressPage () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) => getLocationAdditional(state, 'locationName')
  )

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: `${locationName} address changed` }
    })
  }

  const additionalInfo = (
    <p>
      If you change the address for this location it will not update the X and Y
      coordinates associated with this location.
      <br />
      <br />
      If you want to update the X and Y coordinates associated with this
      location, you'll need to change them separately.
    </p>
  )

  return (
    <AddressLayout
      navigateToNextPage={navigateToNextPage}
      additionalInfo={additionalInfo}
    />
  )
}
