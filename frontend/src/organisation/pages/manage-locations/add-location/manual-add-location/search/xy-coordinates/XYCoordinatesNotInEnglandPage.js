import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/NotInEnglandLayout'

export default function XYCoordinatesNotInEnglandPage () {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  const NavigateToNextPage = () => {

  }

  return (
    <NotInEnglandLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
