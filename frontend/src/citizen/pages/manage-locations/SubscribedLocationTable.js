import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import Details from '../../../common/components/gov-uk/Details'
import Pagination from '../../../common/components/gov-uk/Pagination'
import AlertType from '../../../common/enums/AlertType'
import {
  getLocationOtherAdditional,
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setSelectedLocation,
  setShowOnlySelectedFloodArea
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { getSurroundingFloodAreas } from '../../../common/services/WfsFloodDataService'

export default function SubscribedLocationTable({ setError }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10
  const locations = useSelector((state) => state.session.profile.pois)
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )
  const maxLocations = 15
  const [partnerId, setPartnerId] = useState(false)

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
    // need to check if location was added as a nearby target area (TA)
    // if added as a nearby TA, location name will be that nearby TA name
    // 1.5km bbox is set as placename search radius is set at 1.5km
    const { alertArea, warningArea } = await getSurroundingFloodAreas(
      location.coordinates.latitude,
      location.coordinates.longitude,
      1.5
    )

    const locationIsWarningArea = isSavedLocationTargetArea(
      location.address,
      warningArea.features
    )

    const locationIsAlertArea = isSavedLocationTargetArea(
      location.address,
      alertArea.features
    )

    dispatch(setSelectedLocation(location))

    const alertTypes = getLocationOtherAdditional(
      location.additionals,
      'alertTypes'
    )

    if (
      locationIsWarningArea.length === 0 &&
      locationIsAlertArea.length === 0
    ) {
      // location was not added as a nearby target area
      // check first if location was added as an alert only location
      if (
        alertTypes.includes(AlertType.FLOOD_ALERT) &&
        alertTypes.length === 2
      ) {
        navigate(`/manage-locations/view/${'alert'}`)
      } else {
        // location is subscribed to more than alerts only, so show all TAs nearby
        navigate(`/manage-locations/view/${'both'}`)
      }
    } else {
      // location was added as a nearby TA
      dispatch(setShowOnlySelectedFloodArea(true))
      if (locationIsWarningArea.length > 0) {
        // locations name matches a warning TA
        dispatch(setSelectedFloodWarningArea(locationIsWarningArea[0]))
        navigate(`/manage-locations/view/${'severe'}`)
      } else if (locationIsAlertArea.length > 0) {
        // locations name matches an alert TA
        dispatch(setSelectedFloodAlertArea(locationIsAlertArea[0]))
        navigate(`/manage-locations/view/${'alert'}`)
      }
    }
  }

  const isSavedLocationTargetArea = (locationName, areas) => {
    return areas.filter((area) => locationName === area.properties.TA_Name)
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
        <td className='govuk-table__cell'>
          <Link
            onClick={(e) => {
              e.preventDefault()
              viewSelectedLocation(location)
            }}
            className='govuk-link'
            style={{ cursor: 'pointer' }}
            aria-label={`View location ${arrayLength > 1 && index} - ${
              location.address
            }`}
          >
            View
          </Link>
        </td>
      )
    }

    const removeColumn = (location, arrayLength, index) => {
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
            aria-label={`Remove location ${arrayLength > 1 && index} - ${
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
          {location.address}
        </td>
      )
    }

    return (
      <table className='govuk-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th colspan='3' scope='colspan' className='govuk-table__header'>
              {'Your locations (' + locations.length + ')'}
            </th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedLocations.map((location, index) => (
            <tr key={index} className='govuk-table__row'>
              {addressColumn(location, locations.length, index)}
              {locations.length === 1 && <td className='govuk-table__cell' />}
              {locations.length === 1 && <td className='govuk-table__cell' />}
              {viewColumn(location)}
              {locations.length > 1 &&
                removeColumn(location, locations.length, index)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div div className='govuk-body'>
        {locations.length > 0 && locationTable()}
        <Pagination
          totalPages={Math.ceil(locations.length / locationsPerPage)}
          onPageChange={(val) => setCurrentPage(val)}
        />
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
