import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationWithinWarningAreaProximityLayout from '../../../common-layouts/location/LocationWithinWarningAreaProximityLayout'

export default function LocationInWarningAreaProximityPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup')
  }

  return (
    <>
      <LocationWithinWarningAreaProximityLayout
        continueToNextPage={continueToNextPage}
      />
    </>
  )
}
