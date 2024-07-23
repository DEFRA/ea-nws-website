import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../../common-layouts/location/LocationInAlertAreaLayout'

export default function ChangeLocationInAlertAreaPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup/review')
  }

  return (
    <>
      <LocationInAlertAreaLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
