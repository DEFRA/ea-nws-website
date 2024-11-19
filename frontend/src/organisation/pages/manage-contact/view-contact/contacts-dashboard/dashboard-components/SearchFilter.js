import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Button from '../../../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../../../common/components/gov-uk/CheckBox'

export default function SearchFilter ({
  contacts,
  setFilteredContacts,
  resetPaging,
  setResetPaging,
  selectedJobTitleFilters,
  setSelectedJobTitleFilters,
  selectedEmailFilters,
  setSelectedEmailFilters
}) {
  // filters
  const [contactNameFilter, setContactNameFilter] = useState('')
  const [jobTitleFilter, setJobTitleFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')

  const jobTitles = [
    ...new Set(
      contacts
        .map((contact) => contact.job_title)
        .filter((jobTitle) => jobTitle) // filters out undefined entries
    )
  ]

  const emails = [
    ...new Set(
      contacts
        .map((contact) => contact.email)
        .filter((email) => email) // filters out undefined entries
    )
  ]
  

  // search filters visibility
  const [contactNameVisible, setContactNameVisible] = useState(true)
  const [jobTitleVisible, setJobTitleVisible] = useState(true)
  const [emailVisible, setEmailVisible] = useState(true)

  const handleJobTitleFilterChange = (event) => {
    const { value } = event.target
    setSelectedJobTitleFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const handleEmailFilterChange = (event) => {
    const { value } = event.target
    setSelectedEmailFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const filterContacts = () => {
    let filteredContacts = contacts

    // Apply contact name filter
    if (contactNameFilter) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.name
          .toLowerCase()
          .includes(contactNameFilter.toLowerCase())
      )
    }

    // Apply job title filter
    if (selectedJobTitleFilters.length > 0) {
      filteredContacts = filteredContacts.filter((contact) =>
      selectedJobTitleFilters.includes(
          contact.job_title
        )
      )
    }

    // Apply email filter
    if (selectedEmailFilters.length > 0) {
      filteredContacts = filteredContacts.filter((contact) =>
      selectedEmailFilters.includes(
          contact.email
        )
      )
    }

    setResetPaging(!resetPaging)
    setFilteredContacts(filteredContacts)
  }

  return (
    <>
      <div className='govuk-heading-m locations-filter-header'>
        <h1 className='govuk-heading-m'>Filter</h1>
      </div>

      <Button
        text='Apply Filter'
        className='govuk-button govuk-button--primary'
        onClick={() => filterContacts()}
      />
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3' />

      {/* Contact name filter */}
      <div
        className='contacts-filter-section'
        onClick={() => setContactNameVisible(!contactNameVisible)}
      >
        <FontAwesomeIcon
          icon={contactNameVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='contacts-filter-title'>Contact name</p>
      </div>
      {contactNameVisible && (
        <div class='govuk-form-group'>
          <div class='input-with-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='input-icon' />
            <input
              className='govuk-input govuk-input-icon govuk-!-margin-top-3'
              id='contact-name'
              type='text'
              value={contactNameFilter}
              onChange={(event) => {
                setContactNameFilter(event.target.value)
              }}
            />
          </div>
        </div>
      )}
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Job title filter */}
      <div
        className='contacts-filter-section'
        onClick={() => {
          setJobTitleVisible(!jobTitleVisible)
        }}
      >
        <FontAwesomeIcon
          icon={jobTitleVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='contacts-filter-title'>Job title</p>
      </div>
      {jobTitleVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {jobTitles.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedJobTitleFilters.includes(option)}
              onChange={handleJobTitleFilterChange}
            />
          ))}
        </div>
      )}
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Email filter */}
      <div
        className='contacts-filter-section'
        onClick={() => {
          setEmailVisible(!emailVisible)
        }}
      >
        <FontAwesomeIcon
          icon={emailVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='contacts-filter-title'>Email</p>
      </div>
      {emailVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {emails.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedEmailFilters.includes(option)}
              onChange={handleEmailFilterChange}
            />
          ))}
        </div>
      )}
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />
    </>
  )
}
