import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCurrentContact } from '../../../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../../../routes/manage-contacts/ManageContactsRoutes'
import Popup from '../../../../../../common/components/custom/Popup'

export default function ContactsTable ({
  contacts,
  displayedContacts,
  filteredContacts,
  selectedContacts,
  setSelectedContacts,
  setFilteredContacts,
  resetPaging,
  setResetPaging
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)
  const [contactNameSort, setContactNameSort] = useState('none')
  const [jobTitleSort, setJobTitleSort] = useState('none')
  const [emailSort, setEmailSort] = useState('none')
  const [linkedLocationsSort, setLinkedLocationsSort] = useState('none')
  const [messagesReceivedSort, setMessagesReceivedSort] = useState('none')
  const [notificationText, setNotificationText] = useState('')
  const [targetContact, setTargetContact] = useState(null)
  
  const [dialog, setDialog] = useState({
    show: false,
    text: '',
    title: '',
    buttonText: '',
    buttonClass: '',
    input: '',
    charLimit: 0,
    error: ''
  })

  useEffect(() => {
    setContactNameSort('none')
    
  }, [contacts])

  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked
    setIsTopCheckboxChecked(isChecked)
    if (isChecked) {
      setSelectedContacts(displayedContacts)
    } else {
      setSelectedContacts([])
    }
  }

  const handleContactSelected = (contact) => {
    let updatedSelectedContacts = []

    if (selectedContacts.includes(contact)) {
      updatedSelectedContacts = selectedContacts.filter(
        (selectedContact) => selectedContact !== contact
      )
    } else {
      updatedSelectedContacts = [...selectedContacts, contact]
    }
    setSelectedContacts(updatedSelectedContacts)
  }

  const sortContactNames = () => {
    if (contactNameSort === 'none' || contactNameSort === 'descending') {
      setContactNameSort('ascending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.name > 
          b.name ? 1 : -1))
      )
    }
    if (contactNameSort === 'ascending') {
      setContactNameSort('descending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.name < 
          b.name ? 1 : -1))
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortJobTitles = () => {
    if (jobTitleSort === 'none' || jobTitleSort === 'descending') {
      setJobTitleSort('ascending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.job_title > 
          b.job_title ? 1 : -1))
      )
    }
    if (jobTitleSort === 'ascending') {
      setJobTitleSort('descending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.job_title < 
          b.job_title ? 1 : -1))
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortEmails = () => {
    if (emailSort === 'none' || emailSort === 'descending') {
      setEmailSort('ascending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.email > 
          b.email ? 1 : -1))
      )
    }
    if (emailSort === 'ascending') {
      setEmailSort('descending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.email < 
          b.email ? 1 : -1))
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortLinkedLocations = () => {
    if (linkedLocationsSort === 'none' || linkedLocationsSort === 'descending') {
      setLinkedLocationsSort('ascending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.linked_locations > 
          b.linked_locations ? 1 : -1))
      )
    }
    if (linkedLocationsSort === 'ascending') {
      setLinkedLocationsSort('descending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => (
          a.linked_locations < 
          b.linked_locations ? 1 : -1))
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortMessagesReceived = () => {
    
  }

  const removeContacts = (contactsToRemove) => {
    const updatedContacts = contacts.filter(
      (contact) => !contactsToRemove.includes(contact)
    )

    // dispatch(setContacts(updatedContacts))
    // setContacts([...updatedContacts])

    setNotificationText('Contact deleted')

    setDialog({ ...dialog, show: false })
    setTargetContact(null)
    setSelectedContacts([])
  }

  const viewContact = (e, contact) => {
    e.preventDefault()
    dispatch(setCurrentContact(contact))
    navigate(orgManageContactsUrls.view.viewContact)
  }

  const deleteContact = (e, contact) => {
    setDialog({
      show: true,
      text: (
        <>
          If you continue Contact_IDXX will be deleted from this account
          and will not get flood messages.
        </>
      ),
      title: 'Delete contact',
      buttonText: 'Delete contact',
      buttonClass: 'govuk-button--warning',
      input: '',
      textInput: '',
      setTextInput: '',
      charLimit: 0,
      error: ''
    })
  }

  const handleDelete = () => {
    setDialog({ ...dialog, show: false })
    
    if (targetContact) {
      removeContacts([targetContact])
      if (selectedContacts.length > 0) {
        const updatedSelectedContacts = selectedContacts.filter(contact => contact !== targetContact)
        setSelectedContacts(updatedSelectedContacts)
      }
    } else if (selectedContacts.length > 0) {
      const contactsToRemove = [...selectedContacts]
      removeContacts(contactsToRemove)
    }
  }

  return (
    <>
      <p
        className='govuk-!-margin-bottom-6'
        style={{ display: 'flex', color: '#505a5f' }}
      >
        {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}{' '}
        <span style={{ margin: '0 20px' }}>|</span>
        {selectedContacts.length}{' '}
        {selectedContacts.length === 1 ? 'contact' : 'contacts'} selected{' '}
      </p>
      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header'>
              <div
                className='govuk-checkboxes govuk-checkboxes--small'
                data-module='govuk-checkboxes'
              >
                <div className='govuk-checkboxes__item'>
                  <input
                    className='govuk-checkboxes__input'
                    type='checkbox'
                    checked={isTopCheckboxChecked}
                    onChange={handleHeaderCheckboxChange}
                  />
                  <label className='govuk-label govuk-checkboxes__label' />
                </div>
              </div>
            </th>
            <th scope='col' className='govuk-table__header' aria-sort={contactNameSort}>
              <button type='button' onClick={() => sortContactNames()}>
                Contact name
              </button>
            </th>
            <th scope='col' className='govuk-table__header' aria-sort={jobTitleSort}>
              <button type='button' onClick={() => sortJobTitles()}>
                Job title
              </button>
            </th>
            <th scope='col' className='govuk-table__header' aria-sort={emailSort}>
              <button type='button' onClick={() => sortEmails()}>
                Email
              </button>
            </th>
            <th scope='col' className='govuk-table__header' aria-sort={linkedLocationsSort}>
              <button type='button' onClick={() => sortLinkedLocations()}>
                Linked locations
              </button>
            </th>
            <th scope='col' className='govuk-table__header' aria-sort={messagesReceivedSort}>
              <button type='button' onClick={() => sortMessagesReceived()}>
                Messages received in
                <br/> last 2 years for current
                <br/> linked locations
              </button>
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedContacts.map((contact, index) => (
            <tr className='govuk-table__row' key={index}>
              <th scope='row' className='govuk-table__header'>
                <div
                  className='govuk-checkboxes govuk-checkboxes--small'
                  data-module='govuk-checkboxes'
                >
                  <div className='govuk-checkboxes__item'>
                    <input
                      className='govuk-checkboxes__input'
                      type='checkbox'
                      checked={selectedContacts.includes(contact)}
                      onChange={() => handleContactSelected(contact)}
                    />
                    <label className='govuk-label govuk-checkboxes__label' />
                  </div>
                </div>
              </th>
              <td className='govuk-table__cell'>
                <Link onClick={(e) => viewContact(e, contact)}>
                  {contact.name}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {contact.job_title}
              </td>
              <td className='govuk-table__cell'>
                {contact.email}
              </td>
              <td className='govuk-table__cell'>
                {contact.linked_locations.length}
              </td>
              <td className='govuk-table__cell'>
                0
              </td>
              <td className='govuk-table__cell'>
                <Link onClick={(e) => deleteContact(e, contact)}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
          {dialog.show && (
                  <>
                    <Popup
                      onDelete={() => handleDelete()}
                      onClose={() => setDialog({ ...dialog, show: false })}
                      title={dialog.title}
                      popupText={dialog.text}
                      buttonText={dialog.buttonText}
                      buttonClass={dialog.buttonClass}
                      input={dialog.input}
                      //textInput={updatedKeyword}
                      //setTextInput={setUpdatedKeyword}
                      charLimit={dialog.charLimit}
                      error={dialog.error}
                      setError={(val) =>
                        setDialog((dial) => ({ ...dial, error: val }))}
                      //validateInput={() => validateInput()}
                      //defaultValue={dialog.input ? targetKeyword.name : ''}
                    />
                  </>
                )}
        </tbody>
      </table>
    </>
  )
}
