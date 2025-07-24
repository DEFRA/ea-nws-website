import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserType from '../../../common/enums/UserType'
import { setOrgCurrentContact } from '../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'

export default function UsersTable({
  contacts,
  displayedContacts,
  filteredContacts,
  selectedContacts,
  setSelectedContacts,
  setFilteredContacts,
  onAction,
  actionText,
  contactPrefix,
  filterVisible
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)
  const [userTypeSort, setUserTypeSort] = useState('none')
  const [contactNameSort, setContactNameSort] = useState('none')
  const [jobTitleSort, setJobTitleSort] = useState('none')
  const [emailSort, setEmailSort] = useState('none')
  const [linkedLocationsSort, setLinkedLocationsSort] = useState('none')
  const [messagesReceivedSort, setMessagesReceivedSort] = useState('none')

  useEffect(() => {
    setUserTypeSort('none')
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
    if (
      messagesReceivedSort === 'none' ||
      messagesReceivedSort === 'descending'
    ) {
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
    dispatch(setOrgCurrentContact(contact))
    navigate(orgManageContactsUrls.view.viewContact)
  }

  const viewLinkedLocations = (e, contact) => {
    e.preventDefault()
    dispatch(setOrgCurrentContact(contact))
    navigate(orgManageContactsUrls.view.viewLinkedLocations)
  }

  const LoadingDots = (
    <div className='loading-dots'>
      <span className='dot one'>.</span>
      <span className='dot two'>.</span>
      <span className='dot three'>.</span>
    </div>
  )

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
        {contacts.length === 1 ? ' user' : ' users'}{' '}
        <span style={{ margin: '0 20px' }}>|</span>
        <span style={{ color: '#1d70b8' }}>
          {selectedContacts.length}{' '}
          {selectedContacts.length === 1 ? 'user' : 'users'} selected{' '}
        </span>
      </p>
      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header'>
              <div
                style={{ marginTop: '-10px' }}
                className='govuk-checkboxes govuk-checkboxes--small'
                data-module='govuk-checkboxes'
              >
                <div className='govuk-checkboxes__item'>
                  <input
                    className='govuk-checkboxes__input'
                    type='checkbox'
                    aria-label='Select all users'
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
              aria-sort={userTypeSort}
            >
              <button
                type='button'
                aria-label={`Sort by user type, currently ${
                  userTypeSort === 'none' ? 'unsorted' : userTypeSort
                }`}
                onClick={() =>
                  sortData(
                    userTypeSort,
                    setUserTypeSort,
                    (contact) => contact.role || ''
                  )
                }
              >
                User type
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={contactNameSort}
            >
              <button
                type='button'
                aria-label={`Sort by name, currently ${
                  contactNameSort === 'none' ? 'unsorted' : contactNameSort
                }`}
                onClick={() =>
                  sortData(contactNameSort, setContactNameSort, (contact) => {
                    return contact.firstname + (contact.lastname || '')
                  })
                }
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
                aria-label={`Sort by job title, currently ${
                  jobTitleSort === 'none' ? 'unsorted' : jobTitleSort
                }`}
                onClick={() =>
                  sortData(jobTitleSort, setJobTitleSort, (contact) => {
                    return contact.additionals.jobTitle
                  })
                }
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
                aria-label={`Sort by email, currently ${
                  emailSort === 'none' ? 'unsorted' : emailSort
                }`}
                onClick={() =>
                  sortData(emailSort, setEmailSort, (contact) => {
                    return contact.emails[0]
                  })
                }
              >
                Email
              </button>
            </th>
            {/* Conditionally render these two columns only when filter panel is not open */}
            {!filterVisible && (
              <>
                <th
                  scope='col'
                  className='govuk-table__header'
                  aria-sort={linkedLocationsSort}
                >
                  <button
                    type='button'
                    aria-label={`Sort by number of linked locations, currently ${
                      linkedLocationsSort === 'none'
                        ? 'unsorted'
                        : linkedLocationsSort
                    }`}
                    onClick={() => sortLinkedLocations()}
                  >
                    Linked locations
                  </button>
                </th>
                <th
                  scope='col'
                  className='govuk-table__header'
                  aria-sort={messagesReceivedSort}
                >
                  <button
                    type='button'
                    aria-label={`Sort by number of messages received, currently ${
                      messagesReceivedSort === 'none'
                        ? 'unsorted'
                        : messagesReceivedSort
                    }`}
                    onClick={() => sortMessagesReceived()}
                  >
                    Flood messages issued
                  </button>
                </th>
                <th scope='col' className='govuk-table__header' />
              </>
            )}
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedContacts.map((contact, index) => (
            <tr className='govuk-table__row' key={index}>
              <th scope='row' className='govuk-table__header'>
                <div
                  style={{ marginTop: '-10px' }}
                  className='govuk-checkboxes govuk-checkboxes--small'
                  data-module='govuk-checkboxes'
                >
                  <div className='govuk-checkboxes__item'>
                    <input
                      className='govuk-checkboxes__input'
                      type='checkbox'
                      aria-label={`Select ${contact.firstname}${
                        contact?.lastname?.length > 0
                          ? ' ' + contact?.lastname
                          : ''
                      }`}
                      checked={selectedContacts.includes(contact)}
                      onChange={() => handleContactSelected(contact)}
                    />
                    <label className='govuk-label govuk-checkboxes__label' />
                  </div>
                </div>
              </th>
              <td className='govuk-table__cell'>
                {contact.pendingRole === UserType.PendingAdmin ? (
                  <strong className='govuk-tag govuk-tag--orange'>
                    Pending admin
                  </strong>
                ) : contact.role === UserType.Admin ? (
                  <strong className='govuk-tag govuk-tag--purple'>Admin</strong>
                ) : (
                  <strong className='govuk-tag govuk-tag--green'>
                    Contact
                  </strong>
                )}
              </td>
              <td className='govuk-table__cell'>
                <Link
                  className='govuk-link'
                  onClick={(e) => viewContact(e, contact)}
                >
                  {contact.firstname}
                  {contact?.lastname?.length > 0 ? ' ' + contact?.lastname : ''}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {contact.additionals.jobTitle}
              </td>
              <td className='govuk-table__cell'>{contact.emails[0]}</td>
              {/* Conditionally render cells */}
              {!filterVisible && (
                <>
                  <td className='govuk-table__cell'>
                    {contact.linked_locations !== undefined ? (
                      <Link
                        className='govuk-link'
                        onClick={(e) => viewLinkedLocations(e, contact)}
                      >
                        {contact.linked_locations}
                      </Link>
                    ) : (
                      LoadingDots
                    )}
                  </td>
                  <td className='govuk-table__cell'>
                    {contact.message_count !== undefined
                      ? contact.message_count
                      : LoadingDots}
                  </td>
                  <td className='govuk-table__cell'>
                    <Link
                      className='govuk-link'
                      aria-label={`Delete ${contact.firstname}${
                        contact?.lastname?.length > 0
                          ? ' ' + contact?.lastname
                          : ''
                      }`}
                      onClick={(e) => onAction(e, actionText, contact)}
                    >
                      {actionText}
                    </Link>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
