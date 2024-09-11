import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import CheckBox from '../../../../common/components/gov-uk/CheckBox'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../common/components/gov-uk/Pagination'

export default function ViewLocationsDashboardPage() {
  const navigate = useNavigate()
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])

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

  const filterLocations = () => {
    let filteredLocations = locations

    // Apply Location Type filter
    if (selectedLocationTypeFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedLocationTypeFilters.includes(location.type)
      )
    }

    // Apply Flood Messages filter
    if (selectedFloodMessagesAvailbleFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedFloodMessagesAvailbleFilters.includes(location.available)
      )
    }

    // Apply Business Criticality filter
    if (selectedBusinessCriticalityFilters.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        selectedBusinessCriticalityFilters.includes(location.critical)
      )
    }

    setFilteredLocations(filteredLocations)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10
  const displayedLocations = filteredLocations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    filteredLocations.map(() => false)
  )
  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)

  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked
    setIsTopCheckboxChecked(isChecked)
    setSelectedCheckboxes(filteredLocations.map(() => isChecked))
  }

  const handleRowCheckboxChange = (index) => {
    const updatedCheckboxes = [...selectedCheckboxes]
    updatedCheckboxes[index] = !updatedCheckboxes[index]
    setSelectedCheckboxes(updatedCheckboxes)

    if (!updatedCheckboxes[index]) {
      setIsTopCheckboxChecked(false)
    } else if (updatedCheckboxes.every((checked) => checked)) {
      setIsTopCheckboxChecked(true)
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success'
              title='Success'
              text='100 new locations added'
            />
            <h1 className='govuk-heading-l'>Your organisation's locations</h1>
            <Button
              text='Add locations'
              className='govuk-button govuk-button--secondary'
            />
            <Link className='govuk-link inline-link'>Back to settings</Link>
            <p className='govuk-caption-m govuk-!-margin-bottom-9'>
              Last updated: by you at 11:15am, 10 May 2024,{' '}
              <Link>View all updates</Link>
            </p>

            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3 locations-filter-container'>
                <div className='govuk-heading-m locations-filter-header'>
                  <h1 className='govuk-heading-m'>Filter</h1>
                </div>

                <Button
                  text='Apply Filter'
                  className='govuk-button govuk-button--primary'
                  onClick={() => filterLocations()}
                />
                <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3' />

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
                <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

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
                  <div class='govuk-checkboxes govuk-checkboxes--small'>
                    {locationTypes.map((option) => (
                      <CheckBox
                        key={option.value}
                        label={option.value}
                        value={option.value}
                        checked={selectedLocationTypeFilters.includes(
                          option.value
                        )}
                        onChange={handleLocationTypeFilterChange}
                      />
                    ))}
                  </div>
                )}
                <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

                {/* Flood messages availble filter */}
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
                  <p className='locations-filter-title'>
                    Flood messages availble
                  </p>
                </div>
                {floodMessagesVisible && (
                  <div class='govuk-checkboxes govuk-checkboxes--small'>
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
                <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-3 govuk-!-margin-bottom-3' />

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
                  <div class='govuk-checkboxes govuk-checkboxes--small'>
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
              </div>

              <div className='govuk-grid-column-three-quarters'>
                <Button
                  text='Close Filter'
                  className='govuk-button govuk-button--secondary'
                />
                <p className=' govuk-!-margin-bottom-6'>700 locations</p>
                <table className='govuk-table govuk-table--small-text-until-tablet'>
                  <thead className='govuk-table__head'>
                    <tr className='govuk-table__row'>
                      <th scope='col' className='govuk-table__header'>
                        <div
                          className='govuk-checkboxes govuk-checkboxes--small'
                          data-module='govuk-checkboxes'
                        >
                          <CheckBox
                            checked={isTopCheckboxChecked}
                            onChange={handleHeaderCheckboxChange}
                          />
                        </div>
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Location name
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Location type
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Flood messages
                        <br /> available
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Business criticality
                      </th>
                      <th scope='col' className='govuk-table__header' />
                    </tr>
                  </thead>
                  <tbody className='govuk-table__body'>
                    {displayedLocations.map((location, index) => {
                      return (
                        <tr className='govuk-table__row' key={index}>
                          <th scope='row' className='govuk-table__header'>
                            <div
                              className='govuk-checkboxes govuk-checkboxes--small'
                              data-module='govuk-checkboxes'
                            >
                              <CheckBox
                                checked={selectedCheckboxes[index]}
                                onChange={() => handleRowCheckboxChange(index)}
                              />
                            </div>
                          </th>
                          <td className='govuk-table__cell'>{location.name}</td>
                          <td className='govuk-table__cell'>{location.type}</td>
                          <td className='govuk-table__cell'>
                            {location.available}
                          </td>
                          <td className='govuk-table__cell'>
                            {location.critical}
                          </td>
                          <td className='govuk-table__cell'>
                            <Link>View or edit</Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <Pagination
                  totalPages={Math.ceil(
                    filteredLocations.length / locationsPerPage
                  )}
                  onPageChange={(val) => setCurrentPage(val)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
