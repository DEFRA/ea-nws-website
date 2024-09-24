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
  const [selectedLocations, setSelectedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  useEffect(() => {
    const l = [
      {
        name: 'Location_ID2',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: '-',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID3',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: [],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID4',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID5',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID6',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID7',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: [],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID8',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID9',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID10',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID11',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID12',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID13',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID14',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: [],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID15',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID16',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: [],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID17',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID18',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID19',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID20',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID21',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: [],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID22',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID23',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID24',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID25',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID26',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID27',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      },
      {
        name: 'Location_ID28',
        address: 'some address',
        coordinates: ['lat', 'lng'],
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'lng',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            keywords: 'keywords'
          }
        }
      }
    ]
    setLocations(l)
    setFilteredLocations(l)
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
