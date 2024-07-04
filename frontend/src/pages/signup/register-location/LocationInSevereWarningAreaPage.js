import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInSevereWarningAreaLayout from '../../../common-layouts/location/LocationInSevereWarningAreaLayout'

export default function LocationInSevereWarningAreaPage() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/signup/register-location/location-in-warning-area')
  }

  return (
    <>
      <LocationInSevereWarningAreaLayout submit={handleSubmit} />
    </>
  )
}
