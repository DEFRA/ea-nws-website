import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import ContactChannelsLayout from '../../../layouts/manage-contact/ContactChannelsLayout'
import UpdateContactAndNavigate from '../UpdateContactAndNavigate'

export default function EditContactChannelsPage () {
  const [error, setError] = useState(null)
  const navigateToNextPage = UpdateContactAndNavigate(
    setError,
    'Email addresses and numbers changed'
  )

  return (
    <>
      <Helmet>
        <title>User email addresses and numbers - GOV.UK</title>
      </Helmet>
      <ContactChannelsLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
