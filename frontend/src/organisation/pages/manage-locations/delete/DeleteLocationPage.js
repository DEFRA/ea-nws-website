import { React } from 'react'
import { useNavigate } from 'react-router'
import DeleteLayout from '../../../layouts/location-contact/DeleteLayout'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function DeleteLocationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  return (
    <>
      <DeleteLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
