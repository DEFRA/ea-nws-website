import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../../../common/redux/userSlice'
import LocationSearchResultsLayout from '../../../layouts/location/LocationSearchResultsLayout'

export default function LocationSearchResultsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const continueToNextPage = (
    floodAreasAlreadyAdded, //placeholder - do not remove
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

    if (isInWarningArea || isInAlertArea) {
      navigate('/signup/register-location/location-in-flood-areas')
    } else if (isWithinWarningAreaProximity || isWithinAlertAreaProximity) {
      navigate('/signup/register-location/location-near-flood-areas')
    } else if (isError) {
      navigate('/error')
    } else {
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
