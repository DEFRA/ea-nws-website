import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../../../common/assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../../../../../common/assets/images/severe_flood_warning.svg'
import FloodDataInformationPopup from '../../../../../../common/components/custom/FloodDataInformationPopup'
import AlertType from '../../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../../common/enums/LocationDataType'
import { getAdditional } from '../../../../../../common/redux/userSlice'

export default function FloodReportsTable ({
  locationsAffected,
  displayedLocationsAffected,
  filteredLocationsAffected,
  setFilteredLocationsAffected,
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
    setFilteredLocationsAffected(locationsAffected)
    setLocationNameSort('none')
    setWarningTypeSort('none')
    setBusinessCriticalitySort('none')
    setLocationTypeSort('none')
    setLinkedContactsSort('none')
    setlastUpdatedSort('none')
  }, [locationsAffected])

  // Sort standard data
  const sortTableData = (sortType, setSort, data) => {
    const getValue = (obj, path) => {
      // Parse JSON string from other field to pull out relevant values
      const otherData = getAdditional(obj.additionals)
      const objLocationName = getAdditional(
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
      setFilteredLocationsAffected(
        [...filteredLocationsAffected].sort((a, b) => {
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
      setFilteredLocationsAffected(
        [...filteredLocationsAffected].sort((a, b) => {
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

  const warningTypeDisplay = {
    [AlertType.SEVERE_FLOOD_WARNING]: {
      icon: floodSevereWarningIcon,
      text: 'Severe flood warning'
    },
    [AlertType.FLOOD_WARNING]: {
      icon: floodWarningIcon,
      text: 'Flood warning'
    },
    [AlertType.FLOOD_ALERT]: {
      icon: floodAlertIcon,
      text: 'Flood alert'
    }
  }

  // flood information popup
  const [showFloodInformationData, setShowFloodInformationData] =
    useState(false)
  const [locationsFloodInformation, setLocationsFloodInformation] = useState([])

  const viewFloodInformationData = (location) => {
    setShowFloodInformationData(true)
    setLocationsFloodInformation(findAllFloodAreasAffectingLocation(location))
  }

  const findAllFloodAreasAffectingLocation = (data) => {
    // adjust grouped locations into a single location for each flood area entry in the array
    return [...locationsAffected]
      .filter((location) => location.locationData.id === data.locationData.id)
      .flatMap((location) => {
        if (location.floodData.length === 1) {
          return {
            locationData: location.locationData,
            floodData: location.floodData[0]
          }
        } else {
          return location.floodData.map((floodEntry) => ({
            locationData: location.locationData,
            floodData: floodEntry
          }))
        }
      })
  }

  return (
    <>
      {showFloodInformationData && (
        <FloodDataInformationPopup
          locationsFloodInformation={locationsFloodInformation}
          onClose={() => {
            setShowFloodInformationData(false)
            setLocationsFloodInformation([])
          }}
        />
      )}
      <p className='govuk-!-margin-bottom-3 warnings-reports-paragraph'>
        {filteredLocationsAffected.length !== locationsAffected.length &&
          'Showing ' + filteredLocationsAffected.length + ' of '}
        {locationsAffected.length}{' '}
        {locationsAffected.length === 1 ? 'location' : 'locations'}
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
          {displayedLocationsAffected.map((location, index) => {
            const locationType =
              location.locationData.additionals.other.location_data_type
            return (
              <tr key={index} className='govuk-table__row'>
                <td className='govuk-table__cell'>
                  {locationType !== LocationDataType.X_AND_Y_COORDS && (
                    <p className='govuk-hint' style={{ marginBottom: '0.2em' }}>
                      {location.locationData.additionals.locationName}
                    </p>
                  )}
                  <Link
                    className='govuk-link'
                    onClick={(e) => {
                      e.preventDefault()
                      viewFloodInformationData(location)
                    }}
                  >
                    {locationType === LocationDataType.X_AND_Y_COORDS
                      ? location.locationData.address
                      : location.floodData[0].name}
                  </Link>
                </td>
                <td className='govuk-table__cell'>
                  <div className='reports-table-icon-position'>
                    {location.floodData.map((floodArea, index) => {
                      return (
                        <div key={index} className='warnings-table-item'>
                          <img
                            src={warningTypeDisplay[floodArea.type].icon}
                            alt='Flood warning icon'
                            className='warnings-table-icon'
                          />
                          <span className='warnings-table-text'>
                            {warningTypeDisplay[floodArea.type].text}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </td>{' '}
                <td className='govuk-table__cell'>
                  {location.locationData.additionals.other.location_type || '-'}
                </td>
                <td className='govuk-table__cell'>
                  {location.locationData.additionals.other
                    .business_criticality || '-'}
                </td>
                <td className='govuk-table__cell'>
                  {location.locationData.linked_contacts?.length}
                </td>
                {/* should this get the most recent flood updated time? */}
                <td className='govuk-table__cell'>
                  {location.floodData[0].updatedTime}
                </td>
              </tr>
            )
          })}
        </tbody>{' '}
      </table>
    </>
  )
}
