import React from 'react'
import { useNavigate } from 'react-router-dom'
import CannotChangeLocationManuallyLayout from '../../../../../layouts/location/view/view-location-information/edit-location/edit-shape/CannotChangeLocationManuallyLayout'
export default function CannotChangeLocationLinePage() {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <CannotChangeLocationManuallyLayout
      LocationType='line'
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
