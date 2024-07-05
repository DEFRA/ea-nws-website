import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../common-layouts/location/LocationSearchLayout'

export default function LocationSearchPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup/register-location/search-results')
  }

  return (
    <>
      <LocationSearchLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
