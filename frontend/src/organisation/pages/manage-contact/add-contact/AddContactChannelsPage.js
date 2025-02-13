import { React, useState } from 'react'
import { useNavigate } from 'react-router'
import ContactChannelsLayout from '../../../layouts/manage-contact/ContactChannelsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactChannelsPage () {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const navigateToNextPage = () => navigate(orgManageContactsUrls.add.notes)

  return (
    <>
      <ContactChannelsLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
