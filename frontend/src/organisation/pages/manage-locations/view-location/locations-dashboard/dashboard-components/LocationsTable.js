import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCurrentLocation } from '../../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationsTable ({
  locations,
  displayedLocations,
  filteredLocations,
  selectedLocations,
  setSelectedLocations
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)

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
    dispatch(setCurrentLocation(location))
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  return (
    <>
      <p className='govuk-!-margin-bottom-6'>
        showing {filteredLocations.length} of {locations.length} locations
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
              <td className='govuk-table__cell'>
                {location.additionals.locationName}
              </td>
              <td className='govuk-table__cell'>
                {location.additionals.other.location_type}
              </td>
              <td className='govuk-table__cell'>
                {location.additionals.other.alertTypes > 0 ? 'Yes' : 'No'}
              </td>
              <td className='govuk-table__cell'>
                {location.additionals.other.business_criticality}
              </td>
              <td className='govuk-table__cell'>
                <Link onClick={(e) => viewLocation(e, location)}>
                  View or edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
