import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInSevereWarningAreaLayout from '../../../layouts/location/LocationInSevereWarningAreaLayout'

export default function LocationInSevereWarningAreaPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup/register-location/location-in-alert-area')
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/register-location/search-results')
  }

  return (
    <>
      <LocationInSevereWarningAreaLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
