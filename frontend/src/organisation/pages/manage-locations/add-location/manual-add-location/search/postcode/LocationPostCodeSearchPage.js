import React from 'react'
import { useNavigate } from 'react-router'
import PostCodeSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/postcode/PostCodeSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationPostCodeSearchPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.search.postCodeSearchResults)
  }

  return (
    <>
      <PostCodeSearchLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
