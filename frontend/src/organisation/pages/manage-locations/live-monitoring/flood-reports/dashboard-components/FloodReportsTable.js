import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../../../common/assets/images/flood_warning.svg'
import severeFloodWarningIcon from '../../../../../../common/assets/images/severe_flood_warning.svg'
import FloodDataInformationPopup from '../../../../../../common/components/custom/FloodDataInformationPopup'
import AlertType from '../../../../../../common/enums/AlertType'
import { getLocationAdditional } from '../../../../../../common/redux/userSlice'
import { formatDateTime } from '../../../../../../common/services/formatters/DateTimeFormatter'

export default function FloodReportsTable ({
  locationsWithAlerts,
  displayedAlerts,
  filteredAlerts,
  setFilteredAlerts,
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
    setFilteredAlerts(locationsWithAlerts)
    setLocationNameSort('none')
    setWarningTypeSort('none')
    setBusinessCriticalitySort('none')
    setLocationTypeSort('none')
    setLinkedContactsSort('none')
    setlastUpdatedSort('none')
  }, [locationsWithAlerts])

  const getOtherData = (additionals) => {
    const otherStr = additionals.find((item) => item.id === 'other')?.value.s
    try {
      return otherStr ? JSON.parse(otherStr) : {}
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  const getExtraInfo = (extraInfo, id) => {
    if (extraInfo) {
      for (let i = 0; i < extraInfo.length; i++) {
        if (extraInfo[i].id === id) {
          return extraInfo[i].value?.s
        }
      }
    }
    return ''
  }

  // Popup logic
  const openPopup = (affectedLocation) => {
    const taCode = getExtraInfo(
      affectedLocation.alert.mode.zoneDesc.placemarks[0].geometry.extraInfo,
      'TA_CODE'
    )

    const taName = getExtraInfo(
      affectedLocation.alert.mode.zoneDesc.placemarks[0].geometry.extraInfo,
      'TA_NAME'
    )

    const floodInfo = {
      locationData: {
        address: affectedLocation.address
      },
      floodData: {
        name: taName,
        code: taCode,
        type: affectedLocation.alert.type,
        updatedTime: formatDateTime(affectedLocation.alert.effectiveDate)
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
      const otherData = getOtherData(obj.additionals)
      const objLocationName = getExtraInfo(
        obj.alert.mode.zoneDesc.placemarks[0].geometry.extraInfo,
        'TA_NAME'
      )
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
      setFilteredAlerts(
        [...filteredAlerts].sort((a, b) => {
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
      setFilteredAlerts(
        [...filteredAlerts].sort((a, b) => {
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
        {filteredAlerts.length !== locationsWithAlerts.length &&
          'Showing ' + filteredAlerts.length + ' of '}
        {locationsWithAlerts.length}{' '}
        {locationsWithAlerts.length === 1 ? 'location' : 'locations'}
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
                    'locationName'
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
                    'alert.type'
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
          {displayedAlerts.map((affectedLocation, index) => {
            const locationName = getExtraInfo(
              affectedLocation.alert.mode.zoneDesc.placemarks[0].geometry
                .extraInfo,
              'TA_NAME'
            )

            const locName = getLocationAdditional(
              affectedLocation.additionals,
              'locationName'
            )

            const otherData = getOtherData(affectedLocation.additionals)
            const locationType = otherData.location_type || '-'
            const businessCriticality = otherData.business_criticality || '-'
            const linkedContacts = affectedLocation.linked_contacts?.length
            const lastUpdated = formatDateTime(
              affectedLocation.alert.effectiveDate
            )

            return (
              <tr key={index} className='govuk-table__row'>
                <td className='govuk-table__cell'>
                  <p className='govuk-hint' style={{ marginBottom: '0.2em' }}>
                    {locName}
                  </p>
                  <Link
                    className='govuk-link'
                    onClick={(e) => {
                      e.preventDefault()
                      openPopup(affectedLocation)
                    }}
                  >
                    {locationName}
                  </Link>
                </td>
                <td className='govuk-table__cell'>
                  <div className='reports-table-icon-position'>
                    {affectedLocation.alert &&
                      affectedLocation.alert.type ===
                        AlertType.SEVERE_FLOOD_WARNING && (
                          <img
                            src={severeFloodWarningIcon}
                            alt='Flood warning icon'
                            style={{ width: '2em', height: '2em' }}
                          />
                    )}
                    {affectedLocation.alert &&
                      affectedLocation.alert.type ===
                        AlertType.FLOOD_WARNING && (
                          <img
                            src={floodWarningIcon}
                            alt='Flood warning icon'
                            style={{ width: '2em', height: '2em' }}
                          />
                    )}
                    {affectedLocation.alert &&
                      affectedLocation.alert.type === AlertType.FLOOD_ALERT && (
                        <img
                          src={floodAlertIcon}
                          alt='Flood alert icon'
                          style={{ width: '2em', height: '2em' }}
                        />
                    )}
                    {affectedLocation.alert ? affectedLocation.alert.name : '-'}
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
