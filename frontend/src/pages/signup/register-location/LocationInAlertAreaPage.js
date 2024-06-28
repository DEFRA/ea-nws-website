import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../common-layouts/location/LocationInAlertAreaLayout'

export default function LocationInAlertAreaPage() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/signup/register-location/location-in-warning-area')
  }

  return (
    <>
      <LocationInAlertAreaLayout submit={handleSubmit} />
    </>
  )
}
