import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { orgManageLocationsUrls } from '../../../organisation/routes/manage-locations/ManageLocationsRoutes'
import floodAlertIcon from '../../assets/images/flood_alert.svg'
import floodWarningIcon from '../../assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../assets/images/severe_flood_warning.svg'
import AlertType from '../../enums/AlertType'
import { setCurrentLocation } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { webToGeoSafeLocation } from '../../services/formatters/LocationFormatter'
import Button from '../gov-uk/Button'
import ServiceNavigation from '../gov-uk/ServiceNavigation'
import LoadingSpinner from './LoadingSpinner'

export default function FloodDataInformationPopup({
  locationsFloodInformation,
  onClose
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [servicePhase, setServicePhase] = useState(false)
  const [alerts, setAlerts] = useState()
  const [loading, setLoading] = useState(true)

  const targetAreas = Array.from(
    new Set(
      locationsFloodInformation[0].locationData.additionals.other.targetAreas
        .map((targetAreas) => targetAreas.TA_CODE)
        .filter((code) => code !== undefined)
    )
  )

  const hasLiveAlerts =
    locationsFloodInformation.filter(
      (floodInformation) =>
        floodInformation.floodData.lastUpdatedTime.getTime() ===
        floodInformation.floodData.startDate.getTime()
    ).length > 0
      ? true
      : false

  async function getServicePhase() {
    const { data } = await backendCall('data', 'api/service/get_service_phase')
    setServicePhase(data)
  }

  async function getAlerts() {
    const options = {
      states: [],
      boundingBox: null,
      channels: []
    }

    // load alerts
    const { data: alerts } = await backendCall(
      { options, taCodes: targetAreas },
      'api/alert/list',
      navigate
    )

    let allAlerts = [...alerts?.historicAlerts, ...alerts?.liveAlerts]
    allAlerts.sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate)
    })
    setAlerts(allAlerts)
    setLoading(false)
  }

  useEffect(() => {
    getServicePhase()
    getAlerts()
  }, [])

  const FLOOD_WARNING_CONFIG = {
    [AlertType.SEVERE_FLOOD_WARNING]: {
      type: 'Severe flood warning',
      className: 'live-map-popup-severe',
      borderColor: '#DB091C',
      icon: floodSevereWarningIcon,
      linkText: 'View severe flood warning'
    },
    [AlertType.FLOOD_WARNING]: {
      type: 'Flood warning',
      className: 'live-map-popup-warning',
      borderColor: '#DB091C',
      icon: floodWarningIcon,
      linkText: 'View flood warning'
    },
    [AlertType.FLOOD_ALERT]: {
      type: 'Flood alert',
      className: 'live-map-popup-alert',
      borderColor: '#EB7C25',
      icon: floodAlertIcon,
      linkText: 'View flood alert'
    }
  }

  const warningTypeDisplay = {
    [AlertType.SEVERE_FLOOD_WARNING]: {
      icon: floodSevereWarningIcon,
      text: 'Severe flood warning'
    },
    [AlertType.FLOOD_WARNING]: {
      icon: floodWarningIcon,
      text: 'Flood warning'
    },
    [AlertType.FLOOD_ALERT]: {
      icon: floodAlertIcon,
      text: 'Flood alert'
    }
  }

  const FloodWarningInfo = ({ floodInformation }) => {
    const config = FLOOD_WARNING_CONFIG[floodInformation.floodData.type]

    return (
      <div
        className={`live-map-popup-warning-container ${config.className}`}
        style={{ borderLeft: `6px solid ${config.borderColor}` }}
      >
        <div className='live-map-popup-icon-container'>
          <img
            src={config.icon}
            alt='Flood Icon'
            className='live-map-popup-icon'
          />
        </div>

        <div className='live-map-popup-content'>
          <div className='text-nowrap'>
            <span className='govuk-grid-column-one-quarter govuk-!-font-weight-bold govuk-!-font-size-19'>
              Type
            </span>
            <span className='govuk-grid-column-three-quarters govuk-!-font-size-19'>
              {config.type}
            </span>
          </div>

          <div>
            <span className='govuk-grid-column-one-quarter govuk-!-font-weight-bold govuk-!-font-size-19 text-nowrap'>
              Flood area
            </span>
            <span className='govuk-grid-column-three-quarters govuk-!-font-size-19'>
              {floodInformation.floodData.name}
            </span>
          </div>

          <div className='text-nowrap'>
            <span className='govuk-grid-column-one-quarter govuk-!-font-weight-bold govuk-!-font-size-19'>
              Area code
            </span>
            <span className='govuk-grid-column-three-quarters govuk-!-font-size-19'>
              {floodInformation.floodData.code}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const getFloodLink = (code, type) => {
    let floodLink = ''

    if (servicePhase === 'beta') {
      switch (type) {
        case AlertType.SEVERE_FLOOD_WARNING:
          floodLink = '/private-beta/flood-severe-warning'
          break
        case AlertType.FLOOD_WARNING:
          floodLink = '/private-beta/flood-warning'
          break
        case AlertType.FLOOD_ALERT:
          floodLink = '/private-beta/flood-alert'
          break
      }
    } else {
      floodLink = `https://check-for-flooding.service.gov.uk/target-area/${code}`
    }

    return floodLink
  }

  const FloodAreaLink = ({ code, linkText, type }) => (
    <a
      className='govuk-link'
      target='_blank'
      rel='noopener noreferrer'
      href={getFloodLink(code, type)}
    >
      {linkText} (opens in new tab)
    </a>
  )

  const formatDate = (date) => {
    const time = date
      .toLocaleString('en-UK', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      .toLowerCase()

    const day = date.getDate()
    const month = date.toLocaleString('en-UK', { month: 'long' })
    const year = date.getFullYear()

    return `${time} on ${day} ${month} ${year}`
  }

  const viewLocation = (e, location) => {
    e.preventDefault()
    dispatch(setCurrentLocation(webToGeoSafeLocation(location)))
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  const navLinks = [
    {
      name: 'Live',
      url: '/live'
    },
    {
      name: 'Timeline',
      url: '/timeline'
    }
  ]

  const [currentPage, setCurrentPage] = useState(navLinks[0].url)

  const updateNavBar = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='popup-dialog govuk-body'>
      <div className='popup-dialog-container'>
        <div className='popup-dialog-header'>
          <p className='popup-close-txt' onClick={onClose}>
            Close
          </p>
          <span className='popup-close-btn' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='popup-dialog-body'>
          <h1 className='govuk-heading-l govuk-link'>
            <Link
              onClick={(e) =>
                viewLocation(e, locationsFloodInformation[0].locationData)
              }
            >
              {locationsFloodInformation[0].locationData.name ||
                locationsFloodInformation[0].locationData.additionals
                  .locationName}
            </Link>
          </h1>
          <ServiceNavigation
            navLinks={navLinks}
            currentPage={currentPage}
            updatePage={updateNavBar}
            removeGreyBackground
          />
          {currentPage === '/live' ? (
            <div
              className={`govuk-!-margin-top-6 live-map-popup-scroll-container ${
                locationsFloodInformation.length > 2
                  ? 'live-map-popup-scrollable'
                  : ''
              }`}
            >
              {!hasLiveAlerts && (
                <p>There are no live flood warnings or alerts.</p>
              )}
              {locationsFloodInformation.map(
                (floodInformation, index) =>
                  floodInformation.floodData.lastUpdatedTime.getTime() ===
                    floodInformation.floodData.startDate.getTime() && (
                    <div key={`${floodInformation.floodData.code}-${index}`}>
                      <FloodWarningInfo floodInformation={floodInformation} />

                      <p className='govuk-!-margin-top-5 govuk-body govuk-!-font-size-19'>
                        Updated{' '}
                        {formatDate(floodInformation.floodData.lastUpdatedTime)}
                      </p>

                      <FloodAreaLink
                        code={floodInformation.floodData.code}
                        linkText={
                          FLOOD_WARNING_CONFIG[floodInformation.floodData.type]
                            .linkText
                        }
                        type={floodInformation.floodData.type}
                      />
                      <br />
                      <br />
                    </div>
                  )
              )}
            </div>
          ) : (
            <>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div
                  className={`govuk-!-margin-top-6 live-map-popup-scroll-container historic-alerts-popup ${
                    alerts.length > 2 ? 'live-map-popup-scrollable' : ''
                  }`}
                >
                  <table className='govuk-table govuk-table--small-text-until-tablet'>
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <th scope='col' className='govuk-table__header'></th>
                        <th scope='col' className='govuk-table__header'>
                          Start date
                        </th>
                        <th scope='col' className='govuk-table__header'>
                          End date
                        </th>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      {alerts.map((alert, index) => {
                        return (
                          <tr key={index} className='govuk-table__row'>
                            <td className='govuk-table__cell'>
                              <div className='reports-table-icon-position'>
                                <div
                                  key={index}
                                  className='warnings-table-item'
                                >
                                  <img
                                    src={warningTypeDisplay[alert.type].icon}
                                    alt='Flood warning icon'
                                    className='warnings-table-icon'
                                  />
                                  <span className='warnings-table-text'>
                                    {warningTypeDisplay[alert.type].text}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className='govuk-table__cell'>
                              {dayjs(alert.startDate).format(
                                'D MMM YYYY [at] HH:mm'
                              )}
                            </td>
                            <td className='govuk-table__cell'>
                              {alert.endDate
                                ? dayjs(alert.endDate).format(
                                    'D MMM YYYY [at] HH:mm'
                                  )
                                : '-'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          <Button
            text='Close'
            className='govuk-!-margin-top-5 govuk-button'
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}
