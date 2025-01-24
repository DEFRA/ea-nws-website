import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAdditionalAlerts } from '../../../../../common/redux/userSlice'
import LocationSearchResultsLayout from '../../../../layouts/location/LocationSearchResultsLayout'

export default function ChangeLocationSearchResultPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const continueToNextPage = (
    isInWarningArea,
    isInAlertArea,
    isWithinWarningAreaProximity,
    isWithinAlertAreaProximity,
    isError
  ) => {
    if (isInWarningArea) {
      // take user to severe warning screen and then to alerts screen for
      // optional additional alerts
      dispatch(setAdditionalAlerts(true))
      navigate('/signup/review/location-in-severe-warning-area')
    } else if (isInAlertArea) {
      // take user to non option flood alerts screen
      dispatch(setAdditionalAlerts(false))
      navigate('/signup/review/location-in-alert-area')
    } else if (isWithinWarningAreaProximity) {
      // users location is within distance to severe flood area
      navigate(`/signup/review/location-in-proximity-area/${'severe'}`)
    } else if (isWithinAlertAreaProximity) {
      // users location is within distance to alert flood area
      navigate(`/signup/review/location-in-proximity-area/${'alert'}`)
    } else if (isError) {
      navigate('/error')
    } else {
      // location isnt in danger area
      navigate('/signup/review/no-danger')
    }
  }

  return (
    <>
      <LocationSearchResultsLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
