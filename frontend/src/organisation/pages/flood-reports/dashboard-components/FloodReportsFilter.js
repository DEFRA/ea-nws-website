import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../common/components/gov-uk/CheckBox'
import AlertType from '../../../../common/enums/AlertType'

export default function FloodReportsFilter({
  warnings,
  setFilteredWarnings,
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
  selectedBusCriticalityFilters,
  setSelectedBusCriticalityFilters
}) {
  const warningTypes = [
    ...new Set(['Severe flood warnings', 'Flood warnings', 'Flood alerts'])
  ]
  const locationTypes = [
    warnings.map((warning) => {
      const otherStr = warning.additionals.find((item) => item.id === 'other')
        ?.value.s
      const otherData = otherStr ? JSON.parse(otherStr) : {}
      return otherData.location_type || ''
    })
  ].filter((val) => val !== '')
  const busCriticalityTypes = [...new Set(['High', 'Medium', 'Low'])]

  // Search filter visibility
  const [locationNameVisible, setLocationNameVisible] = useState(false)
  const [warningTypeVisible, setWarningTypeVisible] = useState(false)
  const [locationTypeVisible, setLocationTypeVisible] = useState(false)
  const [busCriticalityTypeVisible, setBusCriticalityTypeVisible] =
    useState(false)

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

  const filterWarnings = () => {
    let filteredWarnings = [...warnings]

    // Apply location name filter
    if (locationNameFilter) {
      filteredWarnings = filteredWarnings.filter((warning) =>
        warning.address.toLowerCase().includes(locationNameFilter.toLowerCase())
      )
    }

    // Apply warning type filter
    if (selectedWarningTypeFilters.length > 0) {
      filteredWarnings = filteredWarnings.filter((warning) => {
        return selectedWarningTypeFilters.some((filter) => {
          if (filter === 'Severe flood warnings') {
            return warning.alert.type === AlertType.SEVERE_FLOOD_WARNING
          }
          if (filter === 'Flood warnings') {
            return warning.alert.type === AlertType.FLOOD_WARNING
          }
          if (filter === 'Flood alerts') {
            return warning.alert.type === AlertType.FLOOD_ALERT
          }
          return false
        })
      })
    }

    // Apply location or boundary type filter
    if (selectedLocationTypeFilters.length > 0) {
      filteredWarnings = filteredWarnings.filter((warning) => {
        const otherStr = warning.additionals.find((item) => item.id === 'other')
          ?.value.s
        const otherData = otherStr ? JSON.parse(otherStr) : {}
        return selectedLocationTypeFilters.includes(
          otherData.location_type || ''
        )
      })
    }

    // Apply business criticality filter
    if (selectedBusCriticalityFilters.length > 0) {
      filteredWarnings = filteredWarnings.filter((warning) => {
        const otherStr = warning.additionals.find((item) => item.id === 'other')
          ?.value.s
        const otherData = otherStr ? JSON.parse(otherStr) : {}
        return selectedLocationTypeFilters.includes(
          otherData.business_criticality || ''
        )
      })
    }

    setResetPaging(!resetPaging)
    setFilteredWarnings(filteredWarnings)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilteredWarnings(warnings)
    setSelectedFilters([])
    setLocationNameFilter('')
    setSelectedWarningTypeFilters([])
    setSelectedLocationTypeFilters([])
    setSelectedBusCriticalityFilters([])
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
        <label
          className='govuk-label'
          style={{
            color: '#1d70b8'
          }}
        >
          Location name
        </label>
      </div>
      {(locationNameVisible || locationNameFilter.length > 0) && (
        <div
          className='govuk-form-group'
          style={{
            paddingLeft: 20,
            paddingRight: 20
          }}
        >
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
          <label
            className='govuk-label'
            style={{
              color: '#1d70b8'
            }}
          >
            {filterTitle}
          </label>
        </div>
        {visible && (
          <div
            className='govuk-checkboxes govuk-checkboxes--small'
            style={{
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
              maxHeight: 160
            }}
          >
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
    selectedBusCriticalityFilters.length > 0

  // Selected filters
  const selectedFilterContents = (filterName, filterArray, setFilterArray) => {
    if (filterArray.length === 0) return null

    return (
      <>
        <div
          className='selected-filter'
          style={{
            backgroundColor: '#f3f2f1',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 1,
            paddingBottom: 11
          }}
        >
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            {filterName}
          </h3>
          {filterArray.map((filter, index) => (
            <div
              key={index}
              className='filter'
              style={{
                borderStyle: 'solid',
                borderWidth: 'thin',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                height: 34,
                paddingLeft: 10,
                paddingRight: 10,
                margin: '0 8px 8px 0'
              }}
            >
              <label className='govuk-label' style={{ fontSize: 18 }}>
                {filter}
              </label>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ width: 16, height: 16 }}
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
              selectedBusCriticalityFilters,
              setSelectedBusCriticalityFilters
            )}
          </div>
        )}

        <div
          className=' govuk-!-margin-top-6'
          style={{
            paddingLeft: 20,
            paddingRight: 20
          }}
        >
          <Button
            text='Apply filters'
            className='govuk-button govuk-button--primary'
            onClick={() => filterWarnings()}
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
          busCriticalityTypes,
          selectedBusCriticalityFilters,
          setSelectedBusCriticalityFilters,
          busCriticalityTypeVisible,
          setBusCriticalityTypeVisible
        )}
      </div>
    </>
  )
}
