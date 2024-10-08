import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/add-location/unmatched-locations/NotInEnglandLayout'

export default function XYCoordinatesNotInEnglandPage () {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  const NavigateToNextPage = () => {
    // TODO: where should the Continue button navigate to?
  }

  return (
    <NotInEnglandLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      locationType='xyCoordinate'
    />
  )
}
