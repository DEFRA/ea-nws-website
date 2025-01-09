import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../common/components/gov-uk/Button'
import Pagination from '../../../common/components/gov-uk/Pagination'
import {
  getLocationAdditional,
  getLocationOther,
  setCurrentLocationCoordinates,
  setCurrentLocationFullAddress,
  setOrganizationAddress
} from '../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'

export default function SearchAddressResultLayout ({
  navigateToNextPage,
  navigateToPreviousPage,
  navigateToFindPostcodePage,
  navigateToCannotFindAddressPage,
  flow
}) {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const locations = useSelector((state) => state.session.locationSearchResults)
  const locationPostCode = useSelector(
    (state) => state.session.locationPostCode
  )
  const locationsPerPage = 20
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const currentLocationPostcode = useSelector((state) =>
    getLocationOther(state, 'postcode')
  )

  const LocationDetails = () => {
    const locationName = useSelector((state) =>
      getLocationAdditional(state, 'locationName')
    )
    const locationFullAddress = useSelector((state) =>
      getLocationOther(state, 'full_address')
    )
    const locationXcoordinate = useSelector((state) =>
      getLocationOther(state, 'x_coordinate')
    )
    const locationYcoordinate = useSelector((state) =>
      getLocationOther(state, 'y_coordinate')
    )

    return (
      <div className='govuk-inset-text'>
        <strong>{locationName}</strong>
        {locationFullAddress && (
          <>
            <br />
            {locationFullAddress}
          </>
        )}
        <br />
        {locationXcoordinate && locationYcoordinate && (
          <>
            <br />
            {locationXcoordinate}, {locationYcoordinate}
          </>
        )}
      </div>
    )
  }

  const handleSelectedLocation = (event, selectedLocation) => {
    event.preventDefault()
    if (flow === 'unmatched-locations-not-found') {
      dispatch(setCurrentLocationFullAddress(selectedLocation.address))
      dispatch(setCurrentLocationCoordinates(selectedLocation.coordinates))
    } else {
      dispatch(setOrganizationAddress(selectedLocation.address))
    }
    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigateToPreviousPage()
  }

  const navigateToFindPostcode = (event) => {
    event.preventDefault()
    navigateToFindPostcodePage()
  }

  return (
    <>
      <OrganisationAccountNavigation
        currentPage={orgManageLocationsUrls.view.dashboard}
      />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <div className='govuk-body'>
                <h1 className='govuk-heading-l'>Select an address</h1>
                {flow === 'unmatched-locations-not-found' && (
                  <LocationDetails />
                )}
                {(locationPostCode ||
                  flow === 'unmatched-locations-not-found') && (
                    <p className='govuk-body'>
                      Postcode:{' '}
                      {flow === 'unmatched-locations-not-found'
                        ? currentLocationPostcode
                        : locationPostCode}
                      {'   '}
                      <Link
                        onClick={(e) => navigateToFindPostcode(e)}
                        className='govuk-link govuk-!-padding-left-5'
                      >
                        Change postcode
                      </Link>
                    </p>
                )}
                <table className='govuk-table'>
                  <tbody className='govuk-table__body'>
                    <tr className='govuk-table__row'>
                      <td className='govuk-table__cell' />
                    </tr>
                    {displayedLocations.map((location, index) => (
                      <tr key={index} className='govuk-table__row'>
                        <td className='govuk-table__cell'>
                          <Link
                            className='govuk-link'
                            onClick={(event) =>
                              handleSelectedLocation(event, location)}
                          >
                            {location.address}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  text='I cannot find the address'
                  className='govuk-button govuk-button--secondary govuk-!-margin-top-4'
                  onClick={navigateToCannotFindAddressPage}
                />
                <Pagination
                  totalPages={Math.ceil(locations.length / locationsPerPage)}
                  onPageChange={(val) => setCurrentPage(val)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
