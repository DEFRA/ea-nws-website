import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import { setCurrentLocationChildrenIDs } from '../../../../common/redux/userSlice'
import { infoUrls } from '../../../routes/info/InfoRoutes'

export default function LinkLocationsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [childrenIDs, setChildrenIDs] = useState([])

  const handleCheckboxChange = (areaId) => {
    setChildrenIDs((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    )
  }

  const handleSubmit = () => {
    dispatch(setCurrentLocationChildrenIDs(childrenIDs))
    navigate('#') // TODO: Navigate to correct next page
  }

  // TODO: Implement real data
  const tempData = [
    {
      id: '1234',
      name: 'Properties closest to the River Thames',
      address: 'All Saints Church, Bisham to Little Marlow',
      coordinates: { lat: 51.57, lon: -0.78 },
      alertTypes: ['Severe', 'Warning'],
      distance: 'Xm',
      areaType: 'Flood area'
    },
    {
      id: '5678',
      name: 'River Thames at Bisham village',
      address: 'Bisham village and Marlow town',
      coordinates: { lat: 51.57, lon: -0.78 },
      alertTypes: ['Severe', 'Warning'],
      distance: 'Xm',
      areaType: 'Flood area'
    },
    {
      id: '9101',
      name: 'River Thames at Hurley and Harleyford',
      address: 'Hurley and Harleyford, Berkshire',
      coordinates: { lat: 51.55, lon: -0.77 },
      alertTypes: ['Warning', 'Alert'],
      distance: 'Xm',
      areaType: 'Flood area'
    },
    {
      id: '1121',
      name: 'River Thames from Hurley to Cookham',
      address: 'Hurley to Cookham, Berkshire',
      coordinates: { lat: 51.56, lon: -0.76 },
      alertTypes: ['Alert'],
      distance: 'Xm',
      areaType: 'Flood area'
    }
  ]

  const table = (
    <>
      <table className='govuk-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table_row'>
            <th
              scope='col'
              className='govuk-table__header govuk-!-width-one-quarter'
            >
              Area name
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              style={{ width: '15%' }}
            >
              Distance from location
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              style={{ width: '15%' }}
            >
              Area type
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              style={{ width: '15%' }}
            >
              Total messages sent in the last 2 years
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              style={{ width: '10%' }}
            >
              Link to area
            </th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {tempData.map((area) => (
            <tr key={area.id} className='govuk-table__row'>
              <td className='govuk-table__cell'>
                <Link to='#' className='govuk-link'>
                  {area.name}
                </Link>
              </td>
              <td className='govuk-table__cell'>{area.distance}</td>
              <td className='govuk-table__cell'>{area.areaType}</td>
              <td className='govuk-table__cell'>
                {area.severeWarnings} severe flood warnings <br />
                {area.warnings} flood warnings <br />
                {area.alerts} flood alerts
              </td>
              <td className='govuk-table__cell'>
                <div
                  className='govuk-checkboxes--small'
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Checkbox
                    value={area.id}
                    onChange={() => handleCheckboxChange(area.id)}
                    checked={childrenIDs.includes(area.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <br />
            <h1 className='govuk-heading-l'>Select nearby flood areas</h1>
            <p className='govuk-body'>
              Location_IDX is near to these flood areas. You can select 1 or
              more nearby flood areas you want to link this location to.
              <br />
              <Link to={infoUrls.floodAreas} className='govuk-link inline-link'>
                What are flood areas?
              </Link>
              <br />
              <Link to={infoUrls.floodTypes} className='govuk-link inline-link'>
                What are the different types of flood messages?
              </Link>
            </p>{' '}
          </div>
          <div className='govuk-grid-column-full'>
            {table}
            <Button
              text='Link to areas'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
