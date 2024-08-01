import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../layouts/location/LocationInAlertAreaLayout'

export default function LocationInAlertAreaPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup')
  }

  return (
    <>
      <LocationInAlertAreaLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
