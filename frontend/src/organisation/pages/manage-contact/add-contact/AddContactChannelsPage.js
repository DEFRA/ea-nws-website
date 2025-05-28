import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import ContactChannelsLayout from '../../../layouts/manage-contact/ContactChannelsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactChannelsPage() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const navigateToNextPage = () => navigate(orgManageContactsUrls.add.keywords)

  return (
    <>
      <Helmet>
        <title>Email addresses and numbers - GOV.UK</title>
      </Helmet>
      <ContactChannelsLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
