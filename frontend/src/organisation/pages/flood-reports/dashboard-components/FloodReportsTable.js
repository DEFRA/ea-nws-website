import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../common/assets/images/flood_warning.svg'
import FloodReportPopup from './FloodReportPopup'

export default function FloodReportsTable ({
  warnings,
  displayedWarnings,
  filteredWarnings,
  setFilteredWarnings,
  resetPaging,
  setResetPaging
}) {
  const [popupVisible, setPopupVisible] = useState(false)
  const [popupWarning, setPopupWarning] = useState(null)

  const [locationNameSort, setLocationNameSort] = useState('none')
  const [warningTypeSort, setWarningTypeSort] = useState('none')
  const [locationTypeSort, setLocationTypeSort] = useState('none')
  const [businessCriticalitySort, setBusinessCriticalitySort] = useState('none')
  const [linkedContactsSort, setLinkedContactsSort] = useState('none')
  const [lastUpdatedSort, setlastUpdatedSort] = useState('none')

  useEffect(() => {
    setFilteredWarnings(warnings)
    setLocationNameSort('none')
    setWarningTypeSort('none')
    setBusinessCriticalitySort('none')
    setLocationTypeSort('none')
    setLinkedContactsSort('none')
    setlastUpdatedSort('none')
  }, [warnings])

  // Popup logic
  const openPopup = (warning) => {
    setPopupWarning(warning)
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupWarning(null)
    setPopupVisible(false)
  }

  // Sort standard data
  const sortTableData = (sortType, setSort, data) => {
    const getValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj) || ''
    }

    if (sortType === 'none' || sortType === 'descending') {
      setSort('ascending')
      setFilteredWarnings(
        [...filteredWarnings].sort((a, b) => {
          const valueA = getValue(a, data)
          const valueB = getValue(b, data)

          // Place empty strings at the end
          if (
            (valueA === '' || valueA == null) &&
            (valueB === '' || valueB == null)
          ) {
            return 0
          }
          if (valueA === '' || valueA == null) return 1
          if (valueB === '' || valueB == null) return -1

          return (valueA || '').localeCompare(valueB || '')
        })
      )
    }
    if (sortType === 'ascending') {
      setSort('descending')
      setFilteredWarnings(
        [...filteredWarnings].sort((a, b) => {
          const valueA = getValue(a, data)
          const valueB = getValue(b, data)
          return (valueB || '').localeCompare(valueA || '')
        })
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortLocationType = () => {
    if (locationTypeSort === 'none' || locationTypeSort === 'descending') {
      setLocationTypeSort('ascending')
      setFilteredWarnings(
        [...filteredWarnings].sort((a, b) =>
          a.alert_categories.length > b.alert_categories.length ? 1 : -1
        )
      )
    }
    if (locationTypeSort === 'ascending') {
      setLocationTypeSort('descending')
      setFilteredWarnings(
        [...filteredWarnings].sort((a, b) =>
          a.alert_categories.length < b.alert_categories.length ? 1 : -1
        )
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortLinkedContacts = () => {
    // TODO: when linked contacts are available
  }

  return (
    <>
      <p
        className='govuk-!-margin-bottom-3'
        style={{ display: 'flex', color: '#505a5f' }}
      >
        {filteredWarnings.length !== warnings.length &&
          'Showing ' + filteredWarnings.length + ' of '}
        {warnings.length} {warnings.length === 1 ? 'location' : 'locations'}
      </p>
      <table className='govuk-table govuk-table--small-text-until-tablet reports-table-data-position'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={locationNameSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortTableData(
                    locationNameSort,
                    setLocationNameSort,
                    'meta_data.location_additional.location_name'
                  )}
              >
                Location name
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={warningTypeSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortTableData(
                    warningTypeSort,
                    setWarningTypeSort,
                    'meta_data.alert_categories'
                  )}
              >
                Warning <br />
                type
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={locationTypeSort}
            >
              <button type='button' onClick={() => sortLocationType()}>
                Location or
                <br /> boundary type
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={businessCriticalitySort}
            >
              <button
                type='button'
                onClick={() =>
                  sortTableData(
                    businessCriticalitySort,
                    setBusinessCriticalitySort,
                    'meta_data.location_additional.business_criticality'
                  )}
              >
                Business
                <br /> criticality
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={linkedContactsSort}
            >
              <button type='button' onClick={() => sortLinkedContacts()}>
                Linked
                <br /> contacts
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={lastUpdatedSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortTableData(
                    lastUpdatedSort,
                    setlastUpdatedSort,
                    '' // TODO: Change  to use the warning time values when available
                  )}
              >
                Last
                <br /> updated
              </button>
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {filteredWarnings.map((warning, index) => (
            <tr key={index} className='govuk-table__row'>
              <td className='govuk-table__cell'>
                <p className='govuk-hint' style={{ marginBottom: '0.2em' }}>
                  {`Boundary_${warning.meta_data.location_additional.location_name.slice(
                    -2
                  )}`}
                  {/* TODO: Link in boundaries when real warning data available */}
                </p>
                <Link
                  className='govuk-link'
                  onClick={(e) => {
                    e.preventDefault()
                    openPopup(warning)
                  }}
                >
                  {warning.meta_data.location_additional.location_name}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {' '}
                {warning.alert_categories.map((type, i) => (
                  <div key={i} className='reports-table-icon-position'>
                    {type === 'Alert' && (
                      <img
                        src={floodAlertIcon}
                        alt='Flood alert icon'
                        style={{ width: '2em', height: '2em' }}
                      />
                    )}
                    {type === 'Warning' && (
                      <img
                        src={floodWarningIcon}
                        alt='Flood warning icon'
                        style={{ width: '2em', height: '2em' }}
                      />
                    )}
                    Flood {type.toLowerCase()}
                  </div>
                ))}
              </td>
              <td className='govuk-table__cell'>
                {warning.meta_data.location_additional.location_type}
              </td>
              <td className='govuk-table__cell'>
                {warning.meta_data.location_additional.business_criticality ||
                  '-'}
              </td>
              <td className='govuk-table__cell'>*linkedContacts*</td>
              <td className='govuk-table__cell'>*lastUpdated*</td>
            </tr>
          ))}
        </tbody>{' '}
      </table>
      {popupVisible && popupWarning && (
        <FloodReportPopup
          onClose={closePopup}
          title={popupWarning.meta_data.location_additional.location_name}
          warning={popupWarning}
        />
      )}
    </>
  )
}
