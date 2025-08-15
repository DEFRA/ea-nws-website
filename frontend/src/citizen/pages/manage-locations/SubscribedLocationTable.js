import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import Details from '../../../common/components/gov-uk/Details'
import AlertType from '../../../common/enums/AlertType'
import {
  getAdditional,
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setSelectedLocation,
  setShowOnlySelectedFloodArea
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'

export default function SubscribedLocationTable({ setError }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const locations = useSelector((state) => state.session.profile.pois)
  const locationRegistrations = useSelector(
    (state) => state.session.locationRegistrations
  )
  const maxLocations = 15
  const [partnerId, setPartnerId] = useState(false)

  const nearbyFloodAreaLocations = {}
  const xyCoordLocations = []

  locations.forEach((loc, index) => {
    const key = getAdditional(loc.additionals, 'locationName')
    if (key) {
      if (!nearbyFloodAreaLocations[key]) {
        nearbyFloodAreaLocations[key] = []
      }
      nearbyFloodAreaLocations[key].push({ ...loc, index })
    } else {
      xyCoordLocations.push({ ...loc, index })
    }
  })

  const getFloodWarningAndAlerts = (location) => {
    const alertTypes =
      locationRegistrations?.find((loc) => loc.locationId == location.id)
        ?.registrations[0]?.params?.alertTypes || []

    let serverFloodWarnings = null
    let floodWarnings = null
    let floodAlerts = null

    if (!alertTypes.length) return ''

    serverFloodWarnings = alertTypes.includes(AlertType.SEVERE_FLOOD_WARNING)
    floodWarnings = alertTypes.includes(AlertType.FLOOD_WARNING)
    floodAlerts = alertTypes.includes(AlertType.FLOOD_ALERT)

    if (serverFloodWarnings && floodWarnings && floodAlerts) {
      return 'Severe flood warnings, flood warnings and flood alerts'
    }

    if (serverFloodWarnings && floodWarnings) {
      return 'Severe flood warnings and flood warnings'
    }

    if (floodAlerts) {
      return 'Flood alerts'
    }
  }

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const detailsMessage = (
    <div>
      <p>You must keep at least one location on your account.</p>
      <p>
        <Link
          to='/manage-locations/add/search'
          className='govuk-link'
          style={{ cursor: 'pointer' }}
        >
          Add a new location
        </Link>
        &nbsp;before removing any you do not need.
      </p>
      <p>
        Or you could&nbsp;
        <Link
          to='/account/delete'
          className='govuk-link'
          style={{ cursor: 'pointer' }}
        >
          delete your account
        </Link>
        &nbsp;instead.
      </p>
    </div>
  )

  useEffect(() => {
    dispatch(setSelectedLocation(null))
    dispatch(setShowOnlySelectedFloodArea(false))
    dispatch(setSelectedFloodWarningArea(null))
    dispatch(setSelectedFloodAlertArea(null))
  }, [])

  const viewSelectedLocation = async (location) => {
    dispatch(setSelectedLocation(location))
    navigate('/manage-locations/view')
  }

  const onClickAddLocation = async (event) => {
    event.preventDefault()
    if (locations.length < maxLocations) {
      navigate('/manage-locations/add/search')
    } else {
      setError('Maximum number of locations already added')
    }
  }

  const locationTable = () => {
    const viewColumn = (location, arrayLength, index) => {
      return (
        <td className='govuk-table__cell text-nowrap'>
          <Link
            onClick={(e) => {
              e.preventDefault()
              viewSelectedLocation(location)
            }}
            className='govuk-link'
            style={{ cursor: 'pointer' }}
            aria-label={`View or manage for location ${
              arrayLength > 1 ? `${index + 1}` : ''
            } - ${location.address}`}
          >
            View or manage
          </Link>
        </td>
      )
    }

    const removeColumn = (location, index) => {
      return (
        <td className='govuk-table__cell'>
          <Link
            to='/manage-locations/remove'
            state={{
              name: location.address,
              locationId: location.id,
              partnerId
            }}
            className='govuk-link'
            style={{ cursor: 'pointer' }}
            aria-label={`Remove location ${index > 0 ? `${index + 1}` : ''} - ${
              location.address
            }`}
          >
            Remove
          </Link>
        </td>
      )
    }

    const addressColumn = (location) => {
      return (
        <td className='govuk-table__cell govuk-!-width-full'>
          <p className='govuk-!-margin-bottom-0'>{location.address}</p>
          <p
            style={{ fontSize: '1rem' }}
            className='govuk-hint govuk-!-margin-bottom-0'
          >
            {getFloodWarningAndAlerts(location)}
          </p>
        </td>
      )
    }

    return (
      <table className='govuk-table responsive-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th
              colspan='3'
              scope='colspan'
              className='govuk-table__header'
              style={{ borderBottom: '2px solid #fff' }}
            >
              {'Your locations'}
            </th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {xyCoordLocations.map((location, index) => (
            <tr key={index} className='govuk-table__row non-grouped'>
              {addressColumn(location)}
              {locations.length === 1 && <td className='govuk-table__cell' />}
              {locations.length === 1 && <td className='govuk-table__cell' />}
              {viewColumn(location)}
              {locations.length > 1 && removeColumn(location, location.index)}
            </tr>
          ))}

          {nearbyFloodAreaLocations &&
            Object.entries(nearbyFloodAreaLocations).map(
              ([locationName, groupLocations], index) => (
                <>
                  <tr key={index} className='govuk-table__row grouped'>
                    <td
                      className='govuk-table__cell govuk-!-width-full govuk-!-padding-top-6'
                      style={{ borderBottom: '2px solid #fff' }}
                    >
                      <p className='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
                        {locationName}
                      </p>
                      <p>
                        {'You will get flood messages for these nearby areas'}
                      </p>
                    </td>
                  </tr>

                  {groupLocations.map((location, index) => (
                    <tr key={index} className='govuk-table__row'>
                      <td className='govuk-table__cell'>
                        <p className='govuk-!-margin-bottom-0'>
                          {location.address}
                        </p>
                        <p className='govuk-hint govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                          {getFloodWarningAndAlerts(
                            location,
                            locationRegistrations
                          )}
                        </p>
                      </td>

                      {viewColumn(location)}

                      {locations.length > 1 &&
                        removeColumn(location, location.index)}
                    </tr>
                  ))}
                </>
              )
            )}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div div className='govuk-body'>
        {locations.length > 0 && locationTable()}
        <Button
          text='Add new location'
          className='govuk-button govuk-button--secondary'
          onClick={onClickAddLocation}
        />
        {locations.length === 1 && (
          <Details
            title='If you want to remove this location'
            text={detailsMessage}
          />
        )}
      </div>
    </>
  )
}
