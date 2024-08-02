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

export default function LocationSearchResultsLayout({ continueToNextPage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        // check that there are flood areas within boundary box around location
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
                      onClick={() => navigate(-1)}
                      className='govuk-back-link'
                    >
                      Back
                    </Link>
                    <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                      {locationPostCode
                        ? 'Select an address'
                        : 'Select a location'}
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
                    {locationPostCode ? (
                      <Details
                        title='I cannot find my address here'
                        text={detailsMessage}
                      />
                    ) : (
                      <Link onClick={() => navigate(-1)} className='govuk-link'>
                        Search using a different location
                      </Link>
                    )}
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
