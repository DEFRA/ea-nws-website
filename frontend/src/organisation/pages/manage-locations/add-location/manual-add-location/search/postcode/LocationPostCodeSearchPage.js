import React from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>What's the location's postcode? - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <PostCodeSearchLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
