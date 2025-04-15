import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary.js'
import Pagination from '../../../../common/components/gov-uk/Pagination'
import AlertState from '../../../../common/enums/AlertState'
import { getAdditional } from '../../../../common/redux/userSlice.js'
import { getAlertsAffectingOrganisationsLocations } from '../../../../common/services/GetAlertsAffectingOrganisationsLocations'
import FloodReportFilter from '../components/FloodReportFilter'
import HistoricalFloodReportsTable from './dashboard-components/HistoricalFloodReportsTable'

export default function FloodWarningHistoryDashboardPage() {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)

  const defaultLocationsPerPage = 20
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [filterErrorMessages, setFilterErrorMessages] = useState([])
  const [holdPage, setHoldPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [loading, setLoading] = useState(true)
  const [locationsAffected, setLocationsAffected] = useState([])
  const [filteredLocationsAffected, setFilteredLocationsAffected] = useState([])
  const [locationsAffectedPerPage, setLocationsAffectedPerPage] = useState(
    defaultLocationsPerPage
  )
  const [displayedLocationsAffected, setDisplayedLocationsAffected] = useState(
    []
  )

  useEffect(() => {
    ;(async () => {
      await loadHistoricWarnings()
      setLoading(false)
    })()
  }, [])

  const loadHistoricWarnings = async () => {
    setLocationsAffected([])
    setDisplayedLocationsAffected([])

    const getAlerts = getAlertsAffectingOrganisationsLocations()

    const { alerts, locations } = await getAlerts(navigate, orgId, [
      AlertState.PAST,
      AlertState.CURRENT
    ])

    if (locations) {
      for (const liveAlert of alerts?.alerts) {
        const TA_CODE = getAdditional(
          liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
          'TA_CODE'
        )
        const TA_NAME = getAdditional(
          liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
          'TA_NAME'
        )

        const severity = liveAlert.type

        let [day, month, year, hour, minute] = getAdditional(
          liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
          'createddate'
        ).split(/[:\/\s]+/)

        const startDate = new Date(year, month - 1, day, hour, minute)

        ;[day, month, year, hour, minute] = getAdditional(
          liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
          'lastmodifieddate'
        ).split(/[:\/\s]+/)

        const lastUpdatedTime = new Date(year, month - 1, day, hour, minute)

        for (const location of locations) {
          processLocation(
            location,
            severity,
            TA_CODE,
            TA_NAME,
            startDate,
            lastUpdatedTime
          )
        }
      }
    }
  }

  const processLocation = (
    location,
    severity,
    TA_CODE,
    TA_NAME,
    startDate,
    lastUpdatedTime
  ) => {
    const { additionals } = location
    let locationIntersectsWithFloodArea = additionals.other?.targetAreas?.some(
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
          startDate,
          lastUpdatedTime
        }
      }

      return updatedLocation
    }

    const updatedLocation = createLocationWithFloodData()
    setLocationsAffected((prevLocs) => [...prevLocs, updatedLocation])
    setDisplayedLocationsAffected((prevLocs) => [...prevLocs, updatedLocation])
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
    dateFrom: '',
    dateTo: '',
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
      dateFrom: '',
      dateTo: '',
      locationName: '',
      selectedWarningTypes: [],
      selectedLocationTypes: [],
      selectedBusinessCriticalities: []
    })
    setFilteredLocationsAffected(locationsAffected)
  }

  const onPrint = () => {
    setLocationsAffectedPerPage(filteredLocationsAffected.length)
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
        onClick={() => onPrint()}
      />
      <HistoricalFloodReportsTable
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
            <ErrorSummary errorList={filterErrorMessages} />
            <br />
            <h1 className='govuk-heading-l'>Flood warning history</h1>
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
                    setFilterErrorMessages={setFilterErrorMessages}
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
