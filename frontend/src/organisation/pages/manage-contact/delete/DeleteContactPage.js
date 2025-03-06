import { React } from 'react'
import { useNavigate } from 'react-router'
import DeleteLayout from '../../../layouts/location-contact/DeleteLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function DeleteContactPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageContactsUrls.view.dashboard)
  }

  return (
    <>
      <DeleteLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
