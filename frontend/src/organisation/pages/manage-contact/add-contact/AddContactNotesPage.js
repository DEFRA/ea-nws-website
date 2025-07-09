import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../../../common/redux/store'
import { setOrgCurrentContact } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import NotesLayout from '../../../layouts/optional-info/NotesLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactNotesPage() {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const sessionKey = useSelector((state) => state.session.sessionKey)
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const currentContact = useSelector((state) => state.session.orgCurrentContact)

  const navigateToNextPage = () => {
    navigate(orgManageContactsUrls.add.linkContactToLocations)
  }

  const updateContact = async () => {
    const contact = JSON.parse(
      JSON.stringify(store.getState().session.orgCurrentContact)
    )
    const dataToSend = { sessionKey, contact }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/organization/update_contact',
      navigate
    )

    if (data) {
      dispatch(setOrgCurrentContact(data))
      navigateToNextPage()
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  const onAddContact = async () => {
    const originalContacts = await backendCall(
      { sessionKey },
      'api/elasticache/list_contacts',
      navigate
    )

    const contactToAdd = JSON.parse(
      JSON.stringify(store.getState().session.orgCurrentContact)
    )
    const dataToSend = { sessionKey, contacts: [contactToAdd] }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/organization/create_contacts',
      navigate
    )

    if (!errorMessage) {
      const newContacts = await backendCall(
        { sessionKey },
        'api/elasticache/list_contacts',
        navigate
      )

      const newContact = newContacts.data.filter(
        (x) => !originalContacts.data.some((c) => c.id === x.id)
      )
      if (newContact && newContact.length > 0) {
        contactToAdd.id = newContact[0].id
      }

      dispatch(setOrgCurrentContact(contactToAdd))
      navigateToNextPage()
    } else {
      console.log(errorMessage)
    }
  }

  const notesTitle = `Notes about ${currentContact?.firstname} ${currentContact?.lastname} (optional)`

  const instructionText = (
    <>
      For example, annual leave dates or locations they look after.
      <br />
      All admins in your organisation will see these notes.
    </>
  )

  return (
    <>
      <Helmet>
        <title>
          Add notes for this {currentContact?.firstname}{' '}
          {currentContact?.lastname} - Manage users - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='contact'
        instructionText={instructionText}
        title={notesTitle}
        buttonText='Continue'
        onSubmit={currentContact.id ? updateContact : onAddContact}
        error={error}
        setError={setError}
      />
    </>
  )
}
