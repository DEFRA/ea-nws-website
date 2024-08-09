import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Details from '../../gov-uk-components/Details'
import Pagination from '../../gov-uk-components/Pagination'
import {
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setSelectedLocation,
  setShowOnlySelectedFloodArea
} from '../../redux/userSlice'
import { getSurroundingFloodAreas } from '../../services/WfsFloodDataService'

export default function SubscribedLocationTable () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10
  const locations = useSelector((state) => state.session.profile.pois)
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const detailsMessage = (
    <div>
      <p>You must keep at least one location on your account.</p>
      <p>
        <Link to='/manage-locations/add/search' className='govuk-link'>
          Add a new location
        </Link>
        &nbsp;before removing any you do not need.
      </p>
      <p>
        Or you could&nbsp;
        <Link to='/deleteaccount' className='govuk-link'>
          Delete your account
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
    const { alertArea, warningArea } = await getSurroundingFloodAreas(
      location.coordinates.latitude,
      location.coordinates.longitude,
      0.5
    )
    const locationIsWarningArea = isSavedLocationTargetArea(
      location.name,
      warningArea.features
    )
    const locationIsAlertArea = isSavedLocationTargetArea(
      location.name,
      alertArea.features
    )
    if (
      locationIsWarningArea.length === 0 &&
      locationIsAlertArea.length === 0
    ) {
      // TODO - this will need updated when geosafe updates locations to have alert categories
      dispatch(setSelectedLocation(location))
      navigate(`/manage-locations/view/${'both'}`)
    } else {
      dispatch(setShowOnlySelectedFloodArea(true))
      dispatch(setSelectedLocation(location))
      if (locationIsWarningArea.length > 0) {
        dispatch(setSelectedFloodWarningArea(locationIsWarningArea[0]))
        navigate(`/manage-locations/view/${'severe'}`)
      } else if (locationIsAlertArea.length > 0) {
        console.log('hit here')
        dispatch(setSelectedFloodAlertArea(locationIsAlertArea[0]))
        navigate(`/manage-locations/view/${'alert'}`)
      }
    }
  }

  const isSavedLocationTargetArea = (locationName, areas) => {
    return areas.filter((area) => locationName === area.properties.ta_name)
  }

  const locationTable = () => {
    const viewColumn = (location) => {
      return (
        <td className='govuk-table__cell'>
          <Link
            onClick={(e) => {
              e.preventDefault()
              viewSelectedLocation(location)
            }}
            className='govuk-link'
          >
            View
          </Link>
        </td>
      )
    }

    const removeColumn = (location) => {
      return (
        <td className='govuk-table__cell'>
          <Link
            to='/manage-locations/remove'
            state={{
              name: location.name
            }}
            className='govuk-link'
          >
            Remove
          </Link>
        </td>
      )
    }

    const addressColumn = (location) => {
      return (
        <td className='govuk-table__cell govuk-!-width-full'>
          {location.name}
        </td>
      )
    }

    return (
      <table className='govuk-table'>
        <thead class='govuk-table__head'>
          <tr class='govuk-table__row'>
            <th colspan='3' scope='colspan' className='govuk-table__header'>
              {'Your locations (' + locations.length + ')'}
            </th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedLocations.map((location, index) => (
            <tr key={index} className='govuk-table__row'>
              {addressColumn(location)}
              {locations.length === 1 && <td className='govuk-table__cell' />}
              {viewColumn(location)}
              {locations.length > 1 && removeColumn(location)}
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
          onClick={() => navigate('/manage-locations/add/search')}
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
