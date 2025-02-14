import { React, useState } from 'react'
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
      <ContactDetailsLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
