import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import ContactDetailsLayout from '../../../layouts/manage-contact/ContactDetailsLayout'
import UpdateContactAndNavigate from '../UpdateContactAndNavigate'

export default function EditContactDetailsPage () {
  const [error, setError] = useState(null)
  const navigateToNextPage = UpdateContactAndNavigate(
    setError,
    'Key information changed'
  )

  return (
    <>
      <Helmet>
        <title>User details - GOV.UK</title>
      </Helmet>
      <ContactDetailsLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
