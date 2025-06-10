import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AlertType from '../../../../common/enums/AlertType'
import {
  setProfile,
  setSelectedLocationAlerts
} from '../../../../common/redux/userSlice'
import LocationSearchResultsLayout from '../../../layouts/location/LocationSearchResultsLayout'

export default function LocationSearchResultsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const continueToNextPage = (
    isInWarningArea,
    isInAlertArea,
    isWithinWarningAreaProximity,
    isWithinAlertAreaProximity,
    isError
  ) => {
    // start an empty profile - if user chooses another location from results page
    // any previous picked locations are reset
    const profile = {
      id: '',
      enabled: true,
      firstname: '',
      lastname: '',
      emails: [],
      mobilePhones: [],
      homePhones: [],
      language: 'EN', // [TODO] is this always english?
      additionals: [{ id: 'signupComplete', value: { s: 'false' } }],
      unverified: {
        emails: [],
        mobilePhones: [],
        homePhones: []
      },
      pois: []
    }

    dispatch(setProfile(profile))

    // if(user is in proximity){
    //   navigate to proxy warning areas
    // } else if (isInWarningArea) {
    //   set redux variable so that selected location gets all alerts
    // } else if() {
    //   set redux variable so that selected location gets only alerts
    // }
    // navigate to location in flood areas page

    const allAlerts = [
      AlertType.SEVERE_FLOOD_WARNING,
      AlertType.FLOOD_WARNING,
      AlertType.FLOOD_ALERT,
      AlertType.REMOVE_FLOOD_SEVERE_WARNING,
      AlertType.REMOVE_FLOOD_WARNING,
      AlertType.INFO
    ]

    const alertsOnly = [AlertType.FLOOD_ALERT, AlertType.INFO]

    // if(isWithinWarningAreaProximity || isWithinAlertAreaProximity){
    //   navigate to proxy faPersonWalkingDashedLineArrowRight
    // }
    if (isInWarningArea) {
      dispatch(setSelectedLocationAlerts(allAlerts))
    } else if (isInAlertArea) {
      dispatch(setSelectedLocationAlerts(alertsOnly))
    } else if (isError) {
      navigate('/error')
    } else {
      // location isnt in danger area
      navigate('/signup/register-location/no-danger')
    }

    // default
    navigate('/signup/register-location/location-in-flood-areas')
    return
  }

  const returnToSearchPage = '/signup/register-location/search'

  return (
    <>
      <LocationSearchResultsLayout
        continueToNextPage={continueToNextPage}
        returnToSearchPage={returnToSearchPage}
      />
    </>
  )
}
