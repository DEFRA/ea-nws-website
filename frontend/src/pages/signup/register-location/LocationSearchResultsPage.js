import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationSearchResultsLayout from '../../../common-layouts/location/LocationSearchResultsLayout'
import { setAdditionalAlerts } from '../../../redux/userSlice'

export default function LocationSearchResultsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const continueToNextPage = (
    isInWarningArea,
    isInAlertArea,
    isWithinWarningAreaProximity,
    isWithinAlertAreaProximity
  ) => {
    if (isInWarningArea) {
      // take user to severe screen and then to alerts screen for
      // optional additional alerts
      dispatch(setAdditionalAlerts(true))
      navigate('/signup/register-location/location-in-severe-warning-area')
    } else if (isInAlertArea) {
      // take user to non optional flood alerts screen
      dispatch(setAdditionalAlerts(false))
      navigate('/signup/register-location/location-in-alert-area')
    } else if (isWithinWarningAreaProximity) {
      // users location is within distance to severe flood area
      navigate(
        `/signup/register-location/location-in-proximity-area/${'severe'}`
      )
    } else if (isWithinAlertAreaProximity) {
      // users location is within distance to alert flood area
      navigate(
        `/signup/register-location/location-in-proximity-area/${'alert'}`
      )
    } else {
      // location isnt in danger area
      navigate('/signup/register-location/no-danger')
    }
  }

  return (
    <>
      <LocationSearchResultsLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
