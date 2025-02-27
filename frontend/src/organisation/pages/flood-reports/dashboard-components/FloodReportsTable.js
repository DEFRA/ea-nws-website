import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../common/assets/images/flood_warning.svg'
import severeFloodWarningIcon from '../../../../common/assets/images/severe_flood_warning.svg'
import FloodDataInformationPopup from '../../../../common/components/custom/FloodDataInformationPopup'
import AlertType from '../../../../common/enums/AlertType'

export default function FloodReportsTable({
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

  // Format the effective date as the last updated time.
  const formatTime = (time) => {
    const dateObj = new Date(time * 1000)
    const datePart = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    const timeString = dateObj
      .toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      .toLowerCase()
    const timePart = timeString.replace(':', '.').replace(' ', '')
    return `${datePart} at ${timePart}`
  }

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
    const taCode =
      warning.alert.mode.zoneDesc.placemarks[0].geometry.extraInfo.find(
        (info) => info.id === 'TA_CODE'
      )?.value?.s || '-'

    const taName =
      warning.alert.mode.zoneDesc.placemarks[0].geometry.extraInfo.find(
        (info) => info.id === 'TA_NAME'
      )?.value?.s || '-'

    const floodInfo = {
      locationData: {
        address: warning.address
      },
      floodData: {
        name: taName,
        code: taCode,
        type: warning.alert.type,
        updatedTime: formatTime(warning.alert.effectiveDate)
      }
    }
    setPopupWarning([floodInfo])
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupWarning(null)
    setPopupVisible(false)
  }

  // Sort standard data
  const sortTableData = (sortType, setSort, data) => {
    const getValue = (obj, path) => {
      // Parse JSON string from other field to pull out relevant values
      const otherStr = obj.additionals.find((item) => item.id === 'other')
        ?.value.s
      const otherData = otherStr ? JSON.parse(otherStr) : {}
      const objLocationName =
        obj.alert.mode.zoneDesc.placemarks[0].geometry.extraInfo.find(
          (info) => info.id === 'TA_NAME'
        )?.value?.s || '-'
      const objLocationType = otherData.location_type || '-'
      const objAlertTime = obj.alert ? obj.alert.effectiveDate : 0
      const objBusCriticality = otherData.business_criticality || '-'

      if (path === 'locationName') {
        return objLocationName
      } else if (path === 'alert.effectiveDate') {
        return objAlertTime
      } else if (path === 'locationType') {
        return objLocationType
      } else if (path === 'businessCriticality') {
        return objBusCriticality
      } else {
        return (
          path.split('.').reduce((acc, part) => acc && acc[part], obj) || ''
        )
      }
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
        <colgroup>
          <col style={{ width: '25%' }} />
        </colgroup>
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
                    'locationName'
                  )
                }
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
                    'alert.type'
                  )
                }
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
              <button
                type='button'
                onClick={() => {
                  sortTableData(
                    locationTypeSort,
                    setLocationTypeSort,
                    'locationType'
                  )
                }}
              >
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
                onClick={() => {
                  sortTableData(
                    businessCriticalitySort,
                    setBusinessCriticalitySort,
                    'businessCriticality'
                  )
                }}
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
                    'alert.effectiveDate'
                  )
                }
              >
                Last
                <br /> updated
              </button>
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedWarnings.map((warning, index) => {
            const locationName =
              warning.alert.mode.zoneDesc.placemarks[0].geometry.extraInfo.find(
                (info) => info.id === 'TA_NAME'
              )?.value?.s || '-'

            const locNameObj = warning.additionals.find(
              (item) => item.id === 'locationName'
            )
            const boundary = locNameObj ? locNameObj.value.s : ''

            let otherData = {}
            const otherStr = warning.additionals.find(
              (item) => item.id === 'other'
            )?.value.s
            otherData = otherStr ? JSON.parse(otherStr) : {}
            const locationType = otherData.location_type || '-'
            const businessCriticality = otherData.business_criticality || '-'
            const linkedContacts = warning.linked_contacts?.length
            const lastUpdated = formatTime(warning.alert.effectiveDate)

            return (
              <tr key={index} className='govuk-table__row'>
                <td className='govuk-table__cell'>
                  <p className='govuk-hint' style={{ marginBottom: '0.2em' }}>
                    {boundary}
                  </p>
                  <Link
                    className='govuk-link'
                    onClick={(e) => {
                      e.preventDefault()
                      openPopup(warning)
                    }}
                  >
                    {locationName}
                  </Link>
                </td>
                <td className='govuk-table__cell'>
                  <div className='reports-table-icon-position'>
                    {warning.alert &&
                      warning.alert.type === AlertType.SEVERE_FLOOD_WARNING && (
                        <img
                          src={severeFloodWarningIcon}
                          alt='Flood warning icon'
                          style={{ width: '2em', height: '2em' }}
                        />
                      )}
                    {warning.alert &&
                      warning.alert.type === AlertType.FLOOD_WARNING && (
                        <img
                          src={floodWarningIcon}
                          alt='Flood warning icon'
                          style={{ width: '2em', height: '2em' }}
                        />
                      )}
                    {warning.alert &&
                      warning.alert.type === AlertType.FLOOD_ALERT && (
                        <img
                          src={floodAlertIcon}
                          alt='Flood alert icon'
                          style={{ width: '2em', height: '2em' }}
                        />
                      )}
                    {warning.alert ? warning.alert.name : '-'}
                  </div>
                </td>{' '}
                <td className='govuk-table__cell'>{locationType}</td>
                <td className='govuk-table__cell'>{businessCriticality}</td>
                <td className='govuk-table__cell'>{linkedContacts}</td>
                <td className='govuk-table__cell'>{lastUpdated}</td>
              </tr>
            )
          })}
        </tbody>{' '}
      </table>
      {popupVisible && popupWarning && (
        <FloodDataInformationPopup
          onClose={closePopup}
          locationsFloodInformation={popupWarning}
        />
      )}
    </>
  )
}
