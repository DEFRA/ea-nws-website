import { distance, point, pointToPolygonDistance } from '@turf/turf'
import moment from 'moment'
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
import { csvToJson } from '../../../../common/services/CsvToJson'
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
  const [floodHistoryUrl, setHistoryUrl] = useState('')
  const [floodHistoryData, setFloodHistoryData] = useState(null)
  const [floodCounts, setFloodCounts] = useState([])
  const [floodAreaInputs, setFloodAreasInputs] = useState([])
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const categoryToMessageType = (type) => {
    const typeMap = {
      'Flood Warning': ['Flood Warning', 'Severe Flood Warning'],
      'Flood Warning Groundwater': ['Flood Warning', 'Severe Flood Warning'],
      'Flood Warning Rapid Response': ['Flood Warning', 'Severe Flood Warning'],
      'Flood Alert': ['Flood Alert'],
      'Flood Alert Groundwater': ['Flood Alert']
    }
    return typeMap[type] || []
  }

  const setHistoricalData = (taCode, type) => {
    const twoYearsAgo = moment().subtract(2, 'years')
    if (taCode && type) {
      const newCount = { TA_CODE: taCode, counts: [] }
      const messageTypes = categoryToMessageType(type)
      for (const messageType of messageTypes) {
        const filteredData = floodHistoryData.filter(
          (alert) =>
            alert.CODE === taCode &&
            alert.TYPE === messageType &&
            moment(alert.DATE, 'DD/MM/YYYY') > twoYearsAgo
        )
        newCount.counts.push({ type: messageType, count: filteredData.length })
      }
      setFloodCounts((prev) => [...prev, newCount])
    }
  }

  useEffect(() => {
    const processFloodData = () => {
      if (floodHistoryData && floodAreas) {
        if (floodAreas.length > 0) {
          floodAreas.forEach((area) => setHistoricalData(area.properties.TA_CODE, area.properties.category))
        }
      }
    }
    processFloodData()
  }, [floodHistoryData, floodAreas])

  useEffect(() => {
    async function getHistoryUrl () {
      const { data } = await backendCall(
        'data',
        'api/locations/download_flood_history'
      )
      setHistoryUrl(data)
    }
    getHistoryUrl()
    floodHistoryUrl &&
      fetch(floodHistoryUrl)
        .then((response) => response.text())
        .then((data) => {
          setFloodHistoryData(csvToJson(data))
        })
        .catch((e) =>
          console.error('Could not fetch Organisation Historic Flood Warning file', e)
        )
  }, [floodHistoryUrl])

  const populateMessagesSent = (category, floodCount) => {
    const messageSent = []
    const messageTypes = categoryToMessageType(category)
    for (const messageType of messageTypes) {
      let count
      switch (messageType) {
        case 'Severe Flood Warning':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} severe flood warning${count === 1 ? '' : 's'}`)
          break
        case 'Flood Warning':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} flood warning${count === 1 ? '' : 's'}`)
          break
        case 'Flood Alert':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} flood alert${count === 1 ? '' : 's'}`)
          break
        case 'default':
          messageSent.push('')
          break
      }
    }
    return messageSent
  }

  useEffect(() => {
    const populateInputs = (floodAreas, floodCounts) => {
      const updatedFloodAreas = []
      for (const area of floodAreas) {
        const taCode = area.properties.TA_CODE
        const floodCount = floodCounts.find((area) => area.TA_CODE === taCode)
        const messageSent = floodCount ? populateMessagesSent(area.properties.category, floodCount) : []
        const type = categoryToMessageType(area.properties.category)
        updatedFloodAreas.push({
          areaCode: area.properties.TA_CODE,
          areaName: area.properties.TA_Name,
          areaDistance: area.properties.distance,
          areaType: `${type.includes('Flood Warning') ? 'Flood warning' : 'Flood alert'} area`,
          messagesSent: messageSent
        })
      }
      setFloodAreasInputs(updatedFloodAreas)
    }

    if (floodAreas.length > 0 && floodCounts.length > 0) {
      populateInputs(floodAreas, floodCounts)
    }
  }, [floodAreas, floodCounts])

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
        if (otherAdditionals.childrenIDs) {
          otherAdditionals.childrenIDs.push(...value)
        } else {
          otherAdditionals.childrenIDs = value
        }
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

  const getParentLinkedContacts = async (currentLocation) => {
    const contactsDataToSend = { authToken, orgId, location: currentLocation }
    const { data } = await backendCall(
      contactsDataToSend,
      'api/elasticache/list_linked_contacts',
      navigate
    )

    const contactIds = []
    if (data) {
      data.forEach((contact) => {
        contactIds.push(contact.id)
      })
    }
    return contactIds
  }

  const handleSubmit = async () => {
    const childrenIDs = []
    const childrenAlertTypes = []
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
        childrenAlertTypes.push(...alertTypes)
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
          // link the contacts from the parent location
          const linkedContacts = await getParentLinkedContacts(currentLocation)
          if (linkedContacts && linkedContacts.length > 0) {
            const dataToSend = { authToken, orgId, locationId: data.id, contactIds: linkedContacts }
            await backendCall(
              dataToSend,
              'api/location/attach_contacts',
              navigate
            )
          }

          const registerData = {
            authToken,
            locationId: data.id,
            partnerId,
            params: {
              channelVoiceEnabled: true,
              channelSmsEnabled: true,
              channelEmailEnabled: true,
              channelMobileAppEnabled: true,
              partnerCanView: true,
              partnerCanEdit: true,
              alertTypes: alertTypes
            }
          }
    
          await backendCall(
            registerData,
            'api/location/register_to_partner',
            navigate
          )
    
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
      //update alert types of orginal location to include any new ones from linked locations
      const allAlertTypes = [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
      const alertTypes = []
      if (childrenAlertTypes.includes(allAlertTypes[0]) || additionalData.alertTypes.includes(allAlertTypes[0])) alertTypes.push(allAlertTypes[0])
      if (childrenAlertTypes.includes(allAlertTypes[1]) || additionalData.alertTypes.includes(allAlertTypes[1])) alertTypes.push(allAlertTypes[1])
      if (childrenAlertTypes.includes(allAlertTypes[2]) || additionalData.alertTypes.includes(allAlertTypes[2])) alertTypes.push(allAlertTypes[2])
      
      const registerData = {
        authToken,
        locationId: currentLocation.id,
        partnerId,
        params: {
          channelVoiceEnabled: true,
          channelSmsEnabled: true,
          channelEmailEnabled: true,
          channelMobileAppEnabled: true,
          partnerCanView: true,
          partnerCanEdit: true,
          alertTypes: alertTypes
        }
      }

      await backendCall(
        registerData,
        'api/location/update_registration',
        navigate
      )
      dispatch(setCurrentLocation(data))
      dispatch(setCurrentLocationAlertTypes(alertTypes))
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
          await getSurroundingFloodAreasFromShape(JSON.parse(currentLocation.geometry.geoJson), 1.0)

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
            // Use the coordinate point for locations that have them
            const locationPoint = point([
              currentLocation.coordinates.longitude,
              currentLocation.coordinates.latitude
            ])
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
          {floodAreaInputs.map((area) => (
            <tr key={area.id} className='govuk-table__row'>
              <td className='govuk-table__cell'>
                <Link to='#' className='govuk-link'>
                  {area.areaName}
                </Link>
              </td>
              <td className='govuk-table__cell'>
                {area.areaDistance ?? 'Xm'}
              </td>
              <td className='govuk-table__cell'>{area.areaType}</td>
              <td className='govuk-table__cell'>
                {area.messagesSent.map((messageSent, index) => (
                  <span key={index}>{messageSent}<br /></span>
                ))}
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
                    value={area.areaCode}
                    onChange={() =>
                      handleCheckboxChange(area.areaCode)}
                    checked={selectedTAs.includes(area.areaCode)}
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
            </p>
            <p className='govuk-body'>
              <Link to={infoUrls.floodAreas} className='govuk-link'>
                What are flood areas?
              </Link>
            </p>
            <p className='govuk-body'>
              <Link to={infoUrls.floodTypes} className='govuk-link'>
                What are the different types of flood messages?
              </Link>
            </p>
          </div>
          <div className='govuk-grid-column-full govuk-!-margin-top-4'>
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
