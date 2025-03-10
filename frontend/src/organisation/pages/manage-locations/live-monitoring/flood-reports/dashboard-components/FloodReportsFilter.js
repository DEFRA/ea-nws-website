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
import AlertType from '../../../../../../common/enums/AlertType'

export default function FloodReportsFilter({
  locationsAffected,
  setFilteredLocationsAffected,
  resetPaging,
  setResetPaging,
  selectedFilters,
  setSelectedFilters,
  locationNameFilter,
  setLocationNameFilter,
  selectedWarningTypeFilters,
  setSelectedWarningTypeFilters,
  selectedLocationTypeFilters,
  setSelectedLocationTypeFilters,
  selectedBusinessCriticalityFilters,
  setSelectedBusinessCriticalityFilters
}) {
  // Search filter visibility
  const [locationNameVisible, setLocationNameVisible] = useState(false)
  const [warningTypeVisible, setWarningTypeVisible] = useState(false)
  const [locationTypeVisible, setLocationTypeVisible] = useState(false)
  const [businessCriticalityTypeVisible, setBusinessCriticalityTypeVisible] =
    useState(false)

  const warningTypes = [
    ...new Set(['Severe flood warnings', 'Flood warnings', 'Flood alerts'])
  ]

  const businessCriticalityTypes = [
    ...new Set(
      locationsAffected
        .map((location) => {
          return location.locationData.additionals.other.business_criticality
        })
        .filter((val) => val !== '')
    )
  ]

  const locationTypes = [
    ...new Set(
      locationsAffected
        .map((location) => {
          return location.locationData.additionals.other.location_type
        })
        .filter((val) => val !== '')
    )
  ]

  // Handle filters applied
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

  const filterLocationsAffected = (event) => {
    event.preventDefault()
    let filteredLocationsAffected = [...locationsAffected]

    // Apply location name filter
    if (locationNameFilter) {
      filteredLocationsAffected = filteredLocationsAffected.filter((location) =>
        location.locationData.additionals.locationName
          .toLowerCase()
          .includes(locationNameFilter.toLowerCase())
      )
    }

    if (selectedWarningTypeFilters.length > 0) {
      const filterMap = {
        'Severe flood warnings': AlertType.SEVERE_FLOOD_WARNING,
        'Flood warnings': AlertType.FLOOD_WARNING,
        'Flood alerts': AlertType.FLOOD_ALERT
      }

      filteredLocationsAffected = filteredLocationsAffected.filter((location) =>
        selectedWarningTypeFilters.some((filter) =>
          location.floodData.types.includes(filterMap[filter])
        )
      )
    }

    // Apply location or boundary type filter
    if (selectedLocationTypeFilters.length > 0) {
      filteredLocationsAffected = filteredLocationsAffected.filter(
        (location) => {
          return selectedLocationTypeFilters.includes(
            location.locationData.additionals.other.location_type
          )
        }
      )
    }

    // Apply business criticality filter
    if (selectedBusinessCriticalityFilters.length > 0) {
      filteredLocationsAffected = filteredLocationsAffected.filter(
        (location) => {
          return selectedBusinessCriticalityFilters.includes(
            location.locationData.additionals.other.business_criticality
          )
        }
      )
    }

    setResetPaging(!resetPaging)
    setFilteredLocationsAffected(filteredLocationsAffected)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilteredLocationsAffected(locationsAffected)
    setSelectedFilters([])
    setLocationNameFilter('')
    setSelectedWarningTypeFilters([])
    setSelectedLocationTypeFilters([])
    setSelectedBusinessCriticalityFilters([])
  }

  // Location name filter
  const locationNameSearchFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3' />
      <div
        className='contacts-filter-name-section'
        onClick={() => setLocationNameVisible(!locationNameVisible)}
      >
        <FontAwesomeIcon
          icon={locationNameVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <label className='govuk-label filter-label'>Location name</label>
      </div>
      {(locationNameVisible || locationNameFilter.length > 0) && (
        <div className='govuk-form-group warnings-name-filter'>
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
          className='contacts-filter-other-section'
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <FontAwesomeIcon icon={visible ? faAngleUp : faAngleDown} size='lg' />
          &nbsp;
          <label className='govuk-label filter-label'>{filterTitle}</label>
        </div>
        {visible && (
          <div className='govuk-checkboxes govuk-checkboxes--small warnings-select-filter'>
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

  const areFiltersSelected = () =>
    selectedWarningTypeFilters.length > 0 ||
    selectedLocationTypeFilters.length > 0 ||
    selectedBusinessCriticalityFilters.length > 0

  // Selected filters
  const selectedFilterContents = (filterName, filterArray, setFilterArray) => {
    if (filterArray.length === 0) return null

    return (
      <>
        <div className='selected-filter warnings-selected-filter-panel'>
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            {filterName}
          </h3>
          {filterArray.map((filter, index) => (
            <div key={index} className='filter warnings-selected-filter'>
              <label className='govuk-label warnings-selected-filter-label'>
                {filter}
              </label>
              <FontAwesomeIcon
                icon={faXmark}
                className='warnings-selected-filter-icon'
                onClick={() => {
                  setFilterArray(filterArray.filter((item) => item !== filter))
                }}
              />
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
        {areFiltersSelected() && (
          <div className='contacts-filter-selected'>
            <div className='warnings-selected-filters-section'>
              <h2 className='govuk-heading-s'>Selected filters</h2>
              <Link
                onClick={clearFilters}
                className='govuk-body govuk-link inline-link'
              >
                Clear filters
              </Link>
            </div>
            {selectedFilterContents(
              'Warning type',
              selectedWarningTypeFilters,
              setSelectedWarningTypeFilters
            )}
            {selectedFilterContents(
              'Location or boundary type',
              selectedLocationTypeFilters,
              setSelectedLocationTypeFilters
            )}
            {selectedFilterContents(
              'Business criticality',
              selectedBusinessCriticalityFilters,
              setSelectedBusinessCriticalityFilters
            )}
          </div>
        )}

        <div className=' govuk-!-margin-top-6 warnings-apply-filters'>
          <Button
            text='Apply filters'
            className='govuk-button govuk-button--primary'
            onClick={(event) => filterLocationsAffected(event)}
          />
        </div>

        {/* Filters */}
        {locationNameSearchFilter}

        {otherFilter(
          'Warning type',
          warningTypes,
          selectedWarningTypeFilters,
          setSelectedWarningTypeFilters,
          warningTypeVisible,
          setWarningTypeVisible
        )}

        {otherFilter(
          'Location or boundary type',
          locationTypes,
          selectedLocationTypeFilters,
          setSelectedLocationTypeFilters,
          locationTypeVisible,
          setLocationTypeVisible
        )}

        {otherFilter(
          'Business criticality',
          businessCriticalityTypes,
          selectedBusinessCriticalityFilters,
          setSelectedBusinessCriticalityFilters,
          businessCriticalityTypeVisible,
          setBusinessCriticalityTypeVisible
        )}
      </div>
    </>
  )
}
