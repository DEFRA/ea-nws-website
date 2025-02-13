import { React, useState } from 'react'
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
      <ContactChannelsLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
