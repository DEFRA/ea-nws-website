import React from 'react'
import { useNavigate } from 'react-router-dom'
import CannotChangeLocationManuallyLayout from '../../../../../layouts/location/add-or-edit-location/edit-shape/CannotChangeLocationManuallyLayout'

export default function CannotChangeLocationPolygonPage () {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <CannotChangeLocationManuallyLayout
      LocationType='polygon'
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
