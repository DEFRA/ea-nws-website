import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../../common-layouts/location/LocationSearchLayout'

export default function ChangeLocationSearchPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup/review/change-location-results')
  }

  return (
    <>
      <LocationSearchLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
