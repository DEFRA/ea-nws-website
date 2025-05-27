import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
/* import locationPin from '../../../common/assets/images/location_pin.svg' */
import { setCurrentLocation } from '../../../common/redux/userSlice'
import { webToGeoSafeLocation } from '../../../common/services/formatters/LocationFormatter'
/* import FullscreenMap from '../../pages/manage-locations/view-location/FullscreenMap' */
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationsTable({
  locations,
  displayedLocations,
  filteredLocations,
  selectedLocations,
  setSelectedLocations,
  setFilteredLocations,
  resetPaging,
  setResetPaging,
  onAction,
  actionText,
  linkContacts,
  locationPrefix
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /* const [showMap, setShowMap] = useState(false) */
  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)
  const [locationNameSort, setLocationNameSort] = useState('none')
  const [locationTypeSort, setLocationTypeSort] = useState('none')
  const [businessCriticalitySort, setBusinessCriticalitySort] = useState('none')
  const [getsFloodMessagesSort, setGetsFloodMessagesSort] = useState('none')
  const [linkedContactsSort, setLinkedContactsSort] = useState('none')
  const [riverSeaRisksSort, setRiverSeaRisksSort] = useState('none')
  const [groundWaterRisksSort, setGroundWaterRisksSort] = useState('none')

  useEffect(() => {
    setLocationNameSort('none')
    setLocationTypeSort('none')
    setBusinessCriticalitySort('none')
    setGetsFloodMessagesSort('none')
    setLinkedContactsSort('none')
    setRiverSeaRisksSort('none')
  }, [locations])

  // Sort standard data
  const sortData = (sortType, setSort, data) => {
    const getValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj)
    }

    if (sortType === 'none' || sortType === 'descending') {
      setSort('ascending')
      setFilteredLocations(
        [...filteredLocations].sort((a, b) => {
          const valueA = getValue(a, data)
          const valueB = getValue(b, data)

          // Place empty strings at the end
          if (
            (valueA === '' || valueA == null) &&
            (valueB === '' || valueB == null)
          ) {
            return 0
          }
          if (valueA === '' || valueA == null) return 1
          if (valueB === '' || valueB == null) return -1

          return (valueA || '').localeCompare(valueB || '')
        })
      )
    }
    if (sortType === 'ascending') {
      setSort('descending')
      setFilteredLocations(
        [...filteredLocations].sort((a, b) => {
          const valueA = getValue(a, data)
          const valueB = getValue(b, data)
          return (valueB || '').localeCompare(valueA || '')
        })
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortGetsFloodMessages = () => {
    if (
      getsFloodMessagesSort === 'none' ||
      getsFloodMessagesSort === 'descending'
    ) {
      setGetsFloodMessagesSort('ascending')
      setFilteredLocations(
        [...filteredLocations].sort((a, b) =>
          a.additionals.other?.alertTypes?.length >
          b.additionals.other?.alertTypes?.length
            ? 1
            : -1
        )
      )
    }
    if (getsFloodMessagesSort === 'ascending') {
      setGetsFloodMessagesSort('descending')
      setFilteredLocations(
        [...filteredLocations].sort((a, b) =>
          a.additionals.other?.alertTypes?.length <
          b.additionals.other?.alertTypes?.length
            ? 1
            : -1
        )
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortLinkedContacts = () => {
    if (linkedContactsSort === 'none' || linkedContactsSort === 'descending') {
      setLinkedContactsSort('ascending')
      setFilteredLocations(
        [...filteredLocations].sort((a, b) => {
          return a.linked_contacts?.length > b.linked_contacts?.length ? 1 : -1
        })
      )
    }
    if (linkedContactsSort === 'ascending') {
      setLinkedContactsSort('descending')
      setFilteredLocations(
        [...filteredLocations].sort((a, b) => {
          return a.linked_contacts?.length < b.linked_contacts?.length ? 1 : -1
        })
      )
    }
  }

  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked
    setIsTopCheckboxChecked(isChecked)
    if (isChecked) {
      setSelectedLocations(displayedLocations)
    } else {
      setSelectedLocations([])
    }
  }

  const handleLocationSelected = (location) => {
    let updatedSelectedLocations = []

    if (selectedLocations.includes(location)) {
      updatedSelectedLocations = selectedLocations.filter(
        (selectedLocation) => selectedLocation !== location
      )
    } else {
      updatedSelectedLocations = [...selectedLocations, location]
    }
    setSelectedLocations(updatedSelectedLocations)
  }

  const viewLocation = (e, location) => {
    e.preventDefault()
    dispatch(setCurrentLocation(webToGeoSafeLocation(location)))
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  const viewLinkedContacts = (e, location) => {
    e.preventDefault()
    dispatch(setCurrentLocation(webToGeoSafeLocation(location)))
    navigate(orgManageLocationsUrls.view.viewLinkedContacts)
  }

  const updateMessageSettings = (e, location) => {
    e.preventDefault()
    dispatch(setCurrentLocation(webToGeoSafeLocation(location)))
    navigate(orgManageLocationsUrls.view.viewMessages)
  }

  /* const openMap = () => {
    setShowMap(true)
  } */

  const LoadingDots = (
    <div className='loading-dots'>
      <span className='dot one'>.</span>
      <span className='dot two'>.</span>
      <span className='dot three'>.</span>
    </div>
  )

  return (
    <>
      <p className='govuk-!-margin-bottom-6 locations-table-panel'>
        {filteredLocations.length !== locations.length ? 'Showing ' : ''}
        {filteredLocations.length !== locations.length
          ? filteredLocations.length
          : ''}
        {filteredLocations.length !== locations.length ? ' of ' : ''}
        {locations.length}
        {locationPrefix ? ' ' + locationPrefix : ''}
        {locations.length === 1 ? ' location' : ' locations'}{' '}
        <span style={{ margin: '0 20px' }}>|</span>
        <span style={{ color: '#1d70b8' }}>
          {selectedLocations.length}{' '}
          {selectedLocations.length === 1 ? 'location' : 'locations'} selected{' '}
        </span>
        {/* {!linkContacts && (
          <>
            <span style={{ margin: '0 20px' }}>|</span>
            <img src={locationPin} alt='Location pin icon' />
            <Link className='govuk-link' onClick={openMap}>
              View on map
            </Link>
          </>
        )} */}
      </p>
      {/* {showMap && (
        <FullscreenMap
          showMap={showMap}
          setShowMap={setShowMap}
          locations={locations}
          filteredLocations={filteredLocations}
        />
      )} */}
      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header'>
              <div
                className='govuk-checkboxes govuk-checkboxes--small'
                data-module='govuk-checkboxes'
              >
                <div className='govuk-checkboxes__item'>
                  <input
                    className='govuk-checkboxes__input'
                    type='checkbox'
                    checked={isTopCheckboxChecked && selectedLocations.length}
                    onChange={handleHeaderCheckboxChange}
                  />
                  <label className='govuk-label govuk-checkboxes__label' />
                </div>
              </div>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={locationNameSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(
                    locationNameSort,
                    setLocationNameSort,
                    'additionals.locationName'
                  )
                }
              >
                Location name
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={locationTypeSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(
                    locationTypeSort,
                    setLocationTypeSort,
                    'additionals.other.location_type'
                  )
                }
              >
                Location type
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={businessCriticalitySort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(
                    businessCriticalitySort,
                    setBusinessCriticalitySort,
                    'additionals.other.business_criticality'
                  )
                }
              >
                Business
                <br /> criticality
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={getsFloodMessagesSort}
            >
              <button type='button' onClick={() => sortGetsFloodMessages()}>
                Gets flood
                <br /> messages
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={linkedContactsSort}
            >
              <button type='button' onClick={() => sortLinkedContacts()}>
                Linked
                <br /> contacts
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={riverSeaRisksSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(
                    riverSeaRisksSort,
                    setRiverSeaRisksSort,
                    'riverSeaRisk.title'
                  )
                }
              >
                Rivers and sea
                <br /> flood risk
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={groundWaterRisksSort}
            >
              <button
                type='button'
                onClick={() =>
                  sortData(
                    groundWaterRisksSort,
                    setGroundWaterRisksSort,
                    'groundWaterRisk.title'
                  )
                }
              >
                Groundwater
                <br /> flood risk
              </button>
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedLocations.map((location, index) => (
            <tr className='govuk-table__row' key={index}>
              <th scope='row' className='govuk-table__header'>
                <div
                  className='govuk-checkboxes govuk-checkboxes--small'
                  data-module='govuk-checkboxes'
                >
                  <div className='govuk-checkboxes__item'>
                    <input
                      className='govuk-checkboxes__input'
                      type='checkbox'
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationSelected(location)}
                    />
                    <label className='govuk-label govuk-checkboxes__label' />
                  </div>
                </div>
              </th>
              <td className='govuk-table__cell' style={{ width: '25rem' }}>
                <Link
                  className='govuk-link'
                  onClick={(e) => viewLocation(e, location)}
                >
                  {location.additionals.locationName}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {location.additionals.other?.location_type}
              </td>
              <td className='govuk-table__cell'>
                {location.additionals.other?.business_criticality}
              </td>
              <td className='govuk-table__cell'>
                <Link
                  className='govuk-link'
                  onClick={(e) => updateMessageSettings(e, location)}
                >
                  {(location.within === true &&
                    location.additionals.other?.alertTypes?.length > 0) ||
                  (location.additionals.other?.childrenIDs?.length > 0 &&
                    location.additionals.other?.alertTypes?.length > 0)
                    ? 'Yes'
                    : 'No'}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {location.linked_contacts?.length !== undefined ? (
                  <Link
                    className='govuk-link'
                    onClick={(e) => viewLinkedContacts(e, location)}
                  >
                    {location.linked_contacts?.length}
                  </Link>
                ) : (
                  LoadingDots
                )}
              </td>
              <td className='govuk-table__cell'>
                <span
                  className={`flood-risk-container ${location.riverSeaRisk?.className}`}
                >
                  {location.riverSeaRisk?.title}
                </span>
              </td>
              <td className='govuk-table__cell'>
                <span
                  className={`flood-risk-container ${location.groundWaterRisk?.className}`}
                >
                  {location.groundWaterRisk?.title}
                </span>
              </td>
              <td className='govuk-table__cell'>
                <Link
                  className='govuk-link'
                  onClick={(e) => onAction(e, actionText, location)}
                >
                  {actionText}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
