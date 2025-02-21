import { distance, point, pointToPolygonDistance } from '@turf/turf'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import AlertType from '../../../../common/enums/AlertType'
import {
  getLocationAdditionals,
  getLocationOther,
  setCurrentLocation
} from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import {
  getSurroundingFloodAreas,
  getSurroundingFloodAreasFromShape
} from '../../../../common/services/WfsFloodDataService'
import { infoUrls } from '../../../routes/info/InfoRoutes'

export default function LinkLocationsLayout ({
  navigateToPreviousPage,
  navigateToNextPage
}
) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const authToken = useSelector((state) => state.session.authToken)
  const exisitingChildrenIDs = useSelector((state) =>
    getLocationOther(state, 'childrenIDs')
  )
  const orgId = useSelector((state) => state.session.orgId)
  const [selectedTAs, setSelectedTAs] = useState([])
  const [floodAreas, setFloodAreas] = useState([])

  const handleCheckboxChange = (areaId) => {
    setSelectedTAs((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    )
  }

  const setLocationChildrenIDs = (location, value) => {
    let idFound = false
    let otherAdditionals = {}
    for (let i = 0; i < location.additionals.length; i++) {
      if (location.additionals[i].id === 'other') {
        idFound = true
        otherAdditionals = JSON.parse(location.additionals[i].value?.s)
        otherAdditionals.childrenIDs = value
        location.additionals[i].value = { s: JSON.stringify(otherAdditionals) }
      }
    }
    if (!idFound) {
      location.additionals.push({
        id: 'other',
        value: { s: JSON.stringify({ childrenIDs: value }) }
      })
    }
    return location
  }

  const handleSubmit = async () => {
    let childrenIDs = []
    for (const areaId of selectedTAs) {
      const TargetAreaToAdd = floodAreas.find(
        (floodArea) => floodArea.properties.TA_CODE === areaId
      )
      if (TargetAreaToAdd) {
        const alertTypes =
          TargetAreaToAdd.properties.category === 'Flood Warning' || TargetAreaToAdd.properties.category === 'Flood Warning Rapid Response'
            ? [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING]
            : TargetAreaToAdd.properties.category === 'Flood Alert'
              ? [AlertType.FLOOD_ALERT]
              : []
        const locationToAdd = {
          id: null,
          name: null,
          enabled: true,
          address: TargetAreaToAdd.properties.TA_Name,
          coordinates: {
            latitude: Number(
              TargetAreaToAdd.properties.latitude.replace(',', '.')
            ),
            longitude: Number(
              TargetAreaToAdd.properties.longitude.replace(',', '.')
            )
          },
          additionals: [
            {
              id: 'parentID',
              value: { s: currentLocation.id }
            },
            {
              id: 'other',
              value: {
                s: JSON.stringify({ alertTypes })
              }
            }
          ]
        }

        const dataToSend = { authToken, orgId, location: locationToAdd }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/location/create',
          navigate
        )
        if (data) {
          childrenIDs.push({
            id: data.id,
            TA_Name: TargetAreaToAdd.properties.TA_Name,
            TA_CODE: TargetAreaToAdd.properties.TA_CODE,
            category: TargetAreaToAdd.properties.category
           })
        } else {
          // TODO set an error
          console.log(errorMessage)
        }
      }
    }

    console.log(childrenIDs)

    const locationToAdd = setLocationChildrenIDs(
      JSON.parse(JSON.stringify(currentLocation)),
      childrenIDs
    )
    const dataToSend = { authToken, orgId, location: locationToAdd }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/location/update',
      navigate
    )
    if (data) {
      dispatch(setCurrentLocation(data))
      navigateToNextPage() // TODO: Navigate to correct next page
    } else {
      // TODO set an error
      console.log(errorMessage)
    }
  }

  // Compute the minimum positive distance from any point in a Polygon/MultiPolygon to the flood area
  function computeMinPositiveDistance (locationGeometry, floodPolygon) {
    let minDistance = Infinity
    let coords = []

    if (locationGeometry.type === 'Polygon') {
      coords = locationGeometry.coordinates[0]
    } else if (locationGeometry.type === 'MultiPolygon') {
      // Flatten the outer rings of all polygons in the multipolygon
      coords = locationGeometry.coordinates.flatMap((poly) => poly[0])
    }

    coords.forEach((coord) => {
      const pt = point(coord)
      const dist = pointToPolygonDistance(pt, floodPolygon, { units: 'meters' })
      if (dist >= 0 && dist < minDistance) {
        minDistance = dist
      }
    })

    return minDistance === Infinity ? -1 : minDistance
  }

  useEffect(() => {
    async function fetchFloodAreas () {
      if (!currentLocation) return
      const currentLinked = exisitingChildrenIDs?.map((child) => child.TA_CODE)

      let alertAreas = []
      let warningAreas = []
      if (currentLocation.geometry) {
        const { alertArea, warningArea } =
          await getSurroundingFloodAreasFromShape(currentLocation.geometry, 1.0)

        alertAreas = alertArea.features.filter(
          (area) => !currentLinked?.includes(area.properties.TA_CODE)
        )
        warningAreas = warningArea.features.filter(
          (area) => !currentLinked?.includes(area.properties.TA_CODE)
        )
      } else {
        const { alertArea, warningArea } = await getSurroundingFloodAreas(
          currentLocation.coordinates.latitude,
          currentLocation.coordinates.longitude,
          1.0
        )
        alertAreas = alertArea.features.filter(
          (area) => !currentLinked?.includes(area.properties.TA_CODE)
        )
        warningAreas = warningArea.features.filter(
          (area) => !currentLinked?.includes(area.properties.TA_CODE)
        )
      }

      let floodAreasWithDistances = [...alertAreas, ...warningAreas].map(
        (area) => {
          let distanceM = 0

          if (currentLocation.coordinates) {
            console.log(currentLocation.coordinates)
            // Use the coordinate point for locations that have them
            const locationPoint = point([
              currentLocation.coordinates.longitude,
              currentLocation.coordinates.latitude
            ])
            console.log(area)
            try {
              distanceM = pointToPolygonDistance(locationPoint, area.geometry, {
                units: 'meters'
              })
            } catch {
              const areaPoint = point([
                Number(area.properties.longitude.replace(',', '.')),
                Number(area.properties.latitude.replace(',', '.'))
              ])
              distanceM = distance(locationPoint, areaPoint, {
                units: 'meters'
              })
            }
          } else if (currentLocation.geometry) {
            // For shapefile locations, compute the smallest positive distance
            distanceM = computeMinPositiveDistance(
              currentLocation.geometry,
              area.geometry
            )
          }

          if (distanceM < 0) return null

          return {
            ...area,
            properties: {
              ...area.properties,
              distance: `${Math.round(distanceM)}m`
            }
          }
        }
      )
      // Filter out any nulls from negative distances
      floodAreasWithDistances = floodAreasWithDistances.filter(Boolean)
      setFloodAreas(floodAreasWithDistances)
    }
    if (currentLocation.coordinates || currentLocation.geometry) {
      fetchFloodAreas()
    }
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
                    value={area.properties.TA_CODE}
                    onChange={() =>
                      handleCheckboxChange(area.properties.TA_CODE)}
                    checked={selectedTAs.includes(area.properties.TA_CODE)}
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
      <BackLink onClick={() => navigateToPreviousPage()} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <br />
            <h1 className='govuk-heading-l'>Select nearby flood areas</h1>
            <p className='govuk-body'>
              {additionalData.locationName} is near to these flood areas. You
              can select 1 or more nearby flood areas you want to link this
              location to.
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
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </main>
    </>
  )
}
