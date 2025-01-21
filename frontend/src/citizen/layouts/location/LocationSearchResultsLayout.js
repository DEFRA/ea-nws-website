import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../common/components/custom/LoadingSpinner'
import Details from '../../../common/components/gov-uk/Details'
import Pagination from '../../../common/components/gov-uk/Pagination'
import {
  setFloodAlertCount,
  setNearbyTargetAreasFlow,
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setSelectedLocation,
  setSevereFloodWarningCount,
  setShowOnlySelectedFloodArea
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { csvToJson } from '../../../common/services/CsvToJson'
import {
  getSurroundingFloodAreas,
  isLocationInFloodArea
} from '../../../common/services/WfsFloodDataService'
import * as turf from '@turf/turf'
export default function LocationSearchResultsLayout ({ continueToNextPage }) {
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
  
  const [floodHistoryUrl, setHistoryUrl] = useState(null)
  const [floodHistoryData, setFloodHistoryData] = useState(null)

  useEffect(() => {
    async function getHistoryUrl () {
      const { data } = await backendCall(
        'data',
        'api/locations/download_flood_history'
      )
      setHistoryUrl(data)
    }

    getHistoryUrl()
    floodHistoryUrl && fetch(floodHistoryUrl)
      .then((response) => response.text())
      .then((data) => {
        setFloodHistoryData(csvToJson(data))
      })
      .catch((e) =>
        console.error('Could not fetch Historic Flood Warning file', e)
      )
  }, [floodHistoryUrl])

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
      console.log('Warning Area:', warningArea);
console.log('Alert Area:', alertArea);
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

      if (isInAlertArea) {
        setHistoricalAlertNumber(alertArea.features[0].properties.FWS_TACODE)
      }
      if (isInWarningArea) {
        setHistoricalWarningNumber(
          warningArea?.features[0].properties.FWS_TACODE
        )
      }

      let isWithinWarningAreaProximity = false
      let isWithinAlertAreaProximity = false

      if (!isInAlertArea || !isInWarningArea) {
        // check that there are flood areas within boundary box around location
        isWithinWarningAreaProximity = warningArea?.features.length > 0
        isWithinAlertAreaProximity = alertArea?.features.length > 0
      }

      continueToNextPage(
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
    var features =turf.points(locations.map((l) => 
      [l.coordinates.longitude,
        l.coordinates.latitude]
    ));
    
    var center = turf.center(features);
    console.log(center)

    const centerLocation = {
      coordinates: {
        latitude: center.geometry.coordinates[1],
        longitude: center.geometry.coordinates[0],
      }
    };
  
    handleSelectedLocation(event, centerLocation);

    
  }

  const detailsMessage = (
    
    <div>
      You can view flood message areas&nbsp;
      <Link
      className = 'govuk-link'
    onClick={(event)=>selectCentreOfAllAreas(event)}
      >
      near this postcode
      </Link>
      {/* <a href='/signup/register-location/location-in-proximity-area/alert' className='govuk-link'>
        near this postcode
      </a> */}
    </div>
  )



  return (
    <>

      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            {loading
              ? (
                <LoadingSpinner />
                )
              : (
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
                                  handleSelectedLocation(event, location)}
                              >
                                {location.address}
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {locationPostCode
                      ? (
                        <Details
                          title='I cannot find my address here'
                          text={detailsMessage}
                        />
                        )
                      : (
                        <Link onClick={() => navigate(-1)} className='govuk-link'>
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
