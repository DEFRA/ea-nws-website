import { React, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import ContactChannelsLayout from '../../../layouts/manage-contact/ContactChannelsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactChannelsPage() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const navigateToNextPage = () => navigate(orgManageContactsUrls.add.keywords)

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
