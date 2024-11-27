import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function ContactsTable ({
  contacts,
  displayedContacts,
  filteredContacts,
  selectedContacts,
  setSelectedContacts,
  setFilteredContacts,
  resetPaging,
  setResetPaging,
  onAction
}) {
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
    // setResetPaging(!resetPaging)
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
    // setResetPaging(!resetPaging)
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
    // setResetPaging(!resetPaging)
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
    // setResetPaging(!resetPaging)
  }

  const sortMessagesReceived = () => {
    
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

  return (
    <>
      <p
        className='govuk-!-margin-bottom-6'
        style={{ display: 'flex', color: '#505a5f' }}
      >
        {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}{' '}
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
            <th scope='col' className='govuk-table__header' aria-sort={contactNameSort}>
              <button type='button' onClick={() => sortContactNames()}>
                Name
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
                <Link onClick={(e) => onAction(e, 'view', contact)}>
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
                <Link onClick={(e) => onAction(e, 'delete', contact)}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
