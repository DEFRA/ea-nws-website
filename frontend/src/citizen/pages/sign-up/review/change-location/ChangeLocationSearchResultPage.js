import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationSearchResultsLayout from '../../../../layouts/location/LocationSearchResultsLayout'

export default function ChangeLocationSearchResultPage() {
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
    if (isInWarningArea || isInAlertArea) {
      navigate('/signup/review/change-location-in-flood-areas')
    } else if (isWithinWarningAreaProximity || isWithinAlertAreaProximity) {
      navigate('/signup/review/location-cannot-get-direct-flood-messages')
    } else if (isError) {
      navigate('/error')
    } else {
      navigate('/signup/review/no-danger')
    }
  }

  return (
    <>
      <Helmet>
        <title>Select an address - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationSearchResultsLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
