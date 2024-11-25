import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../../../common/components/gov-uk/CheckBox'

export default function SearchFilter ({
  contacts,
  setFilteredContacts,
  resetPaging,
  setResetPaging,
  selectedFilters,
  setSelectedFilters,
  selectedJobTitleFilters,
  setSelectedJobTitleFilters,
  selectedEmailFilters,
  setSelectedEmailFilters,
  selectedLinkedFilters,
  setSelectedLinkedFilters
}) {
  // filters
  const [contactNameFilter, setContactNameFilter] = useState('')
  const [jobTitleFilter, setJobTitleFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [linkedFilter, setLinkedFilter] = useState('')

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

  const linkedLocations = [
    ...new Set(['No', 'Yes'])
  ]

  // search filters visibility
  const [contactNameVisible, setContactNameVisible] = useState(true)
  const [jobTitleVisible, setJobTitleVisible] = useState(true)
  const [emailVisible, setEmailVisible] = useState(true)
  const [linkedVisible, setLinkedVisible] = useState(true)

  // handle filters applied
  const handleFilterChange = (e, setFilters) => {
    const { value } = e.target
    setFilters((prev) => {
      if (prev.includes(value)) {
        setSelectedFilters(
          ...selectedFilters,
          ...prev.filter((preference) => preference !== value)
        )
        return prev.filter((preference) => preference !== value)
      } else {
        setSelectedFilters([...selectedFilters, ...prev, value])
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

    // Apply linked locations filter
    if (selectedLinkedFilters.length > 0) {
      filteredContacts = filteredContacts.filter((contact) =>
        (selectedLinkedFilters.includes('Yes') && contact.linked_locations.length > 0) ||
        (selectedLinkedFilters.includes('No') && contact.linked_locations.length == 0)
      )
    }

    setResetPaging(!resetPaging)
    setFilteredContacts(filteredContacts)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilteredContacts(contacts)
    setSelectedFilters([])
    setSelectedJobTitleFilters([])
    setSelectedEmailFilters([])
    setSelectedLinkedFilters([])
  }

  // Contact name filter
  const contactNameSearchFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3' />
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
    </>
  )

  // All other filters
  const otherFilter = (
    filterTitle,
    filterType,
    selectedFilterType,
    setSelectedFilterType,
    visible,
    setVisible
  ) => {
    return (
      <>
        <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />
        <div
          className='contacts-filter-section'
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <FontAwesomeIcon icon={visible ? faAngleUp : faAngleDown} size='lg' />
          <p className='contacts-filter-title'>{filterTitle}</p>
        </div>
        {visible && (
          <div className='govuk-checkboxes govuk-checkboxes--small'>
            {filterType.map((option) => (
              <CheckBox
                key={option}
                label={option}
                value={option}
                checked={selectedFilterType.includes(option)}
                onChange={(e) => handleFilterChange(e, setSelectedFilterType)}
              />
            ))}
          </div>
        )}
      </>
    )
  }

  // Selected filters
  const selectedFilterContents = (filterName, filterArray, setFilterArray) => {
    if (filterArray.length === 0) return null

    return (
      <>
        <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
          {filterName}
        </h3>
        {filterArray.map((filter, index) => (
          <div key={index} className='filter'>
            {filter}

            <button
              className='filter-button'
              onClick={() => {
                setFilterArray(filterArray.filter((item) => item !== filter))
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <div className='contacts-filter-header'>
        <h1 className='govuk-heading-m govuk-!-margin-bottom-2'>Filter</h1>
      </div>

      {/* Selected filters */}
      {selectedFilters?.length > 0 && (
        <div className='contacts-filter-selected'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <h2 className='govuk-heading-s' style={{ marginBottom: '0' }}>
              Selected filters
            </h2>
            <Link
              onClick={clearFilters}
              className='govuk-body govuk-link inline-link'
              style={{ marginLeft: 'auto', marginBottom: '0' }}
            >
              Clear filters
            </Link>
          </div>
          {selectedFilterContents(
            'Job title',
            selectedJobTitleFilters,
            setSelectedJobTitleFilters
          )}
          {selectedFilterContents(
            'Email',
            selectedEmailFilters,
            setSelectedEmailFilters
          )}
          {selectedFilterContents(
            'Linked locations',
            selectedLinkedFilters,
            setSelectedLinkedFilters
          )}
        </div>
      )}

      <div className=' govuk-!-margin-top-6'>
        <Button
          text='Apply Filter'
          className='govuk-button govuk-button--primary'
          onClick={() => filterContacts()}
        />
      </div>

      {/* Filters */}
      {contactNameSearchFilter}

      {otherFilter(
        'Job title',
        jobTitles,
        selectedJobTitleFilters,
        setSelectedJobTitleFilters,
        jobTitleVisible,
        setJobTitleVisible,
      )}

      {otherFilter(
        'Email',
        emails,
        selectedEmailFilters,
        setSelectedEmailFilters,
        emailVisible,
        setEmailVisible
      )}

      {otherFilter(
        'Linked locations',
        linkedLocations,
        selectedLinkedFilters,
        setSelectedLinkedFilters,
        linkedVisible,
        setLinkedVisible
      )}
    </>
  )
}
