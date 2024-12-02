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
  contactNameFilter,
  setContactNameFilter,
  selectedJobTitleFilters,
  setSelectedJobTitleFilters,
  selectedKeywordFilters,
  setSelectedKeywordFilters,
  selectedLinkedFilters,
  setSelectedLinkedFilters
}) {
  const jobTitles = [
    ...new Set(
      contacts
        .map((contact) => contact.job_title)
        .filter((jobTitle) => jobTitle) // filters out undefined entries
    )
  ]

  const keywords = [
    ...new Set(
      contacts.flatMap(contact => contact.keywords)
    )
  ]

  const linkedLocations = [
    ...new Set(['No', 'Yes'])
  ]

  // search filters visibility
  const [contactNameVisible, setContactNameVisible] = useState(false)
  const [jobTitleVisible, setJobTitleVisible] = useState(selectedJobTitleFilters.length > 0)
  const [keywordVisible, setKeywordVisible] = useState(selectedKeywordFilters.length > 0)
  const [linkedVisible, setLinkedVisible] = useState(selectedLinkedFilters.length > 0)

  // handle filters applied
  const handleFilterChange = (e, setFilters) => {
    const { value } = e.target
    setFilters((prev) => {
      if (selectedFilters.includes(value)) {
        setSelectedFilters([
          ...selectedFilters.filter((preference) => preference !== value)
        ])
        return prev.filter((preference) => preference !== value)
      } else {
        setSelectedFilters([...selectedFilters, value])
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
          .includes(contactNameFilter)
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

    // Apply keyword filter
    if (selectedKeywordFilters.length > 0) {
      filteredContacts = filteredContacts.filter((contact) =>
      selectedKeywordFilters.some(
          keyword => contact.keywords.includes(keyword)
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
    setSelectedKeywordFilters([])
    setSelectedLinkedFilters([])
  }

  // Contact name filter
  const contactNameSearchFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3' />
      <div
        className='contacts-filter-name-section'
        onClick={() => setContactNameVisible(!contactNameVisible)}
      >
        <FontAwesomeIcon
          icon={contactNameVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <label className='govuk-label'
            style={{
              color: '#1d70b8'
            }}>
            Contact name
          </label>
      </div>
      {(contactNameVisible || contactNameFilter.length > 0) && (
        <div class='govuk-form-group'
          style={{
            paddingLeft: 20,
            paddingRight: 20
        } }>
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
        <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3'/>
        <div
          className='contacts-filter-other-section'
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <FontAwesomeIcon icon={visible ? faAngleUp : faAngleDown} size='lg' />
          &nbsp;
          <label className='govuk-label'
            style={{
              color: '#1d70b8'
            }}>
            {filterTitle}
          </label>
        </div>
        {(visible) && (
          <div className='govuk-checkboxes govuk-checkboxes--small'
            style={{
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
              maxHeight: 160
            }}>
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
        <div className='selected-filter'
          style={{
            backgroundColor: '#f3f2f1',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 1,
            paddingBottom: 11
          }}>
        <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
          {filterName}
        </h3>
        {filterArray.map((filter, index) => (
          <div key={index} className='filter'
            style={{
              borderStyle: 'solid',
              borderWidth: 'thin',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              height: 34,
              paddingLeft: 10,
              paddingRight: 10
            }}>
            <label className='govuk-label'
              style={{ fontSize: 18 }}>
              {filter}&nbsp;
            </label>
            <FontAwesomeIcon icon={faXmark} 
              style={{ width: 16, height: 16 }}
              onClick={() => {
                setFilterArray(filterArray.filter((item) => item !== filter))
              }}/>
          </div>
        ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className='contacts-filter-panel'>
        <div className='contacts-filter-header'>
          <h1 className='govuk-heading-m govuk-!-margin-bottom-2'>Filter</h1>
        </div>

        {/* Selected filters */}
        {selectedFilters?.length > 0 && (
          <div className='contacts-filter-selected'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f3f2f1',
                paddingLeft: 20,
                paddingRight: 20
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
              'Keywords',
              selectedKeywordFilters,
              setSelectedKeywordFilters
            )}
            {selectedFilterContents(
              'Linked locations',
              selectedLinkedFilters,
              setSelectedLinkedFilters
            )}
          </div>
        )}

        <div className=' govuk-!-margin-top-6'
          style={{
            paddingLeft: 20,
            paddingRight: 20
          }}>
          <Button
            text='Apply filters'
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
          'Keywords',
          keywords,
          selectedKeywordFilters,
          setSelectedKeywordFilters,
          keywordVisible,
          setKeywordVisible
        )}

        {otherFilter(
          'Linked locations',
          linkedLocations,
          selectedLinkedFilters,
          setSelectedLinkedFilters,
          linkedVisible,
          setLinkedVisible
        )}
    </div>
    </>
  )
}
