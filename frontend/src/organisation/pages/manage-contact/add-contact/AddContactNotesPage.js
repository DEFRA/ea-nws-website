import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../../../common/redux/store'
import { setOrgCurrentContact } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import NotesLayout from '../../../layouts/optional-info/NotesLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactNotesPage () {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const navigateToNextPage = () => {
    navigate(orgManageContactsUrls.add.linkContactToLocations)
  }

  const onAddContact = async () => {
    const listDataToSend = { orgId }
    const originalContacts = await backendCall(
      listDataToSend,
      'api/elasticache/list_contacts',
      navigate
    )

    const contactToAdd = JSON.parse(JSON.stringify(store.getState().session.orgCurrentContact))
    const dataToSend = { authToken, orgId, contacts: [contactToAdd] }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/organization/create_contacts',
      navigate
    )

    if (!errorMessage) {
      const newContacts = await backendCall(
        listDataToSend,
        'api/elasticache/list_contacts',
        navigate
      )

      const newContact = newContacts.data.filter(x => !originalContacts.data.includes(x));
      if (newContact && newContact.length > 0) {
        contactToAdd.id = newContact[0].id
      }
      dispatch(setOrgCurrentContact(contactToAdd))
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
        error={error}
        setError={setError}
      />
    </>
  )
}
