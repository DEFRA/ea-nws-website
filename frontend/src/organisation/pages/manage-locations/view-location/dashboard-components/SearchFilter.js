import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Button from '../../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../../common/components/gov-uk/CheckBox'

export default function SearchFilter({
  selectedLocationTypeFilters,
  setSelectedLocationTypeFilters,
  selectedFloodMessagesAvailbleFilters,
  setSelectedFloodMessagesAvailbleFilters,
  selectedBusinessCriticalityFilters,
  setSelectedBusinessCriticalityFilters,
  filterLocations
}) {
  // filters
  const locationTypes = [
    { value: 'Office' },
    { value: 'Retail space' },
    { value: 'Warehouse' }
  ]
  const floodMessagesAvailble = [{ value: 'Yes' }, { value: 'No' }]
  const businessCriticality = [
    { value: 'High' },
    { value: 'Medium' },
    { value: 'Low' }
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
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const handleFloodMessagesAvailbleFilterChange = (event) => {
    const { value } = event.target
    setSelectedFloodMessagesAvailbleFilters((prev) => {
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

  return (
    <>
      <div className='govuk-heading-m locations-filter-header'>
        <h1 className='govuk-heading-m'>Filter</h1>
      </div>

      <Button
        text='Apply Filter'
        className='govuk-button govuk-button--primary'
        onClick={() => filterLocations()}
      />
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3' />

      {/* Location name filter */}
      <div
        className='locations-filter-section'
        onClick={() => setLocationNameVisible(!locationNameVisible)}
      >
        <FontAwesomeIcon
          icon={locationNameVisible ? faAngleDown : faAngleUp}
          size='lg'
        />
        <p className='locations-filter-title'>Location name</p>
      </div>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Location type filter */}
      <div
        className='locations-filter-section'
        onClick={() => {
          setLocationTypeVisible(!locationTypeVisible)
          setSelectedLocationTypeFilters([])
        }}
      >
        <FontAwesomeIcon
          icon={locationTypeVisible ? faAngleDown : faAngleUp}
          size='lg'
        />
        <p className='locations-filter-title'>Location type</p>
      </div>
      {locationTypeVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {locationTypes.map((option) => (
            <CheckBox
              key={option.value}
              label={option.value}
              value={option.value}
              checked={selectedLocationTypeFilters.includes(option.value)}
              onChange={handleLocationTypeFilterChange}
            />
          ))}
        </div>
      )}
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Flood messages available filter */}
      <div
        className='locations-filter-section'
        onClick={() => {
          setFloodMessagesVisible(!floodMessagesVisible)
          setSelectedFloodMessagesAvailbleFilters([])
        }}
      >
        <FontAwesomeIcon
          icon={floodMessagesVisible ? faAngleDown : faAngleUp}
          size='lg'
        />
        <p className='locations-filter-title'>Flood messages available</p>
      </div>
      {floodMessagesVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {floodMessagesAvailble.map((option) => (
            <CheckBox
              key={option.value}
              label={option.value}
              value={option.value}
              checked={selectedFloodMessagesAvailbleFilters.includes(
                option.value
              )}
              onChange={handleFloodMessagesAvailbleFilterChange}
            />
          ))}
        </div>
      )}
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

      {/* Business criticality filter */}
      <div
        className='locations-filter-section'
        onClick={() => {
          setBusinessCriticalityVisible(!businessCriticalityVisible)
          setSelectedBusinessCriticalityFilters([])
        }}
      >
        <FontAwesomeIcon
          icon={businessCriticalityVisible ? faAngleDown : faAngleUp}
          size='lg'
        />
        <p className='locations-filter-title'>Business criticality</p>
      </div>
      {businessCriticalityVisible && (
        <div className='govuk-checkboxes govuk-checkboxes--small'>
          {businessCriticality.map((option) => (
            <CheckBox
              key={option.value}
              label={option.value}
              value={option.value}
              checked={selectedBusinessCriticalityFilters.includes(
                option.value
              )}
              onChange={handleBusinessCriticalityFilterChange}
            />
          ))}
        </div>
      )}
    </>
  )
}
