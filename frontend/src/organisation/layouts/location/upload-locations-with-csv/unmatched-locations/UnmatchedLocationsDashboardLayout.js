import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Popup from '../../../../../common/components/custom/Popup'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import WarningText from '../../../../../common/components/gov-uk/WarningText'
import { setCurrentLocation } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import {
  geoSafeToWebLocation,
  webToGeoSafeLocation
} from '../../../../../common/services/formatters/LocationFormatter'

export default function UnmatchedLocationsDashboardLayout ({
  navigateToNextPage,
  navigateToFindLocation,
  flow
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const orgId = useSelector((state) => state.session.orgId)
  const [notAddedLocationsInfo, setNotAddedLocationsInfo] = useState(null)
  const [displayedNotAddedLocationsInfo, setDisplayedNotAddedLocationsInfo] =
    useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 20

  const addedLocations = location?.state?.addedLocations || 0
  const addedLocation = location?.state?.addedLocation || null
  const unmatchedLocationText =
    (flow === 'unmatched-locations-not-found' && 'not found') ||
    (flow === 'unmatched-locations-not-in-england' && 'not in England')

  useEffect(() => {
    const getNotAddedLocations = async () => {
      const dataToSend = { orgId }
      const { data } = await backendCall(
        dataToSend,
        'api/bulk_uploads/get_invalid_locations',
        navigate
      )

      if (data.length > 0) {
        const locations = []
        const notFoundLocs = data.filter((location) =>
          location.error.includes(unmatchedLocationText)
        )
        notFoundLocs.forEach((location) => {
          locations.push(geoSafeToWebLocation(location))
        })
        setNotAddedLocationsInfo(locations)
      }
    }

    getNotAddedLocations()
  }, [])

  useEffect(() => {
    setDisplayedNotAddedLocationsInfo(
      notAddedLocationsInfo?.slice(
        (currentPage - 1) * locationsPerPage,
        currentPage * locationsPerPage
      )
    )
  }, [notAddedLocationsInfo, currentPage])

  // Location info
  const info = () => {
    if (flow === 'unmatched-locations-not-found') {
      return (
        <>
          <p>
            Some of the locations uploaded could not be found. This may be
            because the information in the template was not added correctly or
            has details missing. For example, the X and Y coordinates contained
            a letter in them or the street name did not match the postcode.
          </p>
          <p>
            You can choose how you want to find these locations manually in this
            account, then add them to your organisation's locations.
          </p>
        </>
      )
    } else if (flow === 'unmatched-locations-not-in-england') {
      return (
        <>
          <p>
            Some of the locations uploaded are not in England and cannot be
            added to this account.
          </p>
          <p>
            If you think this is not correct and some locations are in England
            you can check each location's details and change them, either by
            using a postcode, X and Y coordinates or by dropping a pin on a map.
          </p>
        </>
      )
    }
  }

  // Location warning text
  const warningText = () => {
    if (flow === 'unmatched-locations-not-found') {
      return (
        <WarningText
          text={
            <>
              Any locations not found cannot be added to this account and will
              not be saved if you do not find them now.
              <br />
              <br />
              If you want to add these locations to this account later you'll
              need to either reupload them in a new CSV file or add each one
              manually to this account.
            </>
          }
        />
      )
    } else if (flow === 'unmatched-locations-not-in-england') {
      return (
        <WarningText
          text={
            <>
              Locations not in England cannot be added to this account and will
              not be saved if you do not check them now.
              <br />
              <br />
              If you want to check these locations later and then add them to
              this account you'll need to either reupload them in a new CSV file
              or add each one manually.
            </>
          }
        />
      )
    }
  }

  const findLocation = (e, index) => {
    e.preventDefault()
    dispatch(
      setCurrentLocation(webToGeoSafeLocation(notAddedLocationsInfo[index]))
    )
    navigateToFindLocation()
  }

  const table = () => (
    <>
      <p className='govuk-!-margin-bottom-0 locations-table-panel'>
        {notAddedLocationsInfo?.length}
        {notAddedLocationsInfo?.length === 1 ? ' location' : ' locations'}{' '}
      </p>
      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header'>
              Location name
            </th>
            <th scope='col' className='govuk-table__header'>
              Address uploaded
            </th>
            <th scope='col' className='govuk-table__header'>
              Postcode
            </th>
            <th scope='col' className='govuk-table__header'>
              X and Y coordinates
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedNotAddedLocationsInfo &&
            displayedNotAddedLocationsInfo.map((location, index) => {
              return (
                <tr className='govuk-table__row' key={index}>
                  <td className='govuk-table__cell'>
                    {location.additionals.locationName}
                  </td>
                  <td className='govuk-table__cell'>
                    {location.additionals.other.full_address}
                  </td>
                  <td className='govuk-table__cell'>
                    {location.additionals.other.postcode}
                  </td>
                  <td className='govuk-table__cell'>
                    {location.additionals.other.x_coordinate}
                    {location.additionals.other.y_coordinate && ', '}
                    {location.additionals.other.y_coordinate}
                  </td>
                  <td className='govuk-table__cell'>
                    <Link
                      className='govuk-link'
                      onClick={(e) => findLocation(e, index)}
                    >
                      {(flow === 'unmatched-locations-not-found' &&
                        'Find this') ||
                        (flow === 'unmatched-locations-not-in-england' &&
                          'Check')}{' '}
                      location
                    </Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )

  const nextPage = () => {
    // Remove all not added locations for the flow (not found or not in England)
    notAddedLocationsInfo.map((location) =>
      backendCall(
        { orgId, locationId: location.id },
        'api/bulk_uploads/remove_invalid_location',
        navigate
      )
    )
    navigateToNextPage()
  }

  const popup = () => {
    if (!showPopup) return null

    return (
      <Popup
        onDelete={() => nextPage()}
        onClose={() => setShowPopup(false)}
        title={`Locations ${unmatchedLocationText}`}
        popupText={
          <>
            If you continue any locations {unmatchedLocationText} will not be
            added to this account and cannot be saved.
            <br />
            <br />
            You can print a list of these locations from the previous screen. If
            you want to then add these locations to this account you'll need to
            either reupload them in a new CSV file or add each one manually.
          </>
        }
        buttonText='Continue'
        buttonClass='govuk-button'
      />
    )
  }

  return (
    <>
      {(addedLocations > 0 || addedLocation) && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-top-5 govuk-!-margin-bottom-0'
          title='Success'
          text={
            addedLocations > 0
              ? `${addedLocations} ${
                  addedLocations === 1 ? 'location' : 'locations'
                } added`
              : `${addedLocation} added`
          }
        />
      )}
      <main className='govuk-main-wrapper govuk-!-margin-top-3'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              {notAddedLocationsInfo?.length || 0} location
              {notAddedLocationsInfo?.length === 1 ? ' ' : 's '}
              {unmatchedLocationText}
            </h1>
            <div className='govuk-body'>
              {info()}

              <Button
                className='govuk-button govuk-button--secondary govuk-!-margin-top-3'
                text={`Print locations ${unmatchedLocationText}`}
                // onClick={handleButton} // TODO: Add print format
              />

              {warningText()}
            </div>
          </div>

          {notAddedLocationsInfo?.length > 0 && (
            <div className='govuk-grid-column-full'>
              {table()}

              <div className='govuk-body govuk-!-padding-top-1'>
                <Pagination
                  totalPages={Math.ceil(
                    notAddedLocationsInfo?.length / locationsPerPage
                  )}
                  onPageChange={(val) => setCurrentPage(val)}
                />

                <Button
                  text={`Finish ${
                    (flow === 'unmatched-locations-not-found' && 'finding') ||
                    (flow === 'unmatched-locations-not-in-england' &&
                      'checking')
                  } locations`}
                  className='govuk-button govuk-button'
                  onClick={() => setShowPopup(true)}
                />
              </div>

              {popup()}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
