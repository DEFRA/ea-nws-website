import { booleanIntersects } from '@turf/turf'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import locationPin from '../../../../../common/assets/images/location_pin.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { riskData } from '../../../../components/custom/RiskCategoryLabel'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import FloodAreaMap from './floodAreaMap'

export default function FloodAreaPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const area = location.state.area
  const [locations, setLocations] = useState([])
  const [showMap, setShowMap] = useState(false)
  const [floodHistoryUrl, setHistoryUrl] = useState('')
  const [floodHistoryData, setFloodHistoryData] = useState(null)
  const [historicalMessages, setHistoricalMessages] = useState([])
  const orgId = useSelector((state) => state.session.orgId)

  const openMap = () => {
    setShowMap(true)
  }

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
  }

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

  const categoryToTableText = type => {
    const typeMap = {
        'Flood Warning': 'severe warning and flood warning',
        'Flood Warning Groundwater': 'severe warning and flood warning',
        'Flood Warning Rapid Response': 'severe warning and flood warning',
        'Flood Alert': 'flood alert',
        'Flood Alert Groundwater': 'flood alert'
      }
      return typeMap[type] || ''
  }

  const populateMessagesSent = (category, floodCount) => {
    const messageSent = []
    const messageTypes = categoryToMessageType(category)
    for (const messageType of messageTypes) {
      let count
      switch (messageType) {
        case 'Severe Flood Warning':
          count = floodCount.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} severe flood warning${count === 1 ? '' : 's'} were sent for this area in the last 2 years.`)
          break
        case 'Flood Warning':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} flood warning${count === 1 ? '' : 's'} were sent for this area in the last 2 years.`)
          break
        case 'Flood Alert':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} flood alert${count === 1 ? '' : 's'} were sent for this area in the last 2 years.`)
          break
        case 'default':
          messageSent.push('')
          break
      }
    }
    setHistoricalMessages(messageSent)
  }

  const setHistoricalData = (taCode, type) => {
    const twoYearsAgo = moment().subtract(2, 'years')
    if (taCode && type) {
      const newCount = []
      const messageTypes = categoryToMessageType(type)
      for (const messageType of messageTypes) {
        const filteredData = floodHistoryData.filter(
          (alert) =>
            alert.CODE === taCode &&
            alert.TYPE === messageType &&
            moment(alert.DATE, 'DD/MM/YYYY') > twoYearsAgo
        )
        newCount.push({ type: messageType, count: filteredData.length })
      }
      populateMessagesSent(type, newCount)
    }
  }

  useEffect(() => {
    const processFloodData = () => {
      if (floodHistoryData && area) {
        setHistoricalData(area.properties.TA_CODE, area.properties.category)
      }
    }
    processFloodData()
  }, [floodHistoryData])

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

  const getRiskCategory = async ({ riskAreaType, location }) => {
    let riskCategory = null

    if (
      location.additionals.other?.location_data_type !==
      LocationDataType.X_AND_Y_COORDS ||
      location.coordinates === null ||
      location.coordinates.latitude === null ||
      location.coordinates.longitude === null
    ) {
      return null
    }

    if (riskAreaType === RiskAreaType.RIVERS_AND_SEA) {
      riskCategory = await getRiversAndSeaFloodRiskRatingOfLocation(
        location.coordinates.latitude,
        location.coordinates.longitude
      )
    } else if (riskAreaType === RiskAreaType.GROUNDWATER) {
      riskCategory = await getGroundwaterFloodRiskRatingOfLocation(
        location.coordinates.latitude,
        location.coordinates.longitude
      )
    }

    return riskData[riskCategory]
  }

  useEffect(() => {
    const getLocations = async () => {
      const contactsDataToSend = { orgId }
      const { data } = await backendCall(
        contactsDataToSend,
        'api/elasticache/list_locations',
        navigate
      )

      const webLocations = []

      if (data) {
        data.forEach((location) => {
          webLocations.push(geoSafeToWebLocation(location))
        })
      }

      const locationsUpdate = []
      if (webLocations.length > 0) {
        webLocations.forEach((location) => {
          if (location.additionals.other.location_data_type == LocationDataType.X_AND_Y_COORDS) {
            booleanIntersects([location.coordinates.longitude, location.coordinates.latitude], area) && locationsUpdate.push(location)
          } else {
            booleanIntersects(location.geometry.geoJson, area) && locationsUpdate.push(location)
          }
        })
      }

      const riverSeaRisks = await Promise.all(
        locationsUpdate.map((location) =>
          getRiskCategory({
            riskAreaType: RiskAreaType.RIVERS_AND_SEA,
            location
          })
        )
      )
      const groundWaterRisks = await Promise.all(
        locationsUpdate.map((location) =>
          getRiskCategory({
            riskAreaType: RiskAreaType.GROUNDWATER,
            location
          })
        )
      )

      locationsUpdate.forEach(function (location, idx) {
        location.riverSeaRisk = riverSeaRisks[idx]
        location.groundWaterRisk = groundWaterRisks[idx]
      })

      setLocations(locationsUpdate)
    }

    getLocations()
  }, [])


  const message = ( <>
    {historicalMessages.length > 0 && historicalMessages.map((messageSent, index) => (
        <p key={index}>{messageSent}</p>
      ))}
      </>
  )

  return (
    <>

      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>Area Name</h1>
            {message}
            <div className='govuk-!-margin-top-4' style={{ display: 'flex', marginLeft: '-0.5rem' }}>
              <img src={locationPin} alt='Location pin icon' />
              <Link className='govuk-link' onClick={openMap}>View map</Link>
            </div>
              {showMap && (
                <FloodAreaMap
                  showMap={showMap}
                  setShowMap={setShowMap}
                  targetArea={area}
                  locations={locations}
                />
              )}
          </div>
          <div className='govuk-grid-column-full'>
            <h2 className='govuk-heading-m govuk-!-display-inline-block'>
              Locations in {categoryToTableText(area.properties.category)} area
            </h2>
            <span className='govuk-caption-m'>
                  {locations.length} locations are in this {categoryToTableText(area.properties.category)} area
                </span>

                <table className='govuk-table govuk-table--small-text-until-tablet'>
                  <thead className='govuk-table__head'>
                    <tr className='govuk-table__row'>
                      <th scope='col' className='govuk-table__header'>
                        Location
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Rivers and sea
                        <br /> flood risk
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Groundwater
                        <br /> flood risk
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Business
                        <br /> criticality
                      </th>
                    </tr>
                  </thead>
                  <tbody className='govuk-table__body'>
                    {locations.map((location, index) => (
                      <tr key={index} className='govuk-table__row'>
                        <td className='govuk-table__cell'>
                          <Link className='govuk-link'>
                            {location.other.locationName}
                          </Link>
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
                          {location.other.business_criticality}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          </div>
        </div>
      </main>
    </>
  )
}
