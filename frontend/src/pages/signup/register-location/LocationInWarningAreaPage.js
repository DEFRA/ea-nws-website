import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInWarningAreaLayout from '../../../common-layouts/location/LocationInWarningAreaLayout'

export default function LocationInWarningAreaPage() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/signup/register-location/location-in-warning-area')
  }

  return (
    <>
      <LocationInWarningAreaLayout
        submit={handleSubmit}
        additionalAlerts={false}
      />
    </>
  )
}
