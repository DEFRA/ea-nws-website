import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/add-location/upload-locations-with-csv/unmatched-locations/NotInEnglandLayout'

export default function NotInEnglandPage() {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  const NavigateToNextPage = () => {
    //navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.index, {
    //  state: 'NotAdded'
    //})
  }

  return (
    <NotInEnglandLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
