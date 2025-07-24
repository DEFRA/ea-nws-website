import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../common/components/gov-uk/CheckBox'
import AlertType from '../../../../common/enums/AlertType'

export default function FloodReportFilter ({
  locationsAffected,
  setFilteredLocationsAffected,
  resetPaging,
  setResetPaging,
  filters,
  updateFilter,
  clearFilters,
  setFilterErrorMessages
}) {
  const EMPTY_LABEL = '(empty)'
  // Search filter visibility
  const [visibility, setVisibility] = useState({
    dateRange: false,
    locationName: false,
    warningType: false,
    locationType: false,
    businessCriticality: false
  })

  const toggleVisibility = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const warningTypes = [
    ...new Set(['Severe flood warnings', 'Flood warnings', 'Flood alerts'])
  ]

  const businessCriticalityTypes = [
    ...new Set(
      locationsAffected
        .map(
          (location) => {
            const temp = location.locationData.additionals.other?.business_criticality || ''
            return temp?.trim() !== '' ? temp : EMPTY_LABEL
          }
        )
    )
  ]

  const locationTypes = [
    ...new Set(
      locationsAffected
        .map((location) => {
          const temp = location.locationData.additionals.other?.location_type || ''
          return temp?.trim() !== '' ? temp : EMPTY_LABEL
        })
    )
  ]

  const handleFilterChange = (e, key) => {
    const { value } = e.target
    updateFilter(
      key,
      filters[key].includes(value)
        ? filters[key].filter((item) => item !== value)
        : [...filters[key], value]
    )
  }

  const [dateFromError, setDateFromError] = useState(null)
  const [dateToError, setDateToError] = useState(null)

  const resetErrors = () => {
    setDateFromError(null)
    setDateToError(null)
    setFilterErrorMessages?.([])
  }

  const filterLocationsAffected = async (event) => {
    event.preventDefault()
    let filtered = [...locationsAffected]

    if (filters.dateFrom || filters.dateTo) {
      const { date: dateFrom, errorMessage: dateFromErrorMessage } =
        validateAndConvertDate(filters.dateFrom, 'from')

      const { date: dateTo, errorMessage: dateToErrorMessage } =
        validateAndConvertDate(filters.dateTo, 'to')

      if (!dateFromErrorMessage && !dateToErrorMessage) {
        filtered = filtered.filter(
          (location) =>
            location.floodData.startDate >= dateFrom &&
            location.floodData.lastUpdatedTime <= dateTo
        )

        resetErrors()
      } else {
        setDateFromError(dateFromErrorMessage)
        setDateToError(dateToErrorMessage)
        setFilterErrorMessages?.([dateFromErrorMessage, dateToErrorMessage])
      }
    }

    if (filters.locationName) {
      filtered = filtered.filter((location) =>
        location.locationData.additionals.locationName
          .toLowerCase()
          .includes(filters.locationName.toLowerCase())
      )
    }

    if (filters.selectedWarningTypes.length > 0) {
      const filterMap = {
        'Severe flood warnings': AlertType.SEVERE_FLOOD_WARNING,
        'Flood warnings': AlertType.FLOOD_WARNING,
        'Flood alerts': AlertType.FLOOD_ALERT
      }
      filtered = filtered.filter((location) =>
        filters.selectedWarningTypes.some((filter) =>
          location.floodData.type.includes(filterMap[filter])
        )
      )
    }

    if (filters.selectedLocationTypes.length > 0) {
      filtered = filtered.filter((location) =>
        {
          const temp = location.locationData.additionals?.other?.location_type || ''
          const isEmpty = temp.trim() === ''
          return filters.selectedLocationTypes.some((f) =>
            f === EMPTY_LABEL ? isEmpty : f === temp
          )
        }
      )
    }

    if (filters.selectedBusinessCriticalities.length > 0) {
      filtered = filtered.filter((location) => {
        const temp = location.locationData.additionals?.other?.business_criticality || ''
        const isEmpty = temp.trim() === ''
        return filters.selectedBusinessCriticalities.some((f) =>
          f === EMPTY_LABEL ? isEmpty : f === temp
        )
      })
    }

    setResetPaging(!resetPaging)
    setFilteredLocationsAffected(filtered)
  }

  const validateAndConvertDate = (dateStr, type) => {
    if (!dateStr || typeof dateStr !== 'string') {
      return {
        errorMessage: `Enter 'Date ${type}' in correct format, like 09/02/2023 or 1 5 2021`
      }
    }

    dateStr = dateStr.trim()
    let day, month, year
    // check for dd/MM/yyyy format
    const slashFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    // check for d M yyyy format (with spaces)
    const spaceFormat = /^(\d{1,2})\s+(\d{1,2})\s+(\d{4})$/

    let match = dateStr.match(slashFormat)

    if (match) {
      day = parseInt(match[1], 10)
      month = parseInt(match[2], 10) - 1
      year = parseInt(match[3], 10)
    } else {
      // try space format
      match = dateStr.match(spaceFormat)
      if (match) {
        day = parseInt(match[1], 10)
        month = parseInt(match[2], 10) - 1
        year = parseInt(match[3], 10)
      } else {
        return {
          errorMessage: `Enter 'Date ${type}' in correct format, like 09/02/2023 or 1 5 2021`
        }
      }
    }

    if (day < 1 || day > 31 || month < 0 || month > 11) {
      return {
        errorMessage: `Enter 'Date ${type}' in correct format, like 09/02/2023 or 1 5 2021`
      }
    }

    // Create date object
    const date = new Date(year, month, day)
    const minDate = new Date(2012, 0, 1)
    if (date < minDate) {
      return {
        errorMessage: `'Date ${type}' cannot be before 1 January 2012`
      }
    }

    return {
      date
    }
  }

  const dateRangeFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3' />
      <div
        className='warnings-filter-name-section govuk-!-margin-bottom-3'
        onClick={() => toggleVisibility('dateRange')}
      >
        <FontAwesomeIcon
          icon={visibility.dateRange ? faAngleUp : faAngleDown}
          size='lg'
        />
        <label className='govuk-label filter-label'>Date range</label>
      </div>
      {visibility.dateRange && (
        <div className='govuk-form-group warnings-date-range-filter'>
          <div className={`${dateFromError && 'govuk-form-group--error'}`}>
            <p class='govuk-body govuk-!-font-weight-bold govuk-!-margin-top-3 govuk-!-margin-bottom-0'>
              Date from
            </p>
            <p class='govuk-caption-m govuk-!-margin-top-0'>
              For example, 31/01/2023
            </p>
            {dateFromError && (
              <p id='govuk-text-input-error' className='govuk-error-message'>
                {dateFromError}
              </p>
            )}
            <div className='input-with-icon'>
              <input
                className={`govuk-input ${
                  dateFromError && 'govuk-input--error'
                } govuk-input-calendar-icon`}
                id='date-range-from'
                type='text'
                value={filters.dateFrom}
                onChange={(event) =>
                  updateFilter('dateFrom', event.target.value)}
              />
              <FontAwesomeIcon
                icon={faCalendar}
                size='xl'
                className='input-calendar-icon'
              />
            </div>
          </div>
          <div className={`${dateToError && 'govuk-form-group--error'}`}>
            <p class='govuk-body govuk-!-font-weight-bold govuk-!-margin-top-3 govuk-!-margin-bottom-0'>
              Date to
            </p>
            <p class='govuk-caption-m govuk-!-margin-top-0'>
              For example, 31/01/2023
            </p>
            {dateToError && (
              <p id='govuk-text-input-error' className='govuk-error-message'>
                {dateToError}
              </p>
            )}
            <div className='input-with-icon'>
              <input
                className={`govuk-input ${
                  dateToError && 'govuk-input--error'
                } govuk-input-calendar-icon`}
                id='date-range-from'
                type='text'
                value={filters.dateTo}
                onChange={(event) => updateFilter('dateTo', event.target.value)}
              />
              <FontAwesomeIcon
                icon={faCalendar}
                size='xl'
                className='input-calendar-icon'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )

  const locationNameSearchFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3' />
      <div
        className='warnings-filter-name-section'
        onClick={() => toggleVisibility('locationName')}
      >
        <FontAwesomeIcon
          icon={visibility.locationName ? faAngleUp : faAngleDown}
          size='lg'
        />
        <label className='govuk-label filter-label'>Location name</label>
      </div>
      {visibility.locationName && (
        <div className='govuk-form-group warnings-name-filter'>
          <div className='input-with-icon'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='input-search-icon'
            />
            <input
              className='govuk-input govuk-input-search-icon govuk-!-margin-top-3'
              id='location-name'
              type='text'
              value={filters.locationName}
              onChange={(event) =>
                updateFilter('locationName', event.target.value)}
            />
          </div>
        </div>
      )}
    </>
  )

  const FilterSection = ({ title, options, filterKey }) => (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-!-margin-left-3 govuk-!-margin-right-3' />
      <div
        className='warnings-filter-other-section'
        onClick={() => toggleVisibility(filterKey)}
      >
        <FontAwesomeIcon
          icon={visibility[filterKey] ? faAngleUp : faAngleDown}
          size='lg'
        />
        &nbsp;
        <label className='govuk-label' style={{ color: '#1d70b8' }}>
          {title}
        </label>
      </div>
      {visibility[filterKey] && (
        <div className='govuk-checkboxes govuk-checkboxes--small warnings-select-filter'>
          {options.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={filters[filterKey].includes(option)}
              onChange={(e) => handleFilterChange(e, filterKey)}
            />
          ))}
        </div>
      )}
    </>
  )

  // selected filters
  const renderSelectedFilters = () => {
    const selectedFilters = []

    const { date: dateFrom, errorMessage: dateFromErrorMessage } =
      validateAndConvertDate(filters.dateFrom, 'from')

    const { date: dateTo, errorMessage: dateToErrorMessage } =
      validateAndConvertDate(filters.dateTo, 'to')

    if (!dateFromErrorMessage && !dateToErrorMessage) {
      selectedFilters.push(
        <div
          key='dateRange'
          className='selected-filter warnings-selected-filter-panel'
        >
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            Date range:
          </h3>

          <div
            className='filter warnings-selected-filter'
            style={{ height: '4rem' }}
          >
            <label className='govuk-label warnings-selected-filter-label'>
              {moment(dateFrom).format('MMMM Do YYYY')} to{' '}
              {moment(dateTo).format('MMMM Do YYYY')}
            </label>
            <FontAwesomeIcon
              icon={faXmark}
              className='warnings-selected-filter-icon'
              onClick={() => {
                updateFilter('dateFrom', '')
                updateFilter('dateTo', '')
                filterLocationsAffected({ preventDefault: () => {} })
              }}
            />
          </div>
        </div>
      )
    }

    if (filters.locationName) {
      selectedFilters.push(
        <div
          key='locationName'
          className='selected-filter warnings-selected-filter-panel'
        >
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            Location Name:
          </h3>

          <div className='filter warnings-selected-filter'>
            <label className='govuk-label warnings-selected-filter-label'>
              {' '}
              {filters.locationName}
            </label>
            <FontAwesomeIcon
              icon={faXmark}
              className='warnings-selected-filter-icon'
              onClick={() => {
                updateFilter('locationName', '')
                filterLocationsAffected({ preventDefault: () => {} })
              }}
            />
          </div>
        </div>
      )
    }

    if (filters.selectedWarningTypes.length > 0) {
      selectedFilters.push(
        <div
          key='warningType'
          className='selected-filter warnings-selected-filter-panel'
        >
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            Warning Types:
          </h3>
          <div className='warnings-selected-filter-row'>
            {filters.selectedWarningTypes.map((warningType, index) => (
              <div className='filter warnings-selected-filter' key={index}>
                <label className='govuk-label warnings-selected-filter-label'>
                  {warningType}
                </label>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='warnings-selected-filter-icon'
                  onClick={() => {
                    updateFilter(
                      'selectedWarningTypes',
                      filters.selectedWarningTypes.filter(
                        (type) => type !== warningType
                      )
                    )
                    filterLocationsAffected({ preventDefault: () => {} })
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (filters.selectedLocationTypes.length > 0) {
      selectedFilters.push(
        <div
          key='locationType'
          className='selected-filter warnings-selected-filter-panel'
        >
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            Location Types:
          </h3>
          <div className='warnings-selected-filter-row'>
            {filters.selectedLocationTypes.map((locationType, index) => (
              <div className='filter warnings-selected-filter' key={index}>
                <label className='govuk-label warnings-selected-filter-label'>
                  {locationType}
                </label>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='warnings-selected-filter-icon'
                  onClick={() => {
                    updateFilter(
                      'selectedLocationTypes',
                      filters.selectedLocationTypes.filter(
                        (type) => type !== locationType
                      )
                    )
                    filterLocationsAffected({ preventDefault: () => {} })
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (filters.selectedBusinessCriticalities.length > 0) {
      selectedFilters.push(
        <div
          key='businessCriticality'
          className='selected-filter warnings-selected-filter-panel'
        >
          <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-2'>
            Business Criticality:
          </h3>
          <div className='warnings-selected-filter-row'>
            {filters.selectedBusinessCriticalities.map(
              (businessCriticality, index) => (
                <div className='filter warnings-selected-filter' key={index}>
                  <label className='govuk-label warnings-selected-filter-label'>
                    {businessCriticality}
                  </label>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className='warnings-selected-filter-icon'
                    onClick={() => {
                      updateFilter(
                        'selectedBusinessCriticalities',
                        filters.selectedBusinessCriticalities.filter(
                          (criticality) => criticality !== businessCriticality
                        )
                      )
                      filterLocationsAffected({ preventDefault: () => {} })
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )
    }

    return selectedFilters.length > 0
      ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }}
        >
          {selectedFilters}
        </div>
        )
      : null
  }

  return (
    <div className='warnings-filter-panel'>
      <div className='warnings-filter-header'>
        <h1 className='govuk-heading-m govuk-!-margin-bottom-2'>Filter</h1>
      </div>

      {/* Selected filters */}
      <div className='warnings-selected-filters-panel'>
        <div className='warnings-selected-filters-section'>
          <h2 className='govuk-heading-s' style={{ marginBottom: '0' }}>
            Selected filters
          </h2>
          <Link
            onClick={(event) => {
              event.preventDefault()
              clearFilters()
              resetErrors()
            }}
            className='govuk-body govuk-link inline-link'
            style={{ marginLeft: 'auto', marginBottom: '0' }}
          >
            Clear filters
          </Link>
        </div>

        {renderSelectedFilters()}
      </div>

      <div className='govuk-!-margin-top-6 warnings-apply-filters'>
        <Button
          text='Apply filters'
          className='govuk-button govuk-button--primary'
          onClick={filterLocationsAffected}
        />
      </div>

      {/* Filters */}
      {'dateFrom' in filters && 'dateTo' in filters && dateRangeFilter}
      {locationNameSearchFilter}

      <FilterSection
        title='Warning type'
        options={warningTypes}
        filterKey='selectedWarningTypes'
      />
      <FilterSection
        title='Location type'
        options={locationTypes}
        filterKey='selectedLocationTypes'
      />
      <FilterSection
        title='Business criticality'
        options={businessCriticalityTypes}
        filterKey='selectedBusinessCriticalities'
      />
    </div>
  )
}
