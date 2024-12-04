import { useEffect, useState } from 'react'

export default function FloodReportsTable ({
  warnings,
  displayedWarnings,
  filteredWarnings,
  setFilteredWarnings,
  resetPaging,
  setResetPaging
}) {
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

  // Sort standard data
  const sortData = (sortType, setSort, data) => {
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

  const sortGetsFloodMessages = () => {
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
    // TODO when linked contacts are available
  }

  return (
    <>
      <p
        className='govuk-!-margin-bottom-3'
        style={{ display: 'flex', color: '#505a5f' }}
      >
        {warnings.length !== displayedWarnings.length &&
          'Showing ' + displayedWarnings.length + ' of '}
        {warnings.length} {warnings.length === 1 ? 'location' : 'locations'}
      </p>
      <table className='govuk-table govuk-table--small-text-until-tablet'>
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
                  sortData(
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
                  sortData(
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
              <button type='button' onClick={() => sortGetsFloodMessages()}>
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
                  sortData(
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
                  sortData(
                    lastUpdatedSort,
                    setlastUpdatedSort,
                    'riverSeaRisk.title' // TODO: Change this
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
                {warning.meta_data.location_additional.location_name}
              </td>
              <td className='govuk-table__cell'>
                {' '}
                {warning.alert_categories.map((type, i) => (
                  <div key={i}>Flood {type.toLowerCase()}</div>
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
    </>
  )
}
