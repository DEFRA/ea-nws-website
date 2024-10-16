import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/location/unmatched-locations/NotInEnglandLayout'

export default function DropPinNotInEnglandPage () {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  const NavigateToNextPage = () => {}

  // TODO: somehow we need to pass a parameter to layout so that bottom half
  // of the page (including the Continue button) is hidden.
  return (
    <NotInEnglandLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      locationType='dropPin'
    />
  )
}
