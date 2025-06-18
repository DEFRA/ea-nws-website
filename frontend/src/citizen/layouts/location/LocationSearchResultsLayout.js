import * as turf from '@turf/turf'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../common/components/custom/LoadingSpinner'
import Details from '../../../common/components/gov-uk/Details'
import Pagination from '../../../common/components/gov-uk/Pagination'
import AlertType from '../../../common/enums/AlertType'
import {
  getAdditional,
  setFloodAlertCount,
  setFloodAreasAlreadyAdded,
  setNearbyTargetAreasAdded,
  setNearbyTargetAreasFlow,
  setSelectedLocation,
  setSevereFloodWarningCount
} from '../../../common/redux/userSlice'
import { setLocationOtherAdditionals } from '../../../common/services/ProfileServices'
import {
  getSurroundingFloodAreas,
  isLocationInFloodArea
} from '../../../common/services/WfsFloodDataService'
import { useFetchAlerts } from '../../../common/services/hooks/GetHistoricalAlerts'

export default function LocationSearchResultsLayout({
  continueToNextPage,
  returnToSearchPage
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const locations = useSelector((state) => state.session.locationSearchResults)
  const profileLocations = useSelector((state) => state.session.profile?.pois)
  const locationSearchType = useSelector(
    (state) => state.session.locationSearchType
  )
  const locationPostCode = useSelector(
    (state) => state.session.locationPostCode
  )
  const locationsPerPage = 20
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )
  const floodHistoryData = useFetchAlerts()

  const setHistoricalAlertNumber = (AlertArea) => {
    const oneYearAgo = moment().subtract(1, 'years')

    const areaAlert = floodHistoryData.filter(
      (alert) =>
        alert.CODE === AlertArea &&
        moment(alert.DATE, 'DD/MM/YYYY') > oneYearAgo
    )
    dispatch(setFloodAlertCount(areaAlert.length))
  }

  const setHistoricalWarningNumber = (WarningArea) => {
    const oneYearAgo = moment().subtract(1, 'years')

    const areaWarning = floodHistoryData.filter(
      (alert) =>
        alert.CODE === WarningArea &&
        moment(alert.DATE, 'DD/MM/YYYY') > oneYearAgo
    )
    dispatch(setSevereFloodWarningCount(areaWarning.length))
  }

  const handleSelectedLocation = async (event, selectedLocation) => {
    event.preventDefault()

    setLoading(true)
    try {
      // reset map display - these are only required when user is taken through location in proximity to flood areas
      // they are updated with data only in proximity flow
      // dispatch(setSelectedFloodAlertArea(null))
      // dispatch(setSelectedFloodWarningArea(null))
      // dispatch(setShowOnlySelectedFloodArea(false))
      dispatch(setNearbyTargetAreasFlow(false))

      const { warningArea, alertArea } = await getSurroundingFloodAreas(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude,
        locationSearchType === 'placename' ? 1.5 : 0.5
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

      const allAlerts = [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING,
        AlertType.FLOOD_ALERT,
        AlertType.REMOVE_FLOOD_SEVERE_WARNING,
        AlertType.REMOVE_FLOOD_WARNING,
        AlertType.INFO
      ]

      const alertsOnly = [AlertType.FLOOD_ALERT, AlertType.INFO]

      // update selected location with the alerts it can receive - this is used on the next page
      // to display the correct flood areas on the map
      const locationWithAlertTypes = {
        ...selectedLocation,
        additionals: setLocationOtherAdditionals(
          [],
          'alertTypes',
          isInWarningArea ? allAlerts : alertsOnly
        )
      }

      dispatch(setSelectedLocation(locationWithAlertTypes))

      // what even is this? please remind me to come back to this when reviewing
      if (isInAlertArea) {
        setHistoricalAlertNumber(alertArea.features[0].properties.TA_CODE)
      }
      if (isInWarningArea) {
        setHistoricalWarningNumber(warningArea?.features[0].properties.TA_CODE)
      }

      let isWithinWarningAreaProximity = false
      let isWithinAlertAreaProximity = false

      if (!isInAlertArea || !isInWarningArea) {
        // check that there are flood areas within boundary box around location
        isWithinWarningAreaProximity = warningArea?.features.length > 0
        isWithinAlertAreaProximity = alertArea?.features.length > 0
      }

      // this needs reset when on the view location page
      if (isWithinWarningAreaProximity || isWithinAlertAreaProximity) {
        dispatch(setNearbyTargetAreasFlow(true))
        dispatch(setNearbyTargetAreasAdded([]))
      } else {
        dispatch(setNearbyTargetAreasFlow(false))
        dispatch(setNearbyTargetAreasAdded([]))
      }

      const floodAreas = alertArea?.features.concat(warningArea?.features)
      let floodAreasAlreadyAdded = []
      floodAreas?.forEach((area) => {
        profileLocations?.forEach((loc) => {
          const locationsTargetAreas = getAdditional(
            loc?.additionals,
            'targetAreas'
          )

          if (
            loc.address === area.properties.TA_Name ||
            (locationsTargetAreas &&
              locationsTargetAreas?.some((targetArea) => {
                return targetArea.TA_Name === area.properties.TA_Name
              }))
          ) {
            floodAreasAlreadyAdded.push(area.properties.TA_Name)
          }
        })
      })

      console.log('floodAreasAlreadyAdded', floodAreasAlreadyAdded)

      dispatch(setFloodAreasAlreadyAdded(floodAreasAlreadyAdded))

      continueToNextPage(
        floodAreasAlreadyAdded,
        isInWarningArea,
        isInAlertArea,
        isWithinWarningAreaProximity,
        isWithinAlertAreaProximity,
        isError
      )
    } finally {
      setLoading(false)
    }
  }

  const selectCentreOfAllAreas = (event) => {
    event.preventDefault()
    const features = turf.points(
      locations.map((l) => [l.coordinates.longitude, l.coordinates.latitude])
    )

    const centre = turf.center(features)

    const centerLocation = {
      coordinates: {
        latitude: centre.geometry.coordinates[1],
        longitude: centre.geometry.coordinates[0]
      },
      address: locationPostCode,
      name: ''
    }

    handleSelectedLocation(event, centerLocation)
  }

  const detailsMessage = (
    <div>
      You can view flood message areas&nbsp;
      <Link
        className='govuk-link'
        onClick={(event) => selectCentreOfAllAreas(event)}
        style={{ cursor: 'pointer' }}
      >
        near this postcode
      </Link>
    </div>
  )

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
                  <h1 className='govuk-heading-l'>
                    {locationPostCode
                      ? 'Select an address'
                      : 'Select a location'}
                  </h1>
                  {locationPostCode && (
                    <p className='govuk-body'>
                      Postcode: {locationPostCode}
                      {'   '}
                      <Link
                        to={returnToSearchPage ? returnToSearchPage : '#'}
                        onClick={(e) => {
                          if (!returnToSearchPage) {
                            e.preventDefault()
                            navigate(-1)
                          }
                        }}
                        className='govuk-link govuk-!-padding-left-5'
                        style={{ cursor: 'pointer' }}
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
                              style={{ cursor: 'pointer' }}
                            >
                              {location.address}
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
                    <Link
                      onClick={() => navigate(-1)}
                      className='govuk-link'
                      style={{ cursor: 'pointer' }}
                    >
                      Search using a different location
                    </Link>
                  )}
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
