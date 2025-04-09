import * as turf from '@turf/turf'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink.js'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner.js'
import Button from '../../../../../common/components/gov-uk/Button'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import LocationDataType from '../../../../../common/enums/LocationDataType.js'
import { getAdditional } from '../../../../../common/redux/userSlice.js'
import { backendCall } from '../../../../../common/services/BackendService.js'
import { convertDataToGeoJsonFeature } from '../../../../../common/services/GeoJsonHandler.js'
import { getFloodAreaByTaCode } from '../../../../../common/services/WfsFloodDataService.js'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter.js'
import FloodReportsFilter from './dashboard-components/FloodReportsFilter'
import FloodReportsTable from './dashboard-components/FloodReportsTable'

export default function LiveFloodWarningsDashboardPage () {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const defaultAlertsPerPage = 20
  const [displayedLocationsAffected, setDisplayedAlerts] = useState([])
  const [filteredLocationsAffected, setFilteredLocationsAffected] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [holdPage, setHoldPage] = useState(0)
  const [locationsAffectedPerPage, setLocationsAffectedPerPage] =
    useState(defaultAlertsPerPage)

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [loading, setLoading] = useState(true)
  const [locationsAffected, setLocationsAffected] = useState([])

  useEffect(() => {
    ;(async () => {
      await loadLiveWarnings()
      setLoading(false)
    })()
  }, [])

  const loadLiveWarnings = async () => {
    setLocationsAffected([])

    // get orgs locations
    const { data: locationsData } = await backendCall(
      { orgId },
      'api/elasticache/list_locations',
      navigate
    )

    // convert each location to a web format
    const locations = []
    if (locationsData) {
      for (const location of locationsData) {
        locations.push(geoSafeToWebLocation(location))
      }

      // attach linked contacts to each location and convert x and y coords to geojson points
      const locationsCollection = []
      for (const location of locations) {
        // linked contacts
        const contactsDataToSend = { authToken, orgId, location }
        const { data } = await backendCall(
          contactsDataToSend,
          'api/elasticache/list_linked_contacts',
          navigate
        )

        location.linked_contacts = []
        if (data) {
          data.forEach((contact) => {
            location.linked_contacts.push(contact.id)
          })
        }

        // x and y coord conversion
        let feature
        const locationType = location.additionals.other.location_data_type

        if (locationType === LocationDataType.X_AND_Y_COORDS) {
          // turf accepts in the format [lng,lat] - we save points as [lat,lng]
          feature = convertDataToGeoJsonFeature('Point', [
            location.coordinates.longitude,
            location.coordinates.latitude
          ])
        } else {
          feature = location.geometry.geoJson
        }

        locationsCollection.push(feature)
      }

      // calculate boundary around locations
      const geoJsonFeatureCollection =
        turf.featureCollection(locationsCollection)

      const bbox = turf.bbox(geoJsonFeatureCollection)

      const { data: partnerId } = await backendCall(
        'data',
        'api/service/get_partner_id'
      )

      const options = {
        states: ['CURRENT'],
        boundingBox: {
          southWest: {
            latitude: parseInt(bbox[1] * 10 ** 6),
            longitude: parseInt(bbox[0] * 10 ** 6)
          },
          northEast: {
            latitude: parseInt(bbox[3] * 10 ** 6),
            longitude: parseInt(bbox[2] * 10 ** 6)
          }
        },
        channels: [],
        partnerId
      }

      // load live alerts
      const { data: liveAlertsData } = await backendCall(
        { options },
        'api/alert/list',
        navigate
      )

      // loop through live alerts - loop through all locations to find affected locations
      for (const liveAlert of liveAlertsData?.alerts) {
        const TA_CODE = getAdditional(
          liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
          'TA_CODE'
        )

        const severity = liveAlert.type
        const updatedTime = getUpdatedTime(liveAlert.effectiveDate)
        const floodArea = await getFloodAreaByTaCode(TA_CODE)

        for (const location of locations) {
          processLocation(location, floodArea, severity, updatedTime)
        }
      }
    }
  }

  const processLocation = (location, floodArea, severity, updatedTime) => {
    const { coordinates, geometry, additionals } = location
    const locationType = additionals.other.location_data_type

    // add required data to location row object
    const createLocationWithFloodData = () => {
      const updatedLocation = {
        locationData: location,
        floodData: [
          {
            type: severity,
            name: floodArea.properties.TA_Name,
            code: floodArea.properties.TA_CODE,
            updatedTime
          }
        ]
      }

      return updatedLocation
    }

    // for xy coord locations
    const handleXYCoordinates = () => {
      const updatedLocation = createLocationWithFloodData()
      const point = convertDataToGeoJsonFeature('Point', [
        coordinates.longitude,
        coordinates.latitude
      ])

      if (turf.booleanIntersects(point, floodArea.geometry)) {
        setLocationsAffected((prevLocations) => {
          const index = prevLocations.findIndex(
            (loc) => loc.locationData.id === updatedLocation.locationData.id
          )

          if (index !== -1) {
            const existingFloodData = prevLocations[index].floodData
            const updatedFloodData = updatedLocation.floodData

            const mergedFloodData = [...existingFloodData, ...updatedFloodData]

            // remove duplicates
            prevLocations[index].floodData = mergedFloodData.filter(
              (item, index, self) =>
                index === self.findIndex((f) => f.code === item.code)
            )

            return prevLocations
          } else {
            // if location doesn't exist in array, add the new entry
            return [...prevLocations, updatedLocation]
          }
        })
      }
    }

    // for shapes or boundary's locations
    const handleGeoJsonLocation = () => {
      const updatedLocation = createLocationWithFloodData()
      if (turf.booleanIntersects(geometry.geoJson, floodArea.geometry)) {
        setLocationsAffected((prevLocs) => [...prevLocs, updatedLocation])
      }
    }

    if (locationType === LocationDataType.X_AND_Y_COORDS) {
      handleXYCoordinates()
    } else {
      handleGeoJsonLocation()
    }
  }

  // required to convert the unix time from geosafe
  const getUpdatedTime = (unixTime) => {
    const date = new Date(unixTime * 1000)

    const options = { hour: 'numeric', minute: '2-digit', hour12: true }
    let time = date.toLocaleTimeString('en-GB', options).toLowerCase()
    time = time.replace(' ', '') // Remove space between time and AM/PM

    const day = date.getDate()
    const month = date.toLocaleString('en-GB', { month: 'long' })
    const year = date.getFullYear()

    return `${day} ${month} ${year} at ${time}`
  }

  useEffect(() => {
    if (locationsAffectedPerPage === null) {
      setDisplayedAlerts(filteredLocationsAffected)
    } else {
      setDisplayedAlerts(
        filteredLocationsAffected.slice(
          (currentPage - 1) * locationsAffectedPerPage,
          currentPage * locationsAffectedPerPage
        )
      )
    }
  }, [filteredLocationsAffected, currentPage, locationsAffectedPerPage])

  useEffect(() => {
    if (resetPaging) {
      setCurrentPage(1)
      setResetPaging(false)
    }
  }, [resetPaging])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredLocationsAffected])

  const openCloseFilter = () => {
    setHoldPage(currentPage)
    setIsFilterVisible(!isFilterVisible)
  }

  // Selected filters
  const [locationNameFilter, setLocationNameFilter] = useState('')
  const [selectedWarningTypeFilters, setSelectedWarningTypeFilters] = useState(
    []
  )
  const [selectedLocationTypeFilters, setSelectedLocationTypeFilters] =
    useState([])
  const [
    selectedBusinessCriticalityFilters,
    setSelectedBusinessCriticalityFilters
  ] = useState([])

  useEffect(() => {
    if (locationsAffectedPerPage === null) {
      window.print()
      setLocationsAffectedPerPage(defaultAlertsPerPage)
    }
  }, [locationsAffectedPerPage, defaultAlertsPerPage])

  const onPrint = (event) => {
    event.preventDefault()
    setLocationsAffectedPerPage(null)
  }

  const table = (
    <>
      <Button
        text={isFilterVisible ? 'Close filter' : 'Open filter'}
        className='govuk-button govuk-button--secondary inline-block'
        onClick={() => openCloseFilter()}
      />
      &nbsp; &nbsp;
      <Button
        text='Print'
        className='govuk-button govuk-button--secondary inline-block'
        onClick={(event) => onPrint(event)}
      />
      <FloodReportsTable
        locationsAffected={locationsAffected}
        displayedLocationsAffected={displayedLocationsAffected}
        filteredLocationsAffected={filteredLocationsAffected}
        setFilteredLocationsAffected={setFilteredLocationsAffected}
        resetPaging={resetPaging}
        setResetPaging={setResetPaging}
      />
      <Pagination
        totalPages={Math.ceil(
          filteredLocationsAffected.length / locationsAffectedPerPage
        )}
        onPageChange={(val) => setCurrentPage(val)}
        holdPage={holdPage}
        setHoldPage={setHoldPage}
        pageList
        reset={resetPaging}
      />
    </>
  )
  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <br />
            <h1 className='govuk-heading-l'>Live flood warnings</h1>
            {loading
              ? (
                <LoadingSpinner />
                )
              : !isFilterVisible
                  ? (
                    <div className='govuk-grid-row'>
                      <>{table}</>
                    </div>
                    )
                  : (
                    <div className='govuk-grid-row'>
                      <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3 contacts-filter-container'>
                        <FloodReportsFilter
                          locationsAffected={locationsAffected}
                          setFilteredLocationsAffected={setFilteredLocationsAffected}
                          resetPaging={resetPaging}
                          setResetPaging={setResetPaging}
                          selectedFilters={selectedFilters}
                          setSelectedFilters={setSelectedFilters}
                          locationNameFilter={locationNameFilter}
                          setLocationNameFilter={setLocationNameFilter}
                          selectedWarningTypeFilters={selectedWarningTypeFilters}
                          setSelectedWarningTypeFilters={
                      setSelectedWarningTypeFilters
                    }
                          selectedLocationTypeFilters={selectedLocationTypeFilters}
                          setSelectedLocationTypeFilters={
                      setSelectedLocationTypeFilters
                    }
                          selectedBusinessCriticalityFilters={
                      selectedBusinessCriticalityFilters
                    }
                          setSelectedBusinessCriticalityFilters={
                      setSelectedBusinessCriticalityFilters
                    }
                        />
                      </div>
                      <div className='govuk-grid-column-three-quarters'>{table}</div>
                    </div>
                    )}
          </div>
        </div>
      </main>
    </>
  )
}
