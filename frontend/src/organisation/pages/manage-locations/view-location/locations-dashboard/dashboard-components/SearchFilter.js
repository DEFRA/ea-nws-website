import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Button from '../../../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../../../common/components/gov-uk/CheckBox'

export default function SearchFilter ({
  locations,
  filteredLocations,
  setFilteredLocations,
  resetPaging,
  setResetPaging,
  selectedLocationTypeFilters,
  setSelectedLocationTypeFilters,
  selectedFloodMessagesAvailableFilters,
  setSelectedFloodMessagesAvailableFilters,
  selectedBusinessCriticalityFilters,
  setSelectedBusinessCriticalityFilters
}) {
  // filters
  const [selectedFilters, setSelectedFilters] = useState([])
  const [locationNameFilter, setLocationNameFilter] = useState('')

  // useEffect(() => {
  //   console.log('Filter changed: ', selectedLocationTypeFilters)
  //   setSelectedFilters([...selectedLocationTypeFilters])
  // }, selectedLocationTypeFilters)

  const locationTypes = [
    ...new Set(
      locations
        .map((location) => location.meta_data.location_additional.location_type)
        .filter((locationType) => locationType) // filters out undefined entries
    )
  ]
  // the below probably needs updated unless it can only be Yes or No
  const floodMessagesAvailable = ['Yes', 'No']
  const businessCriticality = [
    ...new Set(
      locations
        .map(
          (location) =>
            location.meta_data.location_additional.business_criticality
        )
        .filter((businessCriticality) => businessCriticality) // filters out undefined entries
    )
  ]

  // search filters visibility
  const [locationNameVisible, setLocationNameVisible] = useState(true)
  const [locationTypeVisible, setLocationTypeVisible] = useState(true)
  const [floodMessagesVisible, setFloodMessagesVisible] = useState(true)
  const [businessCriticalityVisible, setBusinessCriticalityVisible] =
    useState(true)

  // handle filters applied
  const handleLocationTypeFilterChange = (event) => {
    const { value } = event.target
    setSelectedLocationTypeFilters((prev) => {
      if (prev.includes(value)) {
        setSelectedFilters(...prev.filter((preference) => preference !== value))
        return prev.filter((preference) => preference !== value)
      } else {
        setSelectedFilters([...prev, value])
        return [...prev, value]
      }
    })
  }

  const handleFloodMessagesAvailableFilterChange = (event) => {
    const { value } = event.target
    setSelectedFloodMessagesAvailableFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const handleBusinessCriticalityFilterChange = (event) => {
    const { value } = event.target
    setSelectedBusinessCriticalityFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const filterLocations = () => {
    let filteredLocations = locations

    // Apply Location name filter
    if (locationNameFilter) {
      filteredLocations = filteredLocations.filter((location) =>
        location.location_additional.location_name
          .toLowerCase()
          .includes(locationNameFilter.toLowerCase())
      )
    }

    // Apply Location Type filter
    if (selectedLocationTypeFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedLocationTypeFilters.includes(
          location.meta_data.location_additional.location_type
        )
      )
    }

    // Apply Flood Messages filter
    if (selectedFloodMessagesAvailableFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) => {
        if (
          selectedFloodMessagesAvailableFilters.includes('Yes') &&
          selectedFloodMessagesAvailableFilters.includes('No')
        ) {
          // return all locations
          return true
        } else if (selectedFloodMessagesAvailableFilters.includes('Yes')) {
          return location.alert_categories.length > 0
        } else if (selectedFloodMessagesAvailableFilters.includes('No')) {
          return location.alert_categories.length === 0
        }

        // Default return none (this should never be reached)
        return false
      })
    }

    // Apply Business Criticality filter
    if (selectedBusinessCriticalityFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedBusinessCriticalityFilters.includes(
          location.meta_data.location_additional.business_criticality
        )
      )
    }

    // Apply Groundwater flood risk filter
    // if (selectedGroundwaterFlooRiskFilters.length > 0) {
    //   filteredLocations = filteredLocations.filter((location) =>
    //     selectedGroundwaterFlooRiskFilters.includes(
    //       location.meta_data.location_additional.business_criticality
    //     )
    //   )
    // }

    setResetPaging(!resetPaging)
    setFilteredLocations(filteredLocations)
  }

  const locationNameSearchFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3' />
      <div
        className='locations-filter-section'
        onClick={() => setLocationNameVisible(!locationNameVisible)}
      >
        <FontAwesomeIcon
          icon={locationNameVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Location name</p>
      </div>
      {locationNameVisible && (
        <div class='govuk-form-group'>
          <div class='input-with-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='input-icon' />
            <input
              className='govuk-input govuk-input-icon govuk-!-margin-top-3'
              id='location-name'
              type='text'
              value={locationNameFilter}
              onChange={(event) => {
                setLocationNameFilter(event.target.value)
              }}
            />
          </div>
        </div>
      )}
    </>
  )

  const locationTypeFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />
      <div
        className='locations-filter-section'
        onClick={() => {
          setLocationTypeVisible(!locationTypeVisible)
        }}
      >
        <FontAwesomeIcon
          icon={locationTypeVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Location type</p>
      </div>
      {locationTypeVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {locationTypes.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedLocationTypeFilters.includes(option)}
              onChange={handleLocationTypeFilterChange}
            />
          ))}
        </div>
      )}
    </>
  )

  const businessCriticalityFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />
      <div
        className='locations-filter-section'
        onClick={() => {
          setBusinessCriticalityVisible(!businessCriticalityVisible)
        }}
      >
        <FontAwesomeIcon
          icon={businessCriticalityVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Business criticality</p>
      </div>
      {businessCriticalityVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {businessCriticality.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedBusinessCriticalityFilters.includes(option)}
              onChange={handleBusinessCriticalityFilterChange}
            />
          ))}
        </div>
      )}
    </>
  )

  // const groundWaterFloodRiskFilter = (
  //   <>
  //     <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />
  //     <div
  //       className='locations-filter-section'
  //       onClick={() => {
  //         setGroundWaterFloodRiskVisible(!groundWaterFloodRiskVisible)
  //       }}
  //     >
  //       <FontAwesomeIcon
  //         icon={groundWaterFloodRiskVisible ? faAngleUp : faAngleDown}
  //         size='lg'
  //       />
  //       <p className='locations-filter-title'>Groundwater flood risk</p>
  //     </div>
  //     {groundWaterFloodRiskVisible && (
  //       <div className='govuk-checkboxes govuk-checkboxes--small'>
  //         {groundWaterFloodRisk.map((option) => (
  //           <CheckBox
  //             key={option}
  //             label={option}
  //             value={option}
  //             checked={selectedGroundWaterFloodRiskFilters.includes(option)}
  //             onChange={handleGroundWaterFloodRiskFilterChange}
  //           />
  //         ))}
  //       </div>
  //     )}
  //   </>
  // )

  const floodMessagesAvailableFilter = (
    <>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />
      <div
        className='locations-filter-section'
        onClick={() => {
          setFloodMessagesVisible(!floodMessagesVisible)
        }}
      >
        <FontAwesomeIcon
          icon={floodMessagesVisible ? faAngleUp : faAngleDown}
          size='lg'
        />
        <p className='locations-filter-title'>Flood messages available</p>
      </div>
      {floodMessagesVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {floodMessagesAvailable.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              checked={selectedFloodMessagesAvailableFilters.includes(option)}
              onChange={handleFloodMessagesAvailableFilterChange}
            />
          ))}
        </div>
      )}
    </>
  )

  const selectedFilterContents = (filterName, filterArray, setFilterArray) => {
    return (
      <>
        <h3 className='govuk-heading-s govuk-!-margin-bottom-2'>
          {filterName}
        </h3>
        {filterArray.map((filter) => (
          <>
            <div className='filter'>
              {filter}

              <button
                className='filter-button'
                onClick={() => {
                  setFilterArray(filterArray.filter((item) => item !== filter))
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </>
        ))}
      </>
    )
  }

  return (
    <>
      <div className='locations-filter-header'>
        <h1 className='govuk-heading-m govuk-!-margin-bottom-2'>Filter</h1>
      </div>

      {selectedFilters?.length > 0 && (
        <div className='locations-filter-selected govuk-!-margin-bottom-2'>
          <h2 className='govuk-heading-s'>Selected filters</h2>
          {selectedFilterContents(
            'Location type',
            selectedLocationTypeFilters,
            setSelectedLocationTypeFilters
          )}
          {/* {selectedBusinessCriticalityFilters.length > 0 && (
            <h3 className='govuk-heading-s'>Business criticality</h3>
          )}
          {selectedFloodMessagesAvailableFilters.length > 0 && (
            <h3 className='govuk-heading-s'>Rivers and sea flood risk</h3>
          )} */}
        </div>
      )}

      <div className=' govuk-!-margin-top-6'>
        <Button
          text='Apply Filter'
          className='govuk-button govuk-button--primary'
          onClick={() => filterLocations()}
        />
      </div>

      {locationNameSearchFilter}
      {locationTypeFilter}
      {businessCriticalityFilter}
      {floodMessagesAvailableFilter}
    </>
  )
}
