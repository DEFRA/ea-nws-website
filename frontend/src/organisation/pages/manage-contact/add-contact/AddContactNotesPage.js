import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../../../common/redux/store'
import { clearOrgCurrentContact } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import NotesLayout from '../../../layouts/optional-info/NotesLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactNotesPage () {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const dispatch = useDispatch()

  const navigateToNextPage = () => {
    // TODO navigate to link locations
    navigate(orgManageContactsUrls.view.dashboard)
  }

  const onAddContact = async () => {
    const contactToAdd = store.getState().session.orgCurrentContact
    const dataToSend = { authToken, orgId, contacts: [contactToAdd] }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/organization/create_contacts',
      navigate
    )

    if (!errorMessage) {
      // Clear current contact
      dispatch(clearOrgCurrentContact())
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
