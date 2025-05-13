import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>Email Addresses and Numbers - Next Warning Service GOV.UK</title>
      </Helmet>
      <ContactChannelsLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
