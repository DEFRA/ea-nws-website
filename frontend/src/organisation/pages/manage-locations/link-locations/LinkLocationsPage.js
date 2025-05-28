import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import LinkLocationsLayout from '../../../layouts/location/link-locations/LinkLocationsLayout'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function LinkLocationsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (message) => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: {
        successMessage: message
      }
    })
  }

  const navigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Link Locations - GOV.UK</title>
      </Helmet>
      <LinkLocationsLayout
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
