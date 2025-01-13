import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import Pagination from '../../../common/components/gov-uk/Pagination'
import LocationDataType from '../../../common/enums/LocationDataType'
import FloodReportsFilter from './dashboard-components/FloodReportsFilter'
import FloodReportsTable from './dashboard-components/FloodReportsTable'

export default function LiveFloodWarningsDashboardPage () {
  const navigate = useNavigate()

  const [warnings, setWarnings] = useState([])
  const [displayedWarnings, setDisplayedWarnings] = useState([])
  const [filteredWarnings, setFilteredWarnings] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [holdPage, setHoldPage] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const warningsPerPage = 10

  // TODO: Integrate real warning data when available
  useEffect(() => {
    const l = [
      {
        name: 'UPRN',
        address: '34 Hughenden Road, High Wycombe, LE2 7BB',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        alert_categories: ['Alert'],
        meta_data: {
          location_additional: {
            location_name: 'Location_01',
            full_address: 'some address',
            postcode: 'LE2 7BB',
            x_coordinate: 466413.18,
            y_coordinate: 105037.31,
            internal_reference: 'PS01, unit 57, HighW_07',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: '1. Dont panic!',
            notes:
              'John Smith has the flood plan for this location. His contact number is 01234 567 890',
            keywords: '["Midlands"]',
            location_data_type: LocationDataType.X_AND_Y_COORDS
          }
        }
      },
      {
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 54.197594, longitude: -3.089788 },
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            location_name: 'Location_02',
            full_address: '',
            postcode: '',
            x_coordinate: 329000.58,
            y_coordinate: 478530.6,
            internal_reference: '',
            business_criticality: 'Low',
            location_type: 'County',
            action_plan: '',
            notes: '',
            keywords: '',
            location_data_type: LocationDataType.X_AND_Y_COORDS
          }
        }
      },
      {
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            location_name: 'Location_03',
            full_address: '',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: '',
            business_criticality: '',
            location_type: 'Warehouse',
            action_plan: '',
            notes: '',
            keywords: '',
            location_data_type: LocationDataType.SHAPE_POLYGON
          }
        }
      },
      {
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        alert_categories: ['Warning'],
        meta_data: {
          location_additional: {
            location_name: 'Location_04',
            full_address: '',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: '',
            business_criticality: '',
            location_type: 'Unitary authority',
            action_plan: '',
            notes: '',
            keywords: '',
            location_data_type: LocationDataType.SHAPE_LINE
          }
        }
      },
      {
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        alert_categories: ['Warning', 'Alert'],
        meta_data: {
          location_additional: {
            location_name: 'Location_05',
            full_address: '',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: '',
            business_criticality: 'High',
            location_type: 'County',
            action_plan: '',
            notes: '',
            keywords: '',
            location_data_type: LocationDataType.BOUNDARY
          }
        }
      }
    ]

    // Filter locations with alert_categories
    const w = l.filter((location) => location.alert_categories !== null)
    setWarnings(w)
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
            {!isFilterVisible
              ? (
                <div className='govuk-grid-row'>
                  <>{table}</>
                </div>
                )
              : (
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
