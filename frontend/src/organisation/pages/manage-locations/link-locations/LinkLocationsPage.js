import { distance, point } from '@turf/turf'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import { setCurrentLocationChildrenIDs } from '../../../../common/redux/userSlice'
import {
  getSurroundingFloodAreas,
  getSurroundingFloodAreasFromShape
} from '../../../../common/services/WfsFloodDataService'
import { infoUrls } from '../../../routes/info/InfoRoutes'

export default function LinkLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentLocation = useSelector((state) => state.session.currentLocation)
  const [childrenIDs, setChildrenIDs] = useState([])
  const [floodAreas, setFloodAreas] = useState([])

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

  useEffect(() => {
    async function fetchFloodAreas () {
      if (!currentLocation) return

      let alertAreas = []
      let warningAreas = []
      if (currentLocation.geometry) {
        const { alertArea, warningArea } =
          await getSurroundingFloodAreasFromShape(currentLocation.geometry)

        alertAreas = alertArea.features
        warningAreas = warningArea.features
      } else {
        const { alertArea, warningArea } = await getSurroundingFloodAreas(
          currentLocation.coordinates.latitude,
          currentLocation.coordinates.longitude
        )
        alertAreas = alertArea.features
        warningAreas = warningArea.features
      }

      const locationPoint = point([
        currentLocation.coordinates.longitude,
        currentLocation.coordinates.latitude
      ])

      const floodAreasWithDistances = [...alertAreas, ...warningAreas].map(
        (area) => {
          const floodPoint = point([
            area.geometry.coordinates[0][0][0][0],
            area.geometry.coordinates[0][0][0][1]
          ])

          const distanceM = distance(locationPoint, floodPoint, {
            units: 'meters'
          })

          return {
            ...area,
            properties: {
              ...area.properties,
              distance: `${Math.round(distanceM)}m`
            }
          }
        }
      )
      setFloodAreas(floodAreasWithDistances)
    }

    fetchFloodAreas()
  }, [currentLocation])

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
          {floodAreas.map((area) => (
            <tr key={area.id} className='govuk-table__row'>
              <td className='govuk-table__cell'>
                <Link to='#' className='govuk-link'>
                  {area.properties.TA_Name}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {area.properties.distance ?? 'Xm'}
              </td>
              <td className='govuk-table__cell'>{area.properties.category}</td>
              <td className='govuk-table__cell'>
                X severe flood warnings <br />
                X flood warnings <br />X flood alerts
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
                    value={area.properties.FWS_TACODE}
                    onChange={() =>
                      handleCheckboxChange(area.properties.FWS_TACODE)}
                    checked={childrenIDs.includes(area.properties.FWS_TACODE)}
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
              {currentLocation.name} is near to these flood areas. You can
              select 1 or more nearby flood areas you want to link this location
              to.
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
