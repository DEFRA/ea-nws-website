import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import Pagination from '../../../common/components/gov-uk/Pagination'
import { backendCall } from '../../../common/services/BackendService.js'
import FloodReportsFilter from './dashboard-components/FloodReportsFilter'
import FloodReportsTable from './dashboard-components/FloodReportsTable'

export default function LiveFloodWarningsDashboardPage() {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)

  const [locations, setLocations] = useState([])
  const [alerts, setAlerts] = useState([])
  const [locationsWithAlerts, setLocationsWithAlerts] = useState([])
  const [displayedAlerts, setDisplayedAlerts] = useState([])
  const [filteredAlerts, setFilteredAlerts] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [holdPage, setHoldPage] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const alertsPerPage = 10

  // Load in mock data
  useEffect(() => {
    const loadLocations = async () => {
      const { data: locationsData } = await backendCall(
        { orgId },
        'api/elasticache/list_locations',
        navigate
      )
      console.log('Locations retrieved: ', locationsData)
      setLocations(locationsData)
    }
    const loadAlerts = async () => {
      const { data: liveAlertsData } = await backendCall(
        {},
        'api/alert/list',
        navigate
      )
      // Only keep alerts that are live (i.e. not expired)
      // UNCOMMENT THIS AFTER TESTING
      // const now = Math.floor(Date.now / 1000)
      // const activeAlerts = liveAlertsData.alerts.filter(
      //   (alert) => alert.expirationDate > now
      // )
      // setWarnings(activeAlerts)

      setAlerts(liveAlertsData.alerts)
    }
    loadLocations()
    loadAlerts()
  }, [])

  // Combine data once locations and alerts have been populated
  useEffect(() => {
    const debugLocNames = []
    const debugAlertNames = []
    let debugAlertNamesFilled = false

    try {
      const combined = locations
        .map((location) => {
          const locNameObj = location.additionals.find(
            (item) => item.id === 'locationName'
          )
          if (!locNameObj) {
            return null
          }
          const locName = locNameObj.value.s.toLowerCase()

          debugLocNames.push(locName)

          // For each alert, check if the alert's placemark or TA_NAME contains the location name
          const matchingAlert = alerts.find((alert) => {
            const placemark = alert.mode.zoneDesc.placemarks[0]
            const taNameObj = placemark.geometry.extraInfo.find(
              (info) => info.id === 'TA_NAME'
            )

            const alertDisplayName = (
              taNameObj ? taNameObj.value.s : placemark.name
            ).toLowerCase()

            if (!debugAlertNamesFilled) {
              debugAlertNames.push(alertDisplayName)
            }
            return alertDisplayName.includes(locName)
          })

          debugAlertNamesFilled = true

          if (matchingAlert) {
            return { ...location, alert: matchingAlert }
          } else {
            return null
          }
        })
        .filter((item) => item !== null)

      console.log('Location names: ', debugLocNames)
      console.log('Alert names: ', debugAlertNames)

      console.log('Locations with alerts: ', combined)

      setLocationsWithAlerts(combined)
    } catch (e) {
      console.log(e)
    }
  }, [alerts, locations])

  useEffect(() => {
    if (locationsWithAlerts.length > 0) {
      setFilteredAlerts(locationsWithAlerts)
    }
  }, [locationsWithAlerts])

  useEffect(() => {
    if (filteredAlerts.length > 0) {
      setDisplayedAlerts(
        filteredAlerts.slice(
          (currentPage - 1) * alertsPerPage,
          currentPage * alertsPerPage
        )
      )
    }
  }, [filteredAlerts, currentPage])

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
  const [locationNameFilter, setLocationNameFilter] = useState([])
  const [selectedWarningTypeFilters, setSelectedWarningTypeFilters] = useState(
    []
  )
  const [selectedLocationTypeFilters, setSelectedLocationTypeFilters] =
    useState([])
  const [selectedBusCriticalityFilters, setSelectedBusCriticalityFilters] =
    useState([])

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
        onClick={() => window.print()} // TODO utilise formatted print when available
      />
      <FloodReportsTable
        warnings={locationsWithAlerts}
        displayedWarnings={displayedAlerts}
        filteredWarnings={filteredAlerts}
        setFilteredWarnings={setFilteredAlerts}
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
                    warnings={locationsWithAlerts}
                    setFilteredWarnings={setFilteredAlerts}
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
