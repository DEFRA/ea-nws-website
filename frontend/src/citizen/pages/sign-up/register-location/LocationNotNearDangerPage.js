import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationNotNearDangerLayout from '../../../layouts/location/LocationNotNearDangerLayout'

export default function LocationNotNearDangerPage () {
  const navigate = useNavigate()

  const continueToSearchResultsPage = () => {
    navigate('/signup/register-location/search')
  }

  return (
    <>
      <Helmet>
        <title>You cannot get flood messages - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationNotNearDangerLayout
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
