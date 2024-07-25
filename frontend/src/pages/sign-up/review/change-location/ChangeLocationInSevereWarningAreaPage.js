import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationInSevereWarningAreaLayout from '../../../../common-layouts/location/LocationInSevereWarningAreaLayout'

export default function ChangeLocationInSevereWarningAreaPage () {
  const navigate = useNavigate()
  const additionalAlerts = useSelector(
    (state) => state.session.additionalAlerts
  )

  const continueToNextPage = () => {
    // if location is in severe area, then it should also be in alert area
    // adding validation to check just incase
    if (additionalAlerts) {
      navigate('/signup/review/location-in-alert-area')
    } else {
      navigate('/signup/review')
    }
  }

  return (
    <>
      <LocationInSevereWarningAreaLayout
        continueToNextPage={continueToNextPage}
      />
    </>
  )
}
