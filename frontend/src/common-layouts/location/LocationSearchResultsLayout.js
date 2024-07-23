import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../../custom-components/LoadingSpinner'
import Details from '../../gov-uk-components/Details'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Pagination from '../../gov-uk-components/Pagination'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setSelectedLocation } from '../../redux/userSlice'
import { getFloodTargetArea } from '../../services/GetFloodTargetAreas'
import { checkIfSelectedLocationExistsAlready } from '../../services/ProfileServices'

export default function LocationSearchResultsLayout ({ continueToNextPage }) {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const locations = useSelector((state) => state.session.locationSearchResults)
  const profile = useSelector((state) => state.session.profile)
  const locationPostCode = useSelector(
    (state) => state.session.locationPostCode
  )
  const locationsPerPage = 20
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const handleSelectedLocation = async (event, selectedLocation) => {
    event.preventDefault()

    setLoading(true)
    try {
      const existsInProfile = checkIfSelectedLocationExistsAlready(
        profile,
        selectedLocation
      )
      if (existsInProfile) {
        setError(
          'This location is saved already, please select a different location'
        )
      } else {
        dispatch(setSelectedLocation(selectedLocation))

        const { isInWarningArea, isInAlertArea } = await getFloodTargetArea(
          selectedLocation.coordinates.latitude,
          selectedLocation.coordinates.longitude
        )

        continueToNextPage(isInWarningArea, isInAlertArea)
      }
    } finally {
      setLoading(false)
    }
  }

  const detailsMessage = (
    <div>
      You can view flood message areas&nbsp;
      <a href='#' className='govuk-link'>
        near this postcode
      </a>
    </div>
  )

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-body'>
            <div className='govuk-grid-row'>
              {loading
                ? (
                  <LoadingSpinner />
                  )
                : (
                  <div className='govuk-grid-column-two-thirds'>
                    <div className='govuk-body'>
                      <Link
                        to='/signup/register-location/search'
                        className='govuk-back-link'
                      >
                        Back
                      </Link>
                      {error && <ErrorSummary errorList={[error]} />}
                      <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                        Select an address
                      </h1>
                      <p className='govuk-body'>
                        Postcode: {locationPostCode}
                        {'   '}
                        <Link
                          to='/signup/register-location/search'
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
                                    handleSelectedLocation(event, location)}
                                >
                                  {location.name}
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Details
                        title='I cannot find my address here'
                        text={detailsMessage}
                      />
                      <Pagination
                        totalPages={Math.ceil(
                          locations.length / locationsPerPage
                        )}
                        onPageChange={(val) => setCurrentPage(val)}
                      />
                    </div>
                  </div>
                  )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
