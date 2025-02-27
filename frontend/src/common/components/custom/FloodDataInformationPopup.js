import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import floodAlertIcon from '../../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../../common/assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../../../../common/assets/images/severe_flood_warning.svg'
import Button from '../gov-uk/Button'
import ServiceNavigation from '../gov-uk/ServiceNavigation'
import AlertType from '../../enums/AlertType'
import { setCurrentLocation } from '../../redux/userSlice'
import { webToGeoSafeLocation } from '../../services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../organisation/routes/manage-locations/ManageLocationsRoutes'

export default function FloodDataInformationPopup({
  locationsFloodInformation,
  onClose
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const FloodAreaLink = ({ code, linkText }) => (
    <a
      className='govuk-link'
      target='_blank'
      rel='noopener noreferrer'
      href={`https://check-for-flooding.service.gov.uk/target-area/${code}`}
    >
      {linkText} (opens in new tab)
    </a>
  )

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
    console.log(page)
    setCurrentPage(page)
  }

  return (
    <div className='popup-dialog govuk-body'>
      <div className='popup-dialog-container'>
        <div className='popup-dialog-header'>
          <p className='popup-close-txt'>Close</p>
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
              {locationsFloodInformation[0].locationData.address}
            </Link>
          </h1>
          <ServiceNavigation
            navLinks={navLinks}
            currentPage={currentPage}
            updatePage={updateNavBar}
            removeGreyBackground
          />
          <div
            className={`govuk-!-margin-top-6 live-map-popup-scroll-container ${
              locationsFloodInformation.length > 2
                ? 'live-map-popup-scrollable'
                : ''
            }`}
          >
            {locationsFloodInformation.map((floodInformation, index) => (
              <div key={`${floodInformation.floodData.code}-${index}`}>
                <FloodWarningInfo floodInformation={floodInformation} />

                <p className='govuk-!-margin-top-5 govuk-body govuk-!-font-size-19'>
                  Updated {floodInformation.floodData.updatedTime}
                </p>

                <FloodAreaLink
                  code={floodInformation.floodData.code}
                  linkText={
                    FLOOD_WARNING_CONFIG[floodInformation.floodData.type]
                      .linkText
                  }
                />
                <br />
                <br />
              </div>
            ))}
          </div>
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
