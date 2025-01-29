import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../layouts/location/LocationInAlertAreaLayout'

export default function LocationInAlertAreaPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup')
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/register-location/search-results')
  }

  return (
    <>
      <LocationInAlertAreaLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
        updateGeoSafeProfile={false}
      />
    </>
  )
}
