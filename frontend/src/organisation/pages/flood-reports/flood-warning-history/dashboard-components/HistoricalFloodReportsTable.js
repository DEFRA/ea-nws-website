import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../../common/assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../../../../common/assets/images/severe_flood_warning.svg'
import FloodDataInformationPopup from '../../../../../common/components/custom/FloodDataInformationPopup'
import AlertType from '../../../../../common/enums/AlertType'

export default function HistoricalFloodReportsTable({
  locationsAffected,
  displayedLocationsAffected,
  setDisplayedLocationsAffected,
  filteredLocationsAffected,
  resetPaging,
  setResetPaging
}) {
  const [locationNameSort, setLocationNameSort] = useState('none')
  const [warningTypeSort, setWarningTypeSort] = useState('none')
  const [locationTypeSort, setLocationTypeSort] = useState('none')
  const [businessCriticalitySort, setBusinessCriticalitySort] = useState('none')
  const [startDateSort, setStartDateSort] = useState('none')
  const [lastUpdatedSort, setLastUpdatedSort] = useState('none')

  useEffect(() => {
    setLocationNameSort('none')
    setWarningTypeSort('none')
    setBusinessCriticalitySort('none')
    setLocationTypeSort('none')
    setStartDateSort('none')
    setLastUpdatedSort('none')
  }, [locationsAffected])

  // Sort standard data
  const sortTableData = (sortType, setSort, path) => {
    const getValue = (obj) => {
      const objLocationName = obj.locationData.additionals.locationName
      const objLocationType =
        obj.locationData.additionals.other.location_type || '-'
      const objBusinessCriticality =
        obj.locationData.additionals.other.business_criticality || '-'
      const objStartDate = obj.floodData.startDate
      const objLastUpdatedTime = obj.floodData.lastUpdatedTime
      const objFloodWarningType = obj.floodData.type

      if (path === 'locationName') {
        return objLocationName
      } else if (path === 'startDate') {
        return objStartDate
      } else if (path === 'lastUpdatedTime') {
        return objLastUpdatedTime
      } else if (path === 'floodWarningType') {
        return objFloodWarningType
      } else if (path === 'locationType') {
        return objLocationType
      } else if (path === 'businessCriticality') {
        return objBusinessCriticality
      } else {
        return (
          path.split('.').reduce((acc, part) => acc && acc[part], obj) || ''
        )
      }
    }

    if (sortType === 'none' || sortType === 'descending') {
      setSort('ascending')
      setDisplayedLocationsAffected(
        [...filteredLocationsAffected].sort((a, b) => {
          const valueA = getValue(a)
          const valueB = getValue(b)

          // Place empty strings at the end
          if (
            (valueA === '' || valueA == null) &&
            (valueB === '' || valueB == null)
          ) {
            return 0
          }
          if (valueA === '' || valueA == null) return 1
          if (valueB === '' || valueB == null) return -1

          // if values are valid dates, compare them as date objects
          const dateA = new Date(valueA)
          const dateB = new Date(valueB)

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime()
          }

          return (valueA || '').localeCompare(valueB || '')
        })
      )
    }

    if (sortType === 'ascending') {
      setSort('descending')
      setDisplayedLocationsAffected(
        [...filteredLocationsAffected].sort((a, b) => {
          const valueA = getValue(a)
          const valueB = getValue(b)

          // if values are valid dates, compare them as date objects
          const dateA = new Date(valueA)
          const dateB = new Date(valueB)

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateB.getTime() - dateA.getTime()
          }

          return (valueB || '').localeCompare(valueA || '')
        })
      )
    }
    setResetPaging(!resetPaging)
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
    return locationsAffected
      .filter((location) => location.locationData.id === data.locationData.id)
      .map((location) => {
        return {
          locationData: location.locationData,
          floodData: location.floodData
        }
      })
  }

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }

    const formattedDate = date.toLocaleString('en-GB', options)

    return formattedDate
      .replace(',', ' at')
      .replace(':00', '')
      .replace('PM', 'pm')
      .replace('AM', 'am')
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
                    'floodWarningType'
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
              aria-sort={startDateSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortTableData(startDateSort, setStartDateSort, 'startDate')
                }
              >
                Start
                <br /> date
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
                    setLastUpdatedSort,
                    'lastUpdatedTime'
                  )
                }
              >
                End
                <br /> date
              </button>
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedLocationsAffected.map((location, index) => {
            return (
              <tr key={index} className='govuk-table__row'>
                <td className='govuk-table__cell'>
                  <p className='govuk-hint' style={{ marginBottom: '0.2em' }}>
                    {location.locationData.additionals.locationName}
                  </p>
                  <Link
                    className='govuk-link'
                    onClick={(e) => {
                      e.preventDefault()
                      viewFloodInformationData(location)
                    }}
                  >
                    {location.floodData.name}
                  </Link>
                </td>
                <td className='govuk-table__cell'>
                  <div className='reports-table-icon-position'>
                    <div key={index} className='warnings-table-item'>
                      <img
                        src={warningTypeDisplay[location.floodData.type].icon}
                        alt='Flood warning icon'
                        className='warnings-table-icon'
                      />
                      <span className='warnings-table-text'>
                        {warningTypeDisplay[location.floodData.type].text}
                      </span>
                    </div>
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
                  {formatDate(location.floodData.startDate)}
                </td>
                <td className='govuk-table__cell'>
                  {formatDate(location.floodData.lastUpdatedTime)}
                </td>
              </tr>
            )
          })}
        </tbody>{' '}
      </table>
    </>
  )
}
