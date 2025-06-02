import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setAdditionalAlerts,
  setProfile
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

    if (isInWarningArea) {
      // take user to warning screen and then to alerts screen for optional alerts
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
    } else if (isError) {
      navigate('/error')
    } else {
      // location isnt in danger area
      navigate('/signup/register-location/no-danger')
    }
  }

  const returnToSearchPage = '/signup/register-location/search'

  return (
    <>
      <Helmet>
        <title>Select an address - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationSearchResultsLayout
        continueToNextPage={continueToNextPage}
        returnToSearchPage={returnToSearchPage}
      />
    </>
  )
}
