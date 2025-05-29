import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink.js'
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner.js'
import Button from '../../../../common/components/gov-uk/Button'
import Pagination from '../../../../common/components/gov-uk/Pagination'
import AlertState from '../../../../common/enums/AlertState.js'
import { getAdditional } from '../../../../common/redux/userSlice.js'
import { backendCall } from '../../../../common/services/BackendService.js'
import { geoSafeToWebLocation } from '../../../../common/services/formatters/LocationFormatter.js'
import FloodReportFilter from '../components/FloodReportFilter'
import FloodReportsTable from './dashboard-components/FloodReportsTable.js'

export default function LiveFloodWarningsDashboardPage() {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const defaultLocationsPerPage = 20
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [holdPage, setHoldPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filteredLocationsAffected, setFilteredLocationsAffected] = useState([])
  const [locationsAffected, setLocationsAffected] = useState([])
  const [locationsAffectedPerPage, setLocationsAffectedPerPage] = useState(
    defaultLocationsPerPage
  )
  const [displayedLocationsAffected, setDisplayedLocationsAffected] = useState(
    []
  )

  useEffect(() => {
    ;(async () => {
      await loadLiveWarnings()
      setLoading(false)
    })()
  }, [])

  const loadLiveWarnings = async () => {
    setLocationsAffected([])
    setDisplayedLocationsAffected([])

    const { data: partnerId } = await backendCall(
      'data',
      'api/service/get_partner_id'
    )

    const options = {
      states: [AlertState.CURRENT],
      states: [AlertState.CURRENT],
      boundingBox: null,
      channels: [],
      partnerId
    }

    // load alerts
    const { data: alerts } = await backendCall(
      { options },
      'api/alert/list',
      navigate
    )

    if (alerts) {
      const { data: locationsData } = await backendCall(
        { orgId },
        'api/elasticache/list_locations',
        navigate
      )

      const locations = []
      // link contacts and convert to web format
      for (let location of locationsData) {
        location = geoSafeToWebLocation(location)
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
        locations.push(location)
      }

      if (locations) {
        // loop through live alerts - loop through all locations to find affected locations
        for (const liveAlert of alerts?.alerts) {
          const TA_CODE = getAdditional(
            liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
            'TA_CODE'
          )
          const TA_NAME = getAdditional(
            liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
            'TA_Name'
          )

          const severity = liveAlert.type
          const [day, month, year, hour, minute] = getAdditional(
            liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
            'lastmodifieddate'
          ).split(/[:\/\s]+/)
          const lastUpdatedTime = new Date(year, month - 1, day, hour, minute)

          for (const location of locations) {
            processLocation(
              location,
              severity,
              lastUpdatedTime,
              TA_CODE,
              TA_NAME
            )
          }
        }
      }
    }
  }

  const processLocation = (
    location,
    severity,
    lastUpdatedTime,
    TA_CODE,
    TA_NAME
  ) => {
    const { additionals } = location
    const locationIntersectsWithFloodArea =
      additionals.other?.targetAreas?.some(
        (targetArea) => targetArea.TA_CODE === TA_CODE
      )

    if (!locationIntersectsWithFloodArea) return

    // add required data to location row object
    const createLocationWithFloodData = () => {
      const updatedLocation = {
        locationData: location,
        floodData: {
          type: severity,
          name: TA_NAME,
          code: TA_CODE,
          lastUpdatedTime
        }
      }

      return updatedLocation
    }

    const updatedLocation = createLocationWithFloodData()
    setLocationsAffected((prevLocs) => [...prevLocs, updatedLocation])
    setDisplayedLocationsAffected((prevLocs) => [...prevLocs, updatedLocation])
    setFilteredLocationsAffected((prevLocs) => [...prevLocs, updatedLocation])
  }

  useEffect(() => {
    if (locationsAffectedPerPage === null) {
      setDisplayedLocationsAffected(filteredLocationsAffected)
    } else {
      setDisplayedLocationsAffected(
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

  // filters
  const [filters, setFilters] = useState({
    locationName: '',
    selectedWarningTypes: [],
    selectedLocationTypes: [],
    selectedBusinessCriticalities: []
  })

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      locationName: '',
      selectedWarningTypes: [],
      selectedLocationTypes: [],
      selectedBusinessCriticalities: []
    })
    setFilteredLocationsAffected(locationsAffected)
  }

  const onPrint = () => {
    setCurrentPage(1) // always show page 1
    setLocationsAffectedPerPage(null) // null = “show all rows”
  }

  useEffect(() => {
    if (locationsAffectedPerPage === null) {
      window.print()
      setLocationsAffectedPerPage(defaultLocationsPerPage)
      setFilteredLocationsAffected(locationsAffected)
    }
  }, [locationsAffectedPerPage])

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
        onClick={() => onPrint()}
      />
      <FloodReportsTable
        locationsAffected={locationsAffected}
        displayedLocationsAffected={displayedLocationsAffected}
        setDisplayedLocationsAffected={setDisplayedLocationsAffected}
        filteredLocationsAffected={filteredLocationsAffected}
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
            {loading ? (
              <LoadingSpinner />
            ) : !isFilterVisible ? (
              <div className='govuk-grid-row'>
                <>{table}</>
              </div>
            ) : (
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3 contacts-filter-container'>
                  <FloodReportFilter
                    locationsAffected={locationsAffected}
                    setFilteredLocationsAffected={setFilteredLocationsAffected}
                    resetPaging={resetPaging}
                    setResetPaging={setResetPaging}
                    filters={filters}
                    updateFilter={updateFilter}
                    clearFilters={clearFilters}
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
