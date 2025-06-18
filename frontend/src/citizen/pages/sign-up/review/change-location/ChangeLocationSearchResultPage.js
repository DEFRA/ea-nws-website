import React from 'react'
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
    if (isWithinWarningAreaProximity || isWithinAlertAreaProximity) {
      navigate('/signup/review/change-location-near-flood-areas')
    } else if (isInWarningArea || isInAlertArea) {
      navigate('/signup/review/change-location-in-flood-areas')
    } else if (isError) {
      navigate('/error')
    } else {
      navigate('/signup/review/no-danger')
    }
  }

  return (
    <>
      <LocationSearchResultsLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
