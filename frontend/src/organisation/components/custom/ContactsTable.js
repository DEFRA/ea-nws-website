import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setOrgCurrentContact } from '../../../common/redux/userSlice'
import { webToGeoSafeContact } from '../../../common/services/formatters/ContactFormatter'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'

export default function ContactsTable ({
  contacts,
  displayedContacts,
  filteredContacts,
  selectedContacts,
  setSelectedContacts,
  setFilteredContacts,
  onAction,
  actionText,
  contactPrefix
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)
  const [contactNameSort, setContactNameSort] = useState('none')
  const [jobTitleSort, setJobTitleSort] = useState('none')
  const [emailSort, setEmailSort] = useState('none')
  const [linkedLocationsSort, setLinkedLocationsSort] = useState('none')
  const [messagesReceivedSort, setMessagesReceivedSort] = useState('none')

  useEffect(() => {
    setContactNameSort('none')
    setJobTitleSort('none')
    setEmailSort('none')
    setLinkedLocationsSort('none')
    setMessagesReceivedSort('none')
  }, [contacts])

  // Sort standard data
  const sortData = (sortType, setSort, getValue) => {
    if (sortType === 'none' || sortType === 'descending') {
      setSort('ascending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => {
          const valueA = getValue(a)
          const valueB = getValue(b)

          // Place empty strings at the end
          if (
            (valueA === '' || valueA == null) &&
            (valueB === '' || valueB == null)
          ) {
            return 0
          }
          if (valueA === '' || valueA == null) return 1
          if (valueB === '' || valueB == null) return -1

          return (valueA || '').localeCompare(valueB || '')
        })
      )
    }
    if (sortType === 'ascending') {
      setSort('descending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => {
          const valueA = getValue(a)
          const valueB = getValue(b)
          return (valueB || '').localeCompare(valueA || '')
        })
      )
    }
  }

  const sortLinkedLocations = () => {
    if (
      linkedLocationsSort === 'none' ||
      linkedLocationsSort === 'descending'
    ) {
      setLinkedLocationsSort('ascending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => {
          if (a.linked_locations === null && b.linked_locations === null) {
            return 0
          }
          if (a.linked_locations === null) return 1
          if (b.linked_locations === null) return -1
          return a.linked_locations > b.linked_locations ? 1 : -1
        })
      )
    }
    if (linkedLocationsSort === 'ascending') {
      setLinkedLocationsSort('descending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => {
          if (a.linked_locations === null && b.linked_locations === null) {
            return 0
          }
          if (a.linked_locations === null) return 1
          if (b.linked_locations === null) return -1
          return a.linked_locations < b.linked_locations ? 1 : -1
        })
      )
    }
  }

  const sortMessagesReceived = () => {
    if (messagesReceivedSort === 'none' || messagesReceivedSort === 'descending') {
      setMessagesReceivedSort('ascending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => {
          if (a.message_count === null && b.message_count === null) return 0
          if (a.message_count === null) return 1
          if (b.message_count === null) return -1
          return a.message_count > b.message_count ? 1 : -1
        })
      )
    }
    if (messagesReceivedSort === 'ascending') {
      setMessagesReceivedSort('descending')
      setFilteredContacts(
        [...filteredContacts].sort((a, b) => {
          if (a.message_count === null && b.message_count === null) return 0
          if (a.message_count === null) return 1
          if (b.message_count === null) return -1
          return a.message_count < b.message_count ? 1 : -1
        })
      )
    }
  }

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

  const viewContact = (e, contact) => {
    e.preventDefault()
    dispatch(setOrgCurrentContact(webToGeoSafeContact(contact)))
    navigate(orgManageContactsUrls.view.viewContact)
  }

  return (
    <>
      <p className='govuk-!-margin-bottom-6 contacts-table-panel'>
        {filteredContacts.length !== contacts.length ? 'Showing ' : ''}
        {filteredContacts.length !== contacts.length
          ? filteredContacts.length
          : ''}
        {filteredContacts.length !== contacts.length ? ' of ' : ''}
        {contacts.length}
        {contactPrefix ? ' ' + contactPrefix : ''}
        {contacts.length === 1 ? ' contact' : ' contacts'}{' '}
        <span style={{ margin: '0 20px' }}>|</span>
        <span style={{ color: '#1d70b8' }}>
          {selectedContacts.length}{' '}
          {selectedContacts.length === 1 ? 'contact' : 'contacts'} selected{' '}
        </span>
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
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={contactNameSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(contactNameSort, setContactNameSort, (contact) => {
                    return contact.firstname + contact.lastname
                  })}
              >
                Name
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={jobTitleSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(jobTitleSort, setJobTitleSort, (contact) => {
                    return contact.additionals.jobTitle
                  })}
              >
                Job title
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={emailSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(emailSort, setEmailSort, (contact) => {
                    return contact.emails[0]
                  })}
              >
                Email
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={linkedLocationsSort}
            >
              <button type='button' onClick={() => sortLinkedLocations()}>
                Linked locations
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={messagesReceivedSort}
            >
              <button type='button' onClick={() => sortMessagesReceived()}>
                Messages received in
                <br /> last 2 years for current
                <br /> linked locations
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
                <Link
                  className='govuk-link'
                  // onClick={(e) => onAction(e, 'view', contact)}
                  onClick={(e) => viewContact(e, contact)}
                >
                  {contact.firstname}
                  {contact.lastname.length > 0 ? ' ' + contact.lastname : ''}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {contact.additionals.jobTitle}
              </td>
              <td className='govuk-table__cell'>{contact.emails[0]}</td>
              <td className='govuk-table__cell'>
                {contact.linked_locations?.length}
              </td>
              <td className='govuk-table__cell'>
                {contact.message_count}
              </td>
              <td className='govuk-table__cell'>
                <Link className='govuk-link' onClick={(e) => onAction(e, actionText, contact)}>
                  {actionText}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
