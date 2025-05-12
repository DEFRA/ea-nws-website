import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import LocationNotNearDangerLayout from '../../../../layouts/location/LocationNotNearDangerLayout'

export default function ChangeLocationNotNearDangerPage () {
  const navigate = useNavigate()
  const continueToSearchResultsPage = () => {
    navigate('/signup/review/change-location-search')
  }

  return (
    <>
      <Helmet>
        <title>You Cannot Get Flood Messages - Next Warning Service GOV.UK</title>
      </Helmet>
      <LocationNotNearDangerLayout
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
