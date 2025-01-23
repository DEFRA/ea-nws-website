import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInSevereWarningAreaLayout from '../../../../layouts/location/LocationInSevereWarningAreaLayout'

export default function ChangeLocationInSevereWarningAreaPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup/review/location-in-alert-area')
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/review/change-location-results')
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
