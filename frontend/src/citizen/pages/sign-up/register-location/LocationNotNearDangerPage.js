import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationNotNearDangerLayout from '../../../layouts/location/LocationNotNearDangerLayout'

export default function LocationNotNearDangerPage () {
  const navigate = useNavigate()

  const continueToSearchResultsPage = () => {
    navigate('/signup/register-location/search')
  }

  return (
    <>
      <LocationNotNearDangerLayout
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
