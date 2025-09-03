import dayjs from 'dayjs'
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
  setFilteredLocationsAffected,
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
  }, [])

  // Sort standard data
  const sortTableData = (sortType, setSort, path) => {
    const getValue = (obj) => {
      const objLocationName =
        obj.locationData.name || obj.locationData.additionals.locationName
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

    const isDate = (v) => {
      const d = v instanceof Date ? v : new Date(v)
      return !isNaN(d.getTime())
    }
    const toTime = (v) => (isDate(v) ? v.getTime() : new Date(v).getTime())
    const isEmpty = (v) => v === null || v === '' || v === '-'

    if (sortType === 'none' || sortType === 'descending') {
      setSort('ascending')
      const sorted = [...filteredLocationsAffected].sort((a, b) => {
        const A = getValue(a)
        const B = getValue(b)
        // Ascending sort - empty values last
        if (isEmpty(A) && isEmpty(B)) return 0
        if (isEmpty(A)) return 1
        if (isEmpty(B)) return -1
        if (isDate(A) && isDate(B)) return toTime(A) - toTime(B)
        return String(A).localeCompare(String(B))
      })
      setFilteredLocationsAffected(sorted)
    }

    if (sortType === 'ascending') {
      setSort('descending')
      const sorted = [...filteredLocationsAffected].sort((a, b) => {
        const A = getValue(a)
        const B = getValue(b)
        // Descending sort - empty values first
        if (isEmpty(A) && isEmpty(B)) return 0
        if (isEmpty(A)) return -1
        if (isEmpty(B)) return 1
        if (isDate(A) && isDate(B)) return toTime(B) - toTime(A)
        return String(B).localeCompare(String(A))
      })
      setFilteredLocationsAffected(sorted)
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
        {'Showing '}
        {filteredLocationsAffected.length !== locationsAffected.length &&
          filteredLocationsAffected.length + ' of '}
        {locationsAffected.length}
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
                    {location.floodData.name}
                  </p>
                  <Link
                    className='govuk-link'
                    onClick={(e) => {
                      e.preventDefault()
                      viewFloodInformationData(location)
                    }}
                  >
                    {location.locationData.name ||
                      location.locationData.additionals.locationName}
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
                  {location.floodData.startDate
                    ? dayjs(location.floodData.startDate).format(
                        'D MMM YYYY [at] HH:mm'
                      )
                    : '-'}
                </td>
                <td className='govuk-table__cell'>
                  {location.floodData.lastUpdatedTime
                    ? dayjs(location.floodData.lastUpdatedTime).format(
                        'D MMM YYYY [at] HH:mm'
                      )
                    : '-'}
                </td>
              </tr>
            )
          })}
        </tbody>{' '}
      </table>
    </>
  )
}
