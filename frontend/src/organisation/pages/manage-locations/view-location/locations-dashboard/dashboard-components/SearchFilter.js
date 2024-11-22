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
  locations,
  setFilteredLocations,
  resetPaging,
  setResetPaging,
  selectedFilters,
  setSelectedFilters,
  selectedLocationTypeFilters,
  setSelectedLocationTypeFilters,
  selectedFloodMessagesAvailableFilters,
  setSelectedFloodMessagesAvailableFilters,
  selectedBusinessCriticalityFilters,
  setSelectedBusinessCriticalityFilters,
  riskRating,
  selectedRiskRatingFilters,
  setSelectedRiskRatingFilters
}) {
  // filters
  const [locationNameFilter, setLocationNameFilter] = useState('')

  const locationTypes = [
    ...new Set(
      locations
        .map((location) => location.meta_data.location_additional.location_type)
        .filter((locationType) => locationType) // filters out undefined entries
    )
  ]
  // the below probably needs updated unless it can only be Yes or No
  const floodMessagesAvailable = ['Yes', 'No']
  const businessCriticality = [
    ...new Set(
      locations
        .map(
          (location) =>
            location.meta_data.location_additional.business_criticality
        )
        .filter((businessCriticality) => businessCriticality) // filters out undefined entries
    )
  ]

  // search filters visibility
  const [locationNameVisible, setLocationNameVisible] = useState(false)
  const [locationTypeVisible, setLocationTypeVisible] = useState(false)
  const [floodMessagesVisible, setFloodMessagesVisible] = useState(false)
  const [businessCriticalityVisible, setBusinessCriticalityVisible] =
    useState(false)
  const [riskRatingVisible, setRiskRatingVisible] = useState(false)

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

  const filterLocations = () => {
    let filteredLocations = locations

    // Apply Location name filter
    if (locationNameFilter) {
      filteredLocations = filteredLocations.filter((location) =>
        location.location_additional.location_name
          .toLowerCase()
          .includes(locationNameFilter.toLowerCase())
      )
    }

    // Apply Location Type filter
    if (selectedLocationTypeFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedLocationTypeFilters.includes(
          location.meta_data.location_additional.location_type
        )
      )
    }

    // Apply Flood Messages filter
    if (selectedFloodMessagesAvailableFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) => {
        if (
          selectedFloodMessagesAvailableFilters.includes('Yes') &&
          selectedFloodMessagesAvailableFilters.includes('No')
        ) {
          // return all locations
          return true
        } else if (selectedFloodMessagesAvailableFilters.includes('Yes')) {
          return location.alert_categories.length > 0
        } else if (selectedFloodMessagesAvailableFilters.includes('No')) {
          return location.alert_categories.length === 0
        }

        // Default return none (this should never be reached)
        return false
      })
    }

    // Apply Business Criticality filter
    if (selectedBusinessCriticalityFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedBusinessCriticalityFilters.includes(
          location.meta_data.location_additional.business_criticality
        )
      )
    }

    // Apply risk rating filter
    if (selectedRiskRatingFilters.length > 0) {
      console.log('filtered locations: ', filteredLocations)
      console.log('selected filters: ', selectedRiskRatingFilters)
      filteredLocations = filteredLocations.filter((location) =>
        selectedRiskRatingFilters.includes(riskRating)
      )
    }

    setResetPaging(!resetPaging)
    setFilteredLocations(filteredLocations)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilteredLocations(locations)
    setSelectedFilters([])
    setSelectedLocationTypeFilters([])
    setSelectedFloodMessagesAvailableFilters([])
    setSelectedBusinessCriticalityFilters([])
  }

  // Location name filter
  const locationNameSearchFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3' />
      <div
        className='locations-filter-section'
        onClick={() => setLocationNameVisible(!locationNameVisible)}
      >
        <FontAwesomeIcon
          icon={locationNameVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Location name</p>
      </div>
      {locationNameVisible && (
        <div class='govuk-form-group'>
          <div class='input-with-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='input-icon' />
            <input
              className='govuk-input govuk-input-icon govuk-!-margin-top-3'
              id='location-name'
              type='text'
              value={locationNameFilter}
              onChange={(event) => {
                setLocationNameFilter(event.target.value)
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
          className='locations-filter-section'
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <FontAwesomeIcon icon={visible ? faAngleUp : faAngleDown} size='lg' />
          <p className='locations-filter-title'>{filterTitle}</p>
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
      <div className='locations-filter-header'>
        <h1 className='govuk-heading-m govuk-!-margin-bottom-2'>Filter</h1>
      </div>

      {/* Selected filters */}
      {selectedFilters?.length > 0 && (
        <div className='locations-filter-selected'>
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
            'Location type',
            selectedLocationTypeFilters,
            setSelectedLocationTypeFilters
          )}
          {selectedFilterContents(
            'Business criticality',
            selectedBusinessCriticalityFilters,
            setSelectedBusinessCriticalityFilters
          )}
          {selectedFilterContents(
            'Flood messages available',
            selectedFloodMessagesAvailableFilters,
            setSelectedFloodMessagesAvailableFilters
          )}
        </div>
      )}

      <div className=' govuk-!-margin-top-6'>
        <Button
          text='Apply Filter'
          className='govuk-button govuk-button--primary'
          onClick={() => filterLocations()}
        />
      </div>

      {/* Filters */}
      {locationNameSearchFilter}

      {otherFilter(
        'Location type',
        locationTypes,
        selectedLocationTypeFilters,
        setSelectedLocationTypeFilters,
        locationTypeVisible,
        setLocationTypeVisible
      )}

      {otherFilter(
        'Business criticality',
        businessCriticality,
        selectedBusinessCriticalityFilters,
        setSelectedBusinessCriticalityFilters,
        businessCriticalityVisible,
        setBusinessCriticalityVisible
      )}

      {otherFilter(
        'Flood messages available',
        floodMessagesAvailable,
        selectedFloodMessagesAvailableFilters,
        setSelectedFloodMessagesAvailableFilters,
        floodMessagesVisible,
        setFloodMessagesVisible
      )}

      {otherFilter(
        'Rivers and sea flood risk',
        riskRating,
        selectedRiskRatingFilters,
        setSelectedRiskRatingFilters,
        riskRatingVisible,
        setRiskRatingVisible
      )}
    </>
  )
}
