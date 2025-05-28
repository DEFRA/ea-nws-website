import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../../common/components/gov-uk/Pagination'
import WarningText from '../../../../../../common/components/gov-uk/WarningText'
import { backendCall } from '../../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ManageDuplicateLocationsPage () {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)
  const [duplicateLocations, setDuplicateLocations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const location = useLocation()

  const defaultLocationsPerPage = 20
  const [locationsPerPage, setLocationsPerPage] = useState(
    defaultLocationsPerPage
  )
  const displayedLocations = locationsPerPage
    ? duplicateLocations.slice(
      (currentPage - 1) * locationsPerPage,
      currentPage * locationsPerPage
    )
    : duplicateLocations

  useEffect(() => {
    const getDupLocations = async () => {
      const dataToSend = { orgId }
      const { data } = await backendCall(
        dataToSend,
        'api/bulk_uploads/get_invalid_locations',
        navigate
      )
      const locations = []
      if (data) {
        const duplicates = data.filter(
          (location) =>
            location.error.includes('duplicate') && location.error.length === 1
        )
        duplicates.forEach((location) => {
          locations.push(geoSafeToWebLocation(location))
        })
      }
      setDuplicateLocations(locations)
    }
    getDupLocations()
  }, [])

  useEffect(() => {
    if (!locationsPerPage) {
      window.print()
      setLocationsPerPage(defaultLocationsPerPage)
    }
  }, [locationsPerPage])

  const handlePrint = (event) => {
    event.preventDefault()
    setLocationsPerPage(null)
  }

  const getLocation = async (orgId, locationName, type) => {
    const dataToSend = {
      orgId,
      locationName,
      type
    }
    const { data } = await backendCall(
      dataToSend,
      'api/locations/search',
      navigate
    )

    if (data) {
      return data[0]
    } else {
      return null
    }
  }

  const handleCompareDetails = async (event, location) => {
    event.preventDefault()

    // Get the existing location (note type is 'valid')
    const existingLocation = geoSafeToWebLocation(
      await getLocation(orgId, location.additionals.locationName, 'valid')
    )

    // Get the new, duplicate location (note type is 'invalid')
    const newLocation = geoSafeToWebLocation(
      await getLocation(orgId, location.additionals.locationName, 'invalid')
    )

    if (existingLocation && newLocation) {
      // Now compare the two and let the use choose one
      navigate(orgManageLocationsUrls.add.duplicateLocationComparisonPage, {
        state: {
          existingLocation,
          newLocation,
          numDuplicates: duplicateLocations.length
        }
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Might change but if there are still locations left go back to the options page
    navigate(orgManageLocationsUrls.add.duplicateLocationsOptionsPage, {
      state: {
        addedLocations: 0,
        numDuplicates: duplicateLocations.length
      }
    })
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Manage Duplicate Locations - GOV.UK</title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      {location.state && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
          title='Sucess'
          text={location.state.text}
        />
      )}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              Manage {duplicateLocations.length} duplicate location
              {duplicateLocations.length !== 1 ? 's' : ''}
            </h1>
            <div className='govuk-!-padding-bottom-4'>
              You need to choose if you want to keep or replace all of them.
            </div>
            <WarningText text='Any new locations uploaded that are duplicates will not be saved to this account if you do not manage them now. The existing location with the same name will be kept in this account' />
            <Button
              className='govuk-button govuk-button--secondary'
              text='Print duplicate locations'
              onClick={(event) => handlePrint(event)}
            />
            <p className='govuk-caption-m govuk-!-margin-bottom-0'>
              {duplicateLocations.length} location
              {duplicateLocations.length !== 1 ? 's' : ''}
            </p>
            <div className='govuk-body govuk-!-padding-top-2'>
              <table className='govuk-table govuk-table--small-text-until-tablet'>
                <thead className='govuk-table__head'>
                  <tr className='govuk-table__row'>
                    <th scope='col' className='govuk-table__header'>
                      Location name
                    </th>
                    <th scope='col' className='govuk-table__header' />
                  </tr>
                </thead>
                <tbody className='govuk-table__body'>
                  {duplicateLocations &&
                    displayedLocations.map((location, index) => {
                      return (
                        <tr className='govuk-table__row' key={index}>
                          <td className='govuk-table__cell'>
                            {location.additionals.locationName}
                          </td>
                          <td className='govuk-table__cell govuk-!-text-align-right'>
                            <Link
                              className='govuk-link'
                              onClick={(event) =>
                                handleCompareDetails(event, location)}
                            >
                              Compare details
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
            {locationsPerPage && (
              <Pagination
                totalPages={Math.ceil(
                  duplicateLocations.length / locationsPerPage
                )}
                onPageChange={(val) => setCurrentPage(val)}
              />
            )}
            <Button
              className='govuk-button'
              text='Finish managing duplicate locations'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
