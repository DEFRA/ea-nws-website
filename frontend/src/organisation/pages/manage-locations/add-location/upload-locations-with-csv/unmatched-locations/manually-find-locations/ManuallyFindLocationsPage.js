import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../../common/components/gov-uk/NotificationBanner'
import WarningText from '../../../../../../../common/components/gov-uk/WarningText'
import {
  setCurrentLocation,
  setLocationSearchResults
} from '../../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../../common/services/BackendService'
import { geoSafeToWebLocation, webToGeoSafeLocation } from '../../../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ManuallyFindLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orgId = useSelector((state) => state.session.orgId)
  const [locations, setLocations] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const getInvLocations = async () => {
      const dataToSend = { orgId }
      const { data } = await backendCall(
        dataToSend,
        'api/bulk_uploads/get_invalid_locations',
        navigate
      )
      const locations = []
      if (data) {
        data.forEach((location) => {
          locations.push(geoSafeToWebLocation(location))
        })
      }
      setLocations(locations)
    }
    getInvLocations()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    navigate('/organisation/manage-locations/view-locations')
  }

  const findAvailableAddresses = async (location) => {
    const dataToSend = {
      name: location,
      minmatch: 0.7
    }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/os-api/name-minmatch-search',
      navigate
    )
    if (errorMessage) {
      // If there was an error message, return false
      return false
    } else {
      // Otherwise, dispatch results and return true
      dispatch(setLocationSearchResults(data))
      return true
    }
  }

  const handleFind = async (event, location) => {
    event.preventDefault()
    const poi = location
    dispatch(setCurrentLocation(webToGeoSafeLocation(poi)))
    const isAddressValid = await findAvailableAddresses(
      poi.additionals.other.full_address +
        ', ' +
        poi.additionals.other.postcode
    )
    // If there is results for the unmatched address, navigate to the radio screen
    // where user can select how to find the address
    if (isAddressValid) {
      navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.selectHow)
    } else {
      // otherwise, navigate to find on map directly
      navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.areaName) // Link to map
    }
  }

  return (
    <>
      <Helmet>
        <title>Manually Find Locations - Next warning Service GOV.UK</title>
      </Helmet>
      {location.state && (
        <NotificationBanner
          className={`govuk-notification-banner ${
            location.state === 'Added' && 'govuk-notification-banner--success'
          } govuk-!-margin-bottom-0 govuk-!-margin-top-4`}
          title={location.state === 'Added' ? 'Success' : 'Information'}
          text={
            location.state === 'Added'
              ? '1 Location Added'
              : "1 location cannot be added because it's not in England"
          }
        />
      )}

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Manually find locations</h1>
            <div className='govuk-body'>
              <p>
                <>
                  <Link
                    to='/' // link to download file of all locations not matched
                    className='govuk-link'
                  >
                    Download a file of all the locations not matched
                  </Link>
                  , update it and reupload later.
                </>
              </p>
              <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                {locations?.length} locations not matched
              </h2>

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
                    <th scope='col' className='govuk-table__header' />
                  </tr>
                </thead>
                <tbody className='govuk-table__body'>
                  {locations &&
                    locations.map((location, index) => {
                      return (
                        <tr className='govuk-table__row' key={index}>
                          <th scope='row' className='govuk-table__header'>
                            {
                              location.additionals.locationName
                            }
                          </th>
                          <td className='govuk-table__cell'>
                            {
                              location.additionals.other.full_address
                            }
                          </td>
                          <td className='govuk-table__cell'>
                            {location.additionals.other.postcode}
                          </td>
                          <td className='govuk-table__cell'>
                            <Link
                              onClick={(event) => handleFind(event, location)}
                            >
                              Find this location
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>

              <WarningText text='Any locations not matched cannot be added to this account' />
            </div>
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
