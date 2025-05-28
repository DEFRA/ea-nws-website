import React from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>You can get severe flood warnings and flood warnings near this area - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationInSevereWarningAreaLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
        updateGeoSafeProfile={false}
      />
    </>
  )
}
