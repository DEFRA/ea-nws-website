import React from 'react'
import { useNavigate } from 'react-router'
import LinkLocationsLayout from '../../../../layouts/location/link-locations/LinkLocationsLayout'

export default function SelectNearbyFloodAreasPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(-1)
  }

  const navigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <LinkLocationsLayout
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
