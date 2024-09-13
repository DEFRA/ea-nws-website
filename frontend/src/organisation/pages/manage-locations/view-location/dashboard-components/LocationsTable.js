import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LocationsTable({ locations }) {
  const [selectedLocations, setSelectedLocations] = useState([])
  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)

  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked
    setIsTopCheckboxChecked(isChecked)
    if (isChecked) {
      setSelectedLocations(locations)
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

  return (
    <>
      <p className='govuk-!-margin-bottom-6'>700 locations</p>
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
          {locations.map((location, index) => (
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
              <td className='govuk-table__cell'>{location.name}</td>
              <td className='govuk-table__cell'>
                {location.meta_data.location_additional.location_type}
              </td>
              <td className='govuk-table__cell'>
                {location.alert_categories.length > 0 ? 'Yes' : 'No'}
              </td>
              <td className='govuk-table__cell'>
                {location.meta_data.location_additional.business_criticality}
              </td>
              <td className='govuk-table__cell'>
                <Link>View or edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
