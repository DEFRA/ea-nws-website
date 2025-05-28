import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import DeleteLayout from '../../../layouts/location-contact/DeleteLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function DeleteContactPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageContactsUrls.view.dashboard)
  }

  return (
    <>
      <Helmet>
        <title>Delete User - GOV.UK</title>
      </Helmet>
      <DeleteLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
