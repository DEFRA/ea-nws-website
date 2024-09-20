import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Button from '../../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../../common/components/gov-uk/CheckBox'

export default function SearchFilter({
  locations,
  setFilteredLocations,
  setResetPaging,
  selectedLocationTypeFilters,
  setSelectedLocationTypeFilters,
  selectedFloodMessagesAvailbleFilters,
  setSelectedFloodMessagesAvailbleFilters,
  selectedBusinessCriticalityFilters,
  setSelectedBusinessCriticalityFilters
}) {
  // filters
  const [locationNameFilter, setLocationNameFilter] = useState('')

  const locationTypes = [
    ...new Set(
      locations.map(
        (location) => location.meta_data.location_additional.location_type
      )
    )
  ]
  const floodMessagesAvailble = ['Yes', 'No']
  const businessCriticality = ['High', 'Medium', 'Low']

  // search filters visibility
  const [locationNameVisible, setLocationNameVisible] = useState(true)
  const [locationTypeVisible, setLocationTypeVisible] = useState(true)
  const [floodMessagesVisible, setFloodMessagesVisible] = useState(true)
  const [businessCriticalityVisible, setBusinessCriticalityVisible] =
    useState(true)

  // handle filters applied
  const handleLocationTypeFilterChange = (event) => {
    const { value } = event.target
    setSelectedLocationTypeFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const handleFloodMessagesAvailbleFilterChange = (event) => {
    const { value } = event.target
    setSelectedFloodMessagesAvailbleFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const handleBusinessCriticalityFilterChange = (event) => {
    const { value } = event.target
    setSelectedBusinessCriticalityFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const filterLocations = () => {
    let filteredLocations = locations

    // Apply Location name filter
    if (locationNameFilter) {
      filteredLocations = filteredLocations.filter(
        (location) => location.name === locationNameFilter
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
    if (selectedFloodMessagesAvailbleFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) => {
        if (
          selectedFloodMessagesAvailbleFilters.includes('Yes') &&
          selectedFloodMessagesAvailbleFilters.includes('No')
        ) {
          // return all locations
          return true
        } else if (selectedFloodMessagesAvailbleFilters.includes('Yes')) {
          return location.alert_categories.length > 0
        } else if (selectedFloodMessagesAvailbleFilters.includes('No')) {
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

    setFilteredLocations(filteredLocations)
  }

  return (
    <>
      <div className='govuk-heading-m locations-filter-header'>
        <h1 className='govuk-heading-m'>Filter</h1>
      </div>

      <Button
        text='Apply Filter'
        className='govuk-button govuk-button--primary'
        onClick={() => filterLocations()}
      />
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3' />

      {/* Location name filter */}
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
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Location type filter */}
      <div
        className='locations-filter-section'
        onClick={() => {
          setLocationTypeVisible(!locationTypeVisible)
        }}
      >
        <FontAwesomeIcon
          icon={locationTypeVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Location type</p>
      </div>
      {locationTypeVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {locationTypes.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedLocationTypeFilters.includes(option)}
              onChange={handleLocationTypeFilterChange}
            />
          ))}
        </div>
      )}
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Flood messages available filter */}
      <div
        className='locations-filter-section'
        onClick={() => {
          setFloodMessagesVisible(!floodMessagesVisible)
        }}
      >
        <FontAwesomeIcon
          icon={floodMessagesVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Flood messages available</p>
      </div>
      {floodMessagesVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {floodMessagesAvailble.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedFloodMessagesAvailbleFilters.includes(option)}
              onChange={handleFloodMessagesAvailbleFilterChange}
            />
          ))}
        </div>
      )}
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Business criticality filter */}
      <div
        className='locations-filter-section'
        onClick={() => {
          setBusinessCriticalityVisible(!businessCriticalityVisible)
        }}
      >
        <FontAwesomeIcon
          icon={businessCriticalityVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Business criticality</p>
      </div>
      {businessCriticalityVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {businessCriticality.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedBusinessCriticalityFilters.includes(option)}
              onChange={handleBusinessCriticalityFilterChange}
            />
          ))}
        </div>
      )}
    </>
  )
}
