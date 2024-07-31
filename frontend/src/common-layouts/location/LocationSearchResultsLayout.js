import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../custom-components/LoadingSpinner'
import Details from '../../gov-uk-components/Details'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Pagination from '../../gov-uk-components/Pagination'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import {
  setNearbyTargetAreasFlow,
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setSelectedLocation,
  setShowOnlySelectedFloodArea
} from '../../redux/userSlice'
import {
  getSurroundingFloodAreas,
  isLocationInFloodArea
} from '../../services/WfsFloodDataService'

<<<<<<< HEAD
export default function LocationSearchResultsLayout({ continueToNextPage }) {
=======
export default function LocationSearchResultsLayout ({ continueToNextPage }) {
  const navigate = useNavigate()
>>>>>>> e08dd406a493f1e541326cd3d1952c2cf850904d
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const locations = useSelector((state) => state.session.locationSearchResults)
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
      dispatch(setSelectedLocation(selectedLocation))

      // reset map display - these are only required when user is taken through location in proximity to flood areas
      // they are updated with data only in proximity flow
      dispatch(setSelectedFloodAlertArea(null))
      dispatch(setSelectedFloodWarningArea(null))
      dispatch(setShowOnlySelectedFloodArea(false))
      dispatch(setNearbyTargetAreasFlow(false))

      const { warningArea, alertArea } = await getSurroundingFloodAreas(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude
      )

      const isInAlertArea = isLocationInFloodArea(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude,
        alertArea
      )

      const isInWarningArea = isLocationInFloodArea(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude,
        warningArea
      )

      let isWithinWarningAreaProximity = false
      let isWithinAlertAreaProximity = false

      if (!isInAlertArea || !isInWarningArea) {
        //check that there are flood areas within boundary box around location
        isWithinWarningAreaProximity = warningArea.features.length > 0
        isWithinAlertAreaProximity = alertArea.features.length > 0
      }

      continueToNextPage(
        isInWarningArea,
        isInAlertArea,
        isWithinWarningAreaProximity,
        isWithinAlertAreaProximity
      )
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
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className='govuk-grid-column-two-thirds'>
                  <div className='govuk-body'>
                    <Link
                      to='/signup/register-location/search'
                      className='govuk-back-link'
                    >
                      Back
                    </Link>
                    <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                      Select an address
                    </h1>
                    <p className='govuk-body'>
                      Postcode: {locationPostCode}
                      {'   '}
                      <Link
<<<<<<< HEAD
                        to='/signup/register-location/search'
                        className='govuk-link govuk-!-padding-left-5'
=======
                        onClick={() => navigate(-1)}
                        className='govuk-back-link'
>>>>>>> e08dd406a493f1e541326cd3d1952c2cf850904d
                      >
                        Change postcode
                      </Link>
<<<<<<< HEAD
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
=======
                      {error && <ErrorSummary errorList={[error]} />}
                      <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                        Select an address
                      </h1>
                      {locationPostCode && (
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
                      )}
                      <table className='govuk-table'>
                        <tbody className='govuk-table__body'>
                          <tr className='govuk-table__row'>
                            <td className='govuk-table__cell' />
>>>>>>> e08dd406a493f1e541326cd3d1952c2cf850904d
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
