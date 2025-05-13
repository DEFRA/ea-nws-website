import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import NotesLayout from '../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddNotesPage () {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const navigateToNextPage = () => {
    // TODO: Navigate to correct destination when available.
    //       Notes test will need updating afterwards.
    navigate(orgManageLocationsUrls.add.optionalInformation.addActionPlan)
  }

  const instructionText = (
    <>
      Any notes that may be helpful to someone not familiar with this location.
    </>
  )

  return (
    <>
      <Helmet>
        <title>Add Notes - Next Warning Service GOV.UK</title>
      </Helmet>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
        instructionText={instructionText}
        error={error}
        setError={setError}
      />
    </>
  )
}
