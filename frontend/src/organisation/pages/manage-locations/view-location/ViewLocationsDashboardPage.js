import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Pagination from '../../../../common/components/gov-uk/Pagination'
import DashboardHeader from './dashboard-components/DashboardHeader'
import LocationsTable from './dashboard-components/LocationsTable'
import SearchFilter from './dashboard-components/SearchFilter'

export default function ViewLocationsDashboardPage() {
  const navigate = useNavigate()
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  useEffect(() => {
    const l = [
      {
        id: 1,
        name: 'Location_ID1',
        type: 'Office',
        available: 'Yes',
        critical: 'High'
      },
      {
        id: 2,
        name: 'Location_ID2',
        type: 'Retail space',
        available: 'Yes',
        critical: '-'
      },
      {
        id: 3,
        name: 'Location_ID3',
        type: 'Office',
        available: 'No',
        critical: 'Medium'
      },
      {
        id: 4,
        name: 'Location_ID4',
        type: 'Warehouse',
        available: 'Yes',
        critical: 'Low'
      },
      {
        id: 5,
        name: 'Location_ID5',
        type: 'Office',
        available: 'No',
        critical: 'High'
      },
      {
        id: 6,
        name: 'Location_ID6',
        type: 'Retail space',
        available: 'Yes',
        critical: 'Medium'
      },
      {
        id: 7,
        name: 'Location_ID7',
        type: 'Office',
        available: 'Yes',
        critical: 'Low'
      },
      {
        id: 8,
        name: 'Location_ID8',
        type: 'Data Center',
        available: 'No',
        critical: 'High'
      },
      {
        id: 9,
        name: 'Location_ID9',
        type: 'Retail space',
        available: 'Yes',
        critical: 'Medium'
      },
      {
        id: 10,
        name: 'Location_ID10',
        type: 'Warehouse',
        available: 'No',
        critical: 'Low'
      },
      {
        id: 11,
        name: 'Location_ID11',
        type: 'Office',
        available: 'Yes',
        critical: 'Medium'
      },
      {
        id: 12,
        name: 'Location_ID12',
        type: 'Data Center',
        available: 'Yes',
        critical: 'High'
      },
      {
        id: 13,
        name: 'Location_ID13',
        type: 'Retail space',
        available: 'No',
        critical: 'Low'
      },
      {
        id: 14,
        name: 'Location_ID14',
        type: 'Warehouse',
        available: 'Yes',
        critical: 'Medium'
      },
      {
        id: 15,
        name: 'Location_ID15',
        type: 'Office',
        available: 'No',
        critical: 'Low'
      },
      {
        id: 16,
        name: 'Location_ID16',
        type: 'Data Center',
        available: 'Yes',
        critical: 'High'
      },
      {
        id: 17,
        name: 'Location_ID17',
        type: 'Warehouse',
        available: 'No',
        critical: 'Medium'
      },
      {
        id: 18,
        name: 'Location_ID18',
        type: 'Retail space',
        available: 'Yes',
        critical: 'Low'
      },
      {
        id: 19,
        name: 'Location_ID19',
        type: 'Office',
        available: 'Yes',
        critical: 'Medium'
      },
      {
        id: 20,
        name: 'Location_ID20',
        type: 'Warehouse',
        available: 'Yes',
        critical: 'High'
      },
      {
        id: 21,
        name: 'Location_ID21',
        type: 'Retail space',
        available: 'No',
        critical: 'Low'
      },
      {
        id: 22,
        name: 'Location_ID22',
        type: 'Data Center',
        available: 'Yes',
        critical: 'High'
      },
      {
        id: 23,
        name: 'Location_ID23',
        type: 'Warehouse',
        available: 'No',
        critical: 'Medium'
      },
      {
        id: 24,
        name: 'Location_ID24',
        type: 'Office',
        available: 'Yes',
        critical: 'Low'
      },
      {
        id: 25,
        name: 'Location_ID25',
        type: 'Retail space',
        available: 'Yes',
        critical: 'Medium'
      },
      {
        id: 26,
        name: 'Location_ID26',
        type: 'Data Center',
        available: 'No',
        critical: 'High'
      },
      {
        id: 27,
        name: 'Location_ID27',
        type: 'Warehouse',
        available: 'Yes',
        critical: 'Low'
      },
      {
        id: 28,
        name: 'Location_ID28',
        type: 'Office',
        available: 'No',
        critical: 'Medium'
      }
    ]
    setLocations(l)
    setFilteredLocations(l)
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10
  const displayedLocations = filteredLocations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

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
                <LocationsTable locations={displayedLocations} />
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
                  />
                </div>

                <div className='govuk-grid-column-three-quarters'>
                  <Button
                    text='Close Filter'
                    className='govuk-button govuk-button--secondary'
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                  />
                  <LocationsTable locations={displayedLocations} />
                  <Pagination
                    totalPages={Math.ceil(
                      filteredLocations.length / locationsPerPage
                    )}
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
