import React from 'react'
import { useNavigate } from 'react-router'
import LocationNotNearDangerLayout from '../../../common-layouts/location/LocationNotNearDangerLayout'

export default function LocationNotNearDangerPage () {
  const navigate = useNavigate()
  const tryAnotherPostCode = () => {
    navigate('/signup/register-location/search')
  }
  return (
    <>
      <LocationNotNearDangerLayout tryAnotherPostCode={tryAnotherPostCode} />
    </>
  )
}
