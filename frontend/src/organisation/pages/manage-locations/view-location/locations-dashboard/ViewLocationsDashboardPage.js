import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import DashboardHeader from './dashboard-components/DashboardHeader'
import LocationsTable from './dashboard-components/LocationsTable'
import SearchFilter from './dashboard-components/SearchFilter'

export default function ViewLocationsDashboardPage() {
  const navigate = useNavigate()
  const [locations, setLocations] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const orgId = useSelector((state) => state.session.orgId)

  useEffect(() => {
    const getLocations = async () => {
      const dataToSend = { orgId }
      const { data } = await backendCall(
        dataToSend,
        'api/elasticache/list_locations',
        navigate
      )
      const locations = []
      if (data) {
        data.forEach((location) => {
          locations.push(geoSafeToWebLocation(location))
        })
      }
      setLocations(locations)
      setFilteredLocations(locations)
    }
    getLocations()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const locationsPerPage = 10
  const displayedLocations = filteredLocations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
    setSelectedLocations([])
  }, [resetPaging])

  // selected filters
  const [selectedLocationTypeFilters, setSelectedLocationTypeFilters] =
    useState([])
  const [
    selectedFloodMessagesAvailbleFilters,
    setSelectedFloodMessagesAvailbleFilters
  ] = useState([])
  const [
    selectedBusinessCriticalityFilters,
    setSelectedBusinessCriticalityFilters
  ] = useState([])

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <DashboardHeader />
            {!isFilterVisible ? (
              <>
                <Button
                  text='Filter locations'
                  className='govuk-button govuk-button--secondary'
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                />
                <LocationsTable
                  locations={locations}
                  displayedLocations={displayedLocations}
                  filteredLocations={filteredLocations}
                  selectedLocations={selectedLocations}
                  setSelectedLocations={setSelectedLocations}
                />
                <Pagination
                  totalPages={Math.ceil(
                    filteredLocations.length / locationsPerPage
                  )}
                  onPageChange={(val) => setCurrentPage(val)}
                />
              </>
            ) : (
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3 locations-filter-container'>
                  <SearchFilter
                    locations={locations}
                    setFilteredLocations={setFilteredLocations}
                    resetPaging={resetPaging}
                    setResetPaging={setResetPaging}
                    selectedLocationTypeFilters={selectedLocationTypeFilters}
                    setSelectedLocationTypeFilters={
                      setSelectedLocationTypeFilters
                    }
                    selectedFloodMessagesAvailbleFilters={
                      selectedFloodMessagesAvailbleFilters
                    }
                    setSelectedFloodMessagesAvailbleFilters={
                      setSelectedFloodMessagesAvailbleFilters
                    }
                    selectedBusinessCriticalityFilters={
                      selectedBusinessCriticalityFilters
                    }
                    setSelectedBusinessCriticalityFilters={
                      setSelectedBusinessCriticalityFilters
                    }
                  />
                </div>

                <div className='govuk-grid-column-three-quarters'>
                  <Button
                    text='Close Filter'
                    className='govuk-button govuk-button--secondary'
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                  />
                  <LocationsTable
                    locations={locations}
                    displayedLocations={displayedLocations}
                    filteredLocations={filteredLocations}
                    selectedLocations={selectedLocations}
                    setSelectedLocations={setSelectedLocations}
                  />
                  <Pagination
                    totalPages={Math.ceil(
                      filteredLocations.length / locationsPerPage
                    )}
                    onPageChange={(val) => setCurrentPage(val)}
                    reset={resetPaging}
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
