import React from 'react'
import NotesLayout from '../../../../layouts/optional-info/NotesLayout'

export default function AddNotesPage () {
  // const navigate = useNavigate()

  const navigateToNextPage = () => {
    // CAMILLE to handle - this needs to link to the contacts setup/location not in england
    // navigate(orgManageLocationsUrls.view.individualLocation)
  }

  return (
    <>
      <NotesLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
