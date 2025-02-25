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

  const [warnings, setWarnings] = useState([])
  const [displayedWarnings, setDisplayedWarnings] = useState([])
  const [filteredWarnings, setFilteredWarnings] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [holdPage, setHoldPage] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const warningsPerPage = 10

  // Load in mock data
  useEffect(() => {
    const loadWarnings = async () => {
      const { data: liveAlertsData } = await backendCall(
        {},
        'api/alert/list',
        navigate
      )
      setWarnings(liveAlertsData.alerts)
    }
    loadWarnings()
  }, [])

  useEffect(() => {
    if (warnings.length > 0) {
      setFilteredWarnings(warnings)
    }
  }, [warnings])

  useEffect(() => {
    if (filteredWarnings.length > 0) {
      setDisplayedWarnings(
        filteredWarnings.slice(
          (currentPage - 1) * warningsPerPage,
          currentPage * warningsPerPage
        )
      )
    }
  }, [filteredWarnings, currentPage])

  useEffect(() => {
    if (resetPaging) {
      setCurrentPage(1)
      setResetPaging(false)
    }
  }, [resetPaging])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredWarnings])

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
        warnings={warnings}
        displayedWarnings={displayedWarnings}
        filteredWarnings={filteredWarnings}
        setFilteredWarnings={setFilteredWarnings}
        resetPaging={resetPaging}
        setResetPaging={setResetPaging}
      />
      <Pagination
        totalPages={Math.ceil(filteredWarnings.length / warningsPerPage)}
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
                    warnings={warnings}
                    setFilteredWarnings={setFilteredWarnings}
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
