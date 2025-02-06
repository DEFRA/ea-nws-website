import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'

export default function LinkLocationsPage () {
  const navigate = useNavigate()

  const [checkedAreas, setCheckedAreas] = useState({})

  const handleCheckboxChange = (areaId) => {
    setCheckedAreas((prev) => ({ ...prev, [areaId]: !prev[areaId] }))
  }

  const tempData = [
    {
      id: 1,
      name: 'Flood area',
      distance: 'Xm',
      type: 'Area type',
      severeWarnings: 'X',
      warnings: 'X',
      alerts: 'X'
    },
    {
      id: 2,
      name: 'Flood area',
      distance: 'Xm',
      type: 'Area type',
      severeWarnings: 'X',
      warnings: 'X',
      alerts: 'X'
    },
    {
      id: 3,
      name: 'Flood area',
      distance: 'Xm',
      type: 'Area type',
      severeWarnings: 'X',
      warnings: 'X',
      alerts: 'X'
    },
    {
      id: 4,
      name: 'Flood area',
      distance: 'Xm',
      type: 'Area type',
      severeWarnings: 'X',
      warnings: 'X',
      alerts: 'X'
    },
    {
      id: 5,
      name: 'Flood area',
      distance: 'Xm',
      type: 'Area type',
      severeWarnings: 'X',
      warnings: 'X',
      alerts: 'X'
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
              <td className='govuk-table__cell'>{area.type}</td>
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
                    checked={!!checkedAreas[area.id]}
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
              <Link to='#' className='govuk-link inline-link'>
                What are flood areas?
              </Link>
              <br />
              <Link to='#' className='govuk-link inline-link'>
                What are the different types of flood messages?
              </Link>
            </p>{' '}
          </div>
          <div className='govuk-grid-column-full'>
            {table}
            <Button text='Link to areas' className='govuk-button' />
          </div>
        </div>
      </main>
    </>
  )
}
