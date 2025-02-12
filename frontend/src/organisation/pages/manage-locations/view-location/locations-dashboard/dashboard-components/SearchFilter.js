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
  // TODO: Combine filter values into a single object
  locations,
  setFilteredLocations,
  resetPaging,
  setResetPaging,
  selectedFilters,
  setSelectedFilters,
  selectedLocationTypeFilters,
  setSelectedLocationTypeFilters,
  selectedBusinessCriticalityFilters,
  setSelectedBusinessCriticalityFilters,
  selectedKeywordFilters,
  setSelectedKeywordFilters,
  selectedGroundWaterRiskFilters,
  setSelectedGroundWaterRiskFilters,
  selectedRiverSeaRiskFilters,
  setSelectedRiverSeaRiskFilters,
  selectedFloodMessagesAvailableFilters,
  setSelectedFloodMessagesAvailableFilters,
  selectedFloodMessagesSentFilters,
  setSelectedFloodMessagesSentFilters,
  selectedLinkedFilters,
  setSelectedLinkedFilters,
  printMode
}) {
  // filters
  const [locationNameFilter, setLocationNameFilter] = useState('')

  const locationTypes = [
    ...new Set(
      locations
        .map((location) => location.additionals.other?.location_type)
        .filter((locationType) => locationType) // filters out undefined entries
    )
  ]

  // the below probably needs updated unless it can only be Yes or No
  const floodMessagesAvailable = ['Yes', 'No']
  const floodMessagesSent = []

  const businessCriticality = [
    ...new Set(
      locations
        .map((location) => location.additionals.other?.business_criticality)
        .filter((businessCriticality) => businessCriticality) // filters out undefined entries
    )
  ]

  const riverSeaRisk = [
    ...new Set(
      locations
        .map((location) => location.riverSeaRisk?.title)
        .filter((title) => title)
    )
  ]

  const groundWaterRisk = [
    ...new Set(
      locations
        .map((location) => location.groundWaterRisk?.title)
        .filter((title) => title)
    )
  ]

  const keywords = [
    ...new Set(
      locations.flatMap(location => location.additionals.keywords)
    )
  ]

  const linkedLocations = [...new Set(['No', 'Yes'])]

  // Visibility filters
  const [locationNameVisible, setLocationNameVisible] = useState(false)
  const [locationTypeVisible, setLocationTypeVisible] = useState(
    selectedLocationTypeFilters.length > 0
  )
  const [floodMessagesAvailableVisible, setFloodMessagesAvailableVisible] =
    useState(selectedFloodMessagesAvailableFilters.length > 0)
  const [floodMessagesSentVisible, setFloodMessagesSentVisible] = useState(
    selectedFloodMessagesSentFilters.length > 0
  )
  const [businessCriticalityVisible, setBusinessCriticalityVisible] = useState(
    selectedBusinessCriticalityFilters.length > 0
  )
  const [riverSeaRiskVisible, setRiverSeaRiskVisible] = useState(
    selectedRiverSeaRiskFilters.length > 0
  )
  const [groundWaterRiskVisible, setGroundWaterRiskVisible] = useState(
    selectedGroundWaterRiskFilters.length > 0
  )
  const [keywordVisible, setKeywordVisible] = useState(
    selectedKeywordFilters.length > 0
  )
  const [linkedVisible, setLinkedVisible] = useState(
    selectedLinkedFilters.length > 0
  )

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

  const filterLocations = () => {
    let filteredLocations = locations

    // Apply Location name filter
    if (locationNameFilter.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        location.additionals.locationName
          .toLowerCase()
          .includes(locationNameFilter.toLowerCase())
      )
    }

    // Apply Location Type filter
    if (selectedLocationTypeFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedLocationTypeFilters.includes(
          location.additionals.other?.location_type
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
          return location.additionals.other?.alertTypes?.length > 0
        } else if (selectedFloodMessagesAvailableFilters.includes('No')) {
          return location.additionals.other?.alertTypes?.length === 0
        }

        // Default return none (this should never be reached)
        return false
      })
    }

    // Apply Business Criticality filter
    if (selectedBusinessCriticalityFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedBusinessCriticalityFilters.includes(
          location.additionals.other?.business_criticality
        )
      )
    }

    // Apply river sea risk filter
    if (selectedRiverSeaRiskFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedRiverSeaRiskFilters.includes(location.riverSeaRisk?.title)
      )
    }

    // Apply ground water risk filter
    if (selectedGroundWaterRiskFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedGroundWaterRiskFilters.includes(location.groundWaterRisk?.title)
      )
    }

    // Apply keyword filter
    if (selectedKeywordFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedKeywordFilters.some((keyword) =>
          location.additionals.keywords.includes(keyword)
        )
      )
    }

    // Apply linked locations filter
    if (selectedLinkedFilters.length > 0) {
      filteredLocations = filteredLocations.filter(
        (location) =>
          (selectedLinkedFilters.includes('Yes') &&
            location.linked_contacts?.length > 0) ||
          (selectedLinkedFilters.includes('No') &&
            location.linked_contacts?.length === 0)
      )
    }

    setResetPaging(!resetPaging)
    setFilteredLocations(filteredLocations)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilteredLocations(locations)
    setSelectedFilters([])
    setLocationNameFilter('')
    setSelectedLocationTypeFilters([])
    setSelectedFloodMessagesAvailableFilters([])
    setSelectedFloodMessagesSentFilters([])
    setSelectedBusinessCriticalityFilters([])
    setSelectedRiverSeaRiskFilters([])
    setSelectedGroundWaterRiskFilters([])
    setSelectedKeywordFilters([])
    setSelectedLinkedFilters([])
  }

  // Location name filter
  const locationNameSearchFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3' />
      <div
        className='locations-filter-name-section'
        onClick={() => setLocationNameVisible(!locationNameVisible)}
      >
        <FontAwesomeIcon
          icon={locationNameVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <label className='govuk-label' style={{ color: '#1d70b8' }}>
          Location name
        </label>
      </div>
      {(locationNameVisible || locationNameVisible.length > 0) && (
        <div className='govuk-form-group locations-name-filter'>
          <div className='input-with-icon'>
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
        <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3' />
        <div
          className='locations-filter-other-section'
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <FontAwesomeIcon icon={visible ? faAngleUp : faAngleDown} size='lg' />
          &nbsp;
          <label className='govuk-label' style={{ color: '#1d70b8' }}>
            {filterTitle}
          </label>
        </div>
        {visible && (
          <div className='govuk-checkboxes govuk-checkboxes--small locations-select-filter'>
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
        <div className='locations-selected-filter-panel'>
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            {filterName}
          </h3>
          <div className='locations-selected-filter-row'>
            {filterArray.map((filter, index) => (
              <div key={index} className='locations-selected-filter'>
                <label className='govuk-label locations-selected-filter-label'>
                  {filter}&nbsp;
                </label>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='locations-selected-filter-icon'
                  onClick={() => {
                    setFilterArray(
                      filterArray.filter((item) => item !== filter)
                    )
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='locations-filter-panel'>
        <div className='locations-filter-header'>
          <h1 className='govuk-heading-m govuk-!-margin-bottom-2'>Filter</h1>
        </div>

        {/* Selected filters */}
        {(selectedFilters?.length > 0 || locationNameFilter.length > 0) && (
          <div className='locations-selected-filters-panel'>
            <div className='locations-selected-filters-section'>
              <h2 className='govuk-heading-s' style={{ marginBottom: '0' }}>
                Selected filters
              </h2>
              <Link
                onClick={clearFilters}
                className={!printMode ? 'govuk-body govuk-link inline-link' : 'govuk-body'}
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
              'Keywords',
              selectedKeywordFilters,
              setSelectedKeywordFilters
            )}
            {selectedFilterContents(
              'Groundwater flood risk',
              selectedGroundWaterRiskFilters,
              setSelectedGroundWaterRiskFilters
            )}
            {selectedFilterContents(
              'Rivers and sea flood risk',
              selectedRiverSeaRiskFilters,
              setSelectedRiverSeaRiskFilters
            )}
            {selectedFilterContents(
              'Flood messages available',
              selectedFloodMessagesAvailableFilters,
              setSelectedFloodMessagesAvailableFilters
            )}
            {selectedFilterContents(
              'Flood messages sent',
              selectedFloodMessagesSentFilters,
              setSelectedFloodMessagesSentFilters
            )}
            {selectedFilterContents(
              'Linked to contacts',
              selectedLinkedFilters,
              setSelectedLinkedFilters
            )}
          </div>
        )}

        <div className=' govuk-!-margin-top-6 locations-apply-filters'>
          <Button
            text='Apply filters'
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
          'Keywords',
          keywords,
          selectedKeywordFilters,
          setSelectedKeywordFilters,
          keywordVisible,
          setKeywordVisible
        )}

        {otherFilter(
          'Groundwater flood risk',
          groundWaterRisk,
          selectedGroundWaterRiskFilters,
          setSelectedGroundWaterRiskFilters,
          groundWaterRiskVisible,
          setGroundWaterRiskVisible
        )}

        {otherFilter(
          'Rivers and sea flood risk',
          riverSeaRisk,
          selectedRiverSeaRiskFilters,
          setSelectedRiverSeaRiskFilters,
          riverSeaRiskVisible,
          setRiverSeaRiskVisible
        )}

        {otherFilter(
          'Flood messages available',
          floodMessagesAvailable,
          selectedFloodMessagesAvailableFilters,
          setSelectedFloodMessagesAvailableFilters,
          floodMessagesAvailableVisible,
          setFloodMessagesAvailableVisible
        )}

        {otherFilter(
          'Flood messages sent',
          floodMessagesSent,
          selectedFloodMessagesSentFilters,
          setSelectedFloodMessagesSentFilters,
          floodMessagesSentVisible,
          setFloodMessagesSentVisible
        )}

        {otherFilter(
          'Linked to contacts',
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
