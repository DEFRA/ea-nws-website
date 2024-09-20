import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../../../common/components/gov-uk/Button'
import Pagination from '../../../../../../common/components/gov-uk/Pagination'
import {
  setAdditionalAlerts,
  setSelectedLocation
} from '../../../../../../common/redux/userSlice'
import {
  getSurroundingFloodAreas,
  isLocationInFloodArea
} from '../../../../../../common/services/WfsFloodDataService'

export default function LocationSearchResultsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const locationPostCode = useSelector(
    (state) => state.session.locationPostCode
  )
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
      dispatch(setSelectedLocation(selectedLocation))

      const { warningArea, alertArea } = await getSurroundingFloodAreas(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude
      )

      const isError = !warningArea && !alertArea

      const isInAlertArea =
        alertArea &&
        isLocationInFloodArea(
          selectedLocation.coordinates.latitude,
          selectedLocation.coordinates.longitude,
          alertArea
        )

      const isInWarningArea =
        warningArea &&
        isLocationInFloodArea(
          selectedLocation.coordinates.latitude,
          selectedLocation.coordinates.longitude,
          warningArea
        )

      navigateToNextPage(isInAlertArea, isInWarningArea, isError)
    } finally {
      setLoading(false)
    }
  }

  const navigateToNextPage = (isInAlertArea, isInWarningArea, isError) => {
    if (isInAlertArea && isInWarningArea) {
      navigate(`/organisation/manage-locations/add/location-in-area/${'all'}`)
    } else if (isInAlertArea) {
      dispatch(setAdditionalAlerts(false))
      navigate(
        `/organisation/manage-locations/add/location-in-area/${'alerts'}`
      )
    } else if (!isInAlertArea && !isInWarningArea) {
      navigate(
        `/organisation/manage-locations/add/location-in-area/${'no-alerts'}`
      )
    } else if (isError) {
      navigate('/error')
    }
  }

  const navigateToCannotFindAddressPage = () => {
    // TODO: navigate to the appropriate page when user clicks "I cannot find address"
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className='govuk-grid-column-two-thirds'>
                <div className='govuk-body'>
                  <h1 className='govuk-heading-l'>Select an address</h1>
                  <p className='govuk-body'>
                    Postcode: {locationPostCode}
                    {'   '}
                    <Link
                      onClick={() => navigate(-1)}
                      className='govuk-link govuk-!-padding-left-5'
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
                              {location.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    text='I cannot find the address'
                    className='govuk-button govuk-button--secondary'
                    onClick={navigateToCannotFindAddressPage}
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
