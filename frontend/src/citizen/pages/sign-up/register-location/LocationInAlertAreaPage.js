import React from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>You can also get flood alerts - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationInAlertAreaLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
        updateGeoSafeProfile={false}
      />
    </>
  )
}
