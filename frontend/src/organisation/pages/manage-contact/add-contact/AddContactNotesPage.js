import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NotesLayout from '../../../layouts/optional-info/NotesLayout'
import { backendCall } from '../../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactNotesPage () {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const orgCurrentContact = useSelector((state) => state.session.orgCurrentContact)

  const navigateToNextPage = () => {
    // TODO navigate to link locations
    navigate(orgManageContactsUrls.view.dashboard)
  }

  const onAddContact = async () => {
    const dataToSend = { authToken, orgId, contacts: [orgCurrentContact] }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/organization/create_contacts',
      navigate
    )

    if (!errorMessage) {
      navigateToNextPage()
    } else {
      console.log(errorMessage)
    }
  }

  const instructionText = (
    <>
      Any notes that may be helpful to someone not familiar with this person or
      why they need to get flood messages.
    </>
  )

  return (
    <>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='contact'
        instructionText={instructionText}
        buttonText='Add contact'
        onSubmit={onAddContact}
      />
    </>
  )
}
