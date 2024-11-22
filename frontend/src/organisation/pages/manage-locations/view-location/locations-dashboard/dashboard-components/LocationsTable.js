import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import locationPin from '../../../../../../common/assets/images/location_pin.svg'
import Popup from '../../../../../../common/components/custom/Popup'
import LocationDataType from '../../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../../common/enums/RiskAreaType'
import { setCurrentLocation } from '../../../../../../common/redux/userSlice'
import RiskCategoryLabel from '../../../../../components/custom/RiskCategoryLabel'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationsTable ({
  locations,
  displayedLocations,
  filteredLocations,
  selectedLocations,
  setSelectedLocations,
  setFilteredLocations,
  resetPaging,
  setResetPaging,
  riskRating
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)
  const [locationNameSort, setLocationNameSort] = useState('none')
  const [locationTypeSort, setLocationTypeSort] = useState('none')
  const [businessCriticalitySort, setBusinessCriticalitySort] = useState('none')
  const [getsFloodMessagesSort, setGetsFloodMessagesSort] = useState('none')
  const [linkedContactsSort, setLinkedContactsSort] = useState('none')
  const [riverSeaRisksSort, setRiverSeaRisksSort] = useState('none')
  const [groundWaterRisksSort, setGroundWaterRisksSort] = useState('none')
  const [dialog, setDialog] = useState({
    show: false,
    text: '',
    title: '',
    buttonText: '',
    buttonClass: '',
    input: '',
    charLimit: 0,
    error: ''
  })

  useEffect(() => {
    setLocationNameSort('none')
    setLocationTypeSort('none')
    setBusinessCriticalitySort('none')
    setGetsFloodMessagesSort('none')
    setLinkedContactsSort('none')
    setRiverSeaRisksSort('none')
  }, [locations])

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
          a.alert_categories.length > b.alert_categories.length ? 1 : -1
        )
      )
    }
    if (getsFloodMessagesSort === 'ascending') {
      setGetsFloodMessagesSort('descending')
      setFilteredLocations(
        [...filteredLocations].sort((a, b) =>
          a.alert_categories.length < b.alert_categories.length ? 1 : -1
        )
      )
    }
    setResetPaging(!resetPaging)
  }

  const sortLinkedContacts = () => {
    // TODO when linked contacts are available
  }

  const sortRiverSeaRisks = () => {
    // TODO
  }

  const sortGroundWaterRisks = () => {
    // TODO
  }

  const viewLocation = (e, location) => {
    e.preventDefault()
    dispatch(setCurrentLocation(location))
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  const updateMessageSettings = (e, location) => {
    // TODO
  }

  const linkToContacts = (e, location) => {
    // TODO
  }

  const deleteLocation = (e, location) => {
    setDialog({
      show: true,
      text: (
        <>
          If you continue {location.meta_data.location_additional.location_name}{' '}
          will be deleted from this account and will not get flood messages.
        </>
      ),
      title: 'Delete location',
      buttonText: 'Delete location',
      buttonClass: 'govuk-button--warning',
      input: '',
      textInput: '',
      setTextInput: '',
      charLimit: 0,
      error: ''
    })
  }

  const handleDelete = () => {
    setDialog({ ...dialog, show: false })
  }

  return (
    <>
      <p
        className='govuk-!-margin-bottom-3'
        style={{ display: 'flex', color: '#505a5f' }}
      >
        {locations.length !== displayedLocations.length &&
          'Showing ' + displayedLocations.length + ' of '}
        {locations.length} {locations.length === 1 ? 'location' : 'locations'}
        <span style={{ margin: '0 20px' }}>|</span>
        {selectedLocations.length}{' '}
        {selectedLocations.length === 1 ? 'location' : 'locations'} selected
        <span style={{ margin: '0 20px' }}>|</span>
        <img src={locationPin} alt='Location pin icon' />
        <Link>View on map</Link>
      </p>
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
                    checked={isTopCheckboxChecked}
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
                    'meta_data.location_additional.location_name'
                  )}
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
                    'meta_data.location_additional.location_type'
                  )}
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
                    'meta_data.location_additional.business_criticality'
                  )}
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
                    'meta_data.location_additional.river_sea_risk'
                  )}
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
              <button type='button' onClick={() => sortGroundWaterRisks()}>
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
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                <Link onClick={(e) => viewLocation(e, location)}>
                  {location.meta_data.location_additional.location_name}
                </Link>
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                {location.meta_data.location_additional.location_type}
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                {location.meta_data.location_additional.business_criticality}
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                <Link onClick={(e) => updateMessageSettings(e, location)}>
                  {location.alert_categories.length > 0 ? 'Yes' : 'No'}
                </Link>
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                <Link onClick={(e) => linkToContacts(e, location)}>0</Link>
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                {
                  // (location.meta_data.location_additional.location_data_type ===
                  //   LocationDataType.ADDRESS ||
                  //   location.meta_data.location_additional.location_data_type ===
                  //     LocationDataType.X_AND_Y_COORDS) &&
                  //   location?.coordinates != null &&
                  //   <RiskCategoryLabel // <div className='flood-risk-banner-label '>
                  //     coordinates={location.coordinates}
                  //     riskAreaType={RiskAreaType.RIVERS_AND_SEA}
                  //   />
                  // </div>
                  riskRating && riskRating[index]
                }
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                {(location.meta_data.location_additional.location_data_type ===
                  LocationDataType.ADDRESS ||
                  location.meta_data.location_additional.location_data_type ===
                    LocationDataType.X_AND_Y_COORDS) && (
                      <div className='flood-risk-banner-label '>
                        <RiskCategoryLabel
                          coordinates={location.coordinates}
                          riskAreaType={RiskAreaType.GROUNDWATER}
                        />
                      </div>
                )}
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                <Link onClick={(e) => deleteLocation(e, location)}>Delete</Link>
              </td>
            </tr>
          ))}
          {dialog.show && (
            <>
              <Popup
                onDelete={() => handleDelete()}
                onClose={() => setDialog({ ...dialog, show: false })}
                title={dialog.title}
                popupText={dialog.text}
                buttonText={dialog.buttonText}
                buttonClass={dialog.buttonClass}
                input={dialog.input}
                // textInput={updatedKeyword}
                // setTextInput={setUpdatedKeyword}
                charLimit={dialog.charLimit}
                error={dialog.error}
                setError={(val) =>
                  setDialog((dial) => ({ ...dial, error: val }))}
                // validateInput={() => validateInput()}
                // defaultValue={dialog.input ? targetKeyword.name : ''}
              />
            </>
          )}
        </tbody>
      </table>
    </>
  )
}
