import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../../../common/components/gov-uk/Button'
import Pagination from '../../../../../../common/components/gov-uk/Pagination'
import {
  getLocationOther,
  setCurrentLocationAddress,
  setCurrentLocationCoordinates,
  setCurrentLocationEasting,
  setCurrentLocationFullAddress,
  setCurrentLocationNorthing,
  setCurrentLocationPostcode,
  setCurrentLocationUPRN
} from '../../../../../../common/redux/userSlice'
import { convertCoordinatesToEspg27700 } from '../../../../../../common/services/CoordinatesFormatConverter'
import UnmatchedLocationInfo from '../../../../../pages/manage-locations/add-location/upload-locations-with-csv/components/UnmatchedLocationInfo'

export default function AddressSearchLayout({
  navigateToNextPage,
  navigateToPreviousPage,
  navigateToFindPostcodePage,
  navigateToCannotFindAddressPage,
  flow
}) {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const postCode = useSelector((state) => getLocationOther(state, 'postcode'))
  const locations = useSelector((state) => state.session.locationSearchResults)
  const locationsPerPage = 20
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const handleSelectedLocation = async (event, selectedLocation) => {
    event.preventDefault()

    setLoading(true)
    try {
      dispatch(setCurrentLocationUPRN(selectedLocation.name))
      dispatch(setCurrentLocationCoordinates(selectedLocation.coordinates))
      dispatch(setCurrentLocationAddress(selectedLocation.address))

      const postcodePattern = /\s*,?\s+\b[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}\b/
      const fullAddress = selectedLocation.address
        .replace(postcodePattern, '')
        .trim()
      dispatch(setCurrentLocationFullAddress(fullAddress))
      dispatch(setCurrentLocationPostcode(selectedLocation.postcode))

      const { northing, easting } = convertCoordinatesToEspg27700(
        selectedLocation.coordinates.longitude,
        selectedLocation.coordinates.latitude
      )

      dispatch(setCurrentLocationNorthing(northing))
      dispatch(setCurrentLocationEasting(easting))
      navigateToNextPage()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BackLink
        onClick={(e) => {
          e.preventDefault()
          navigateToPreviousPage()
        }}
      />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className='govuk-grid-column-two-thirds'>
                <div className='govuk-body'>
                  <h1 className='govuk-heading-l' id='main-content'>
                    Select an address
                  </h1>
                  {flow?.includes('unmatched-locations') && (
                    <UnmatchedLocationInfo />
                  )}
                  <p className='govuk-body'>
                    Postcode: {postCode}
                    {'   '}
                    <Link
                      onClick={(e) => {
                        e.preventDefault()
                        navigateToFindPostcodePage()
                      }}
                      className='govuk-link govuk-!-margin-left-5'
                    >
                      Change postcode
                    </Link>
                  </p>
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
                                handleSelectedLocation(event, location)
                              }
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
                    className='govuk-button govuk-button--secondary'
                    onClick={(event) => {
                      event.preventDefault()
                      navigateToCannotFindAddressPage()
                    }}
                  />
                  <Pagination
                    totalPages={Math.ceil(locations.length / locationsPerPage)}
                    onPageChange={(val) => setCurrentPage(val)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
