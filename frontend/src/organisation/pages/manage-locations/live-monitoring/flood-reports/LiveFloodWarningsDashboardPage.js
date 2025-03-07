import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink.js'
import Button from '../../../../../common/components/gov-uk/Button'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import { getAdditional } from '../../../../../common/redux/userSlice.js'
import { backendCall } from '../../../../../common/services/BackendService.js'
import {
  getFloodAreaByTaCode,
  getLiveFloodAlerts,
  locationIntersectsAlert
} from '../../../../../common/services/WfsFloodDataService.js'
import FloodReportsFilter from './dashboard-components/FloodReportsFilter'
import FloodReportsTable from './dashboard-components/FloodReportsTable'

export default function LiveFloodWarningsDashboardPage() {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const defaultAlertsPerPage = 20

  const [locations, setLocations] = useState([])
  const [alerts, setAlerts] = useState([])
  const [locationsWithAlerts, setLocationsWithAlerts] = useState([])
  const [displayedAlerts, setDisplayedAlerts] = useState([])
  const [filteredAlerts, setFilteredAlerts] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [holdPage, setHoldPage] = useState(0)
  const [alertsPerPage, setAlertsPerPage] = useState(defaultAlertsPerPage)

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)

  // Load in mock data
  useEffect(() => {
    const loadLocations = async () => {
      const { data: locationsData } = await backendCall(
        { orgId },
        'api/elasticache/list_locations',
        navigate
      )

      // Attach linked contacts to each location
      const updatedLocations = await Promise.all(
        locationsData.map(async (location) => {
          const { data: contactsData } = await backendCall(
            { authToken, orgId, location },
            'api/elasticache/list_linked_contacts',
            navigate
          )
          location.linked_contacts = contactsData || {}
          return location
        })
      )

      const uniqueLocations = Array.from(
        new Map(
          updatedLocations.map((location) => [location.id, location])
        ).values()
      )

      setLocations(uniqueLocations)
    }

    const loadAlerts = async () => {
      const liveAlerts = await getLiveFloodAlerts()
      // For each alert, attach its flood area geometry using TA_CODE
      const alertsWithFloodArea = await Promise.all(
        liveAlerts.map(async (alert) => {
          const TA_CODE = getAdditional(
            alert.mode.zoneDesc.placemarks[0].geometry.extraInfo,
            'TA_CODE'
          )
          const floodArea = await getFloodAreaByTaCode(TA_CODE)
          return { ...alert, floodArea }
        })
      )
      setAlerts(alertsWithFloodArea)
    }

    loadLocations()
    loadAlerts()
  }, [])

  // Combine location and alert data using spatial intersection.
  useEffect(() => {
    if (locations.length && alerts.length) {
      const combined = locations
        .map((location) => {
          const matchingAlert = alerts.find((alert) => {
            if (!alert.floodArea) return false
            return locationIntersectsAlert(location, alert.floodArea)
          })
          return matchingAlert ? { ...location, alert: matchingAlert } : null
        })
        .filter((item) => item !== null)
      setLocationsWithAlerts(combined)
      setFilteredAlerts(combined)
    }
  }, [alerts, locations])

  useEffect(() => {
    if (alertsPerPage === null) {
      setDisplayedAlerts(filteredAlerts)
    } else {
      setDisplayedAlerts(
        filteredAlerts.slice(
          (currentPage - 1) * alertsPerPage,
          currentPage * alertsPerPage
        )
      )
    }
  }, [filteredAlerts, currentPage, alertsPerPage])

  useEffect(() => {
    if (resetPaging) {
      setCurrentPage(1)
      setResetPaging(false)
    }
  }, [resetPaging])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredAlerts])

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
  const [selectedBusCriticalityFilters, setSelectedBusCriticalityFilters] =
    useState([])

  const onPrint = () => {
    setAlertsPerPage(filteredAlerts.length)
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
      <FloodReportsTable
        locationsWithAlerts={locationsWithAlerts}
        displayedAlerts={displayedAlerts}
        filteredAlerts={filteredAlerts}
        setFilteredAlerts={setFilteredAlerts}
        resetPaging={resetPaging}
        setResetPaging={setResetPaging}
      />
      <Pagination
        totalPages={Math.ceil(filteredAlerts.length / alertsPerPage)}
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
            {!isFilterVisible ? (
              <div className='govuk-grid-row'>
                <>{table}</>
              </div>
            ) : (
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3 contacts-filter-container'>
                  <FloodReportsFilter
                    locationsWithAlerts={locationsWithAlerts}
                    setFilteredAlerts={setFilteredAlerts}
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
                    selectedBusCriticalityFilters={
                      selectedBusCriticalityFilters
                    }
                    setSelectedBusCriticalityFilters={
                      setSelectedBusCriticalityFilters
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
