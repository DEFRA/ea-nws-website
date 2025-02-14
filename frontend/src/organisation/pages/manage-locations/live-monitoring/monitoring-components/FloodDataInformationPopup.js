import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../../common/assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../../../../common/assets/images/severe_flood_warning.svg'
import Button from '../../../../../common/components/gov-uk/Button'
import AlertType from '../../../../../common/enums/AlertType'

export default function FloodDataInformationPopup({
  locationsFloodInformation,
  onClose
}) {
  const FLOOD_WARNING_CONFIG = {
    [AlertType.SEVERE_FLOOD_WARNING]: {
      type: 'Severe flood warning',
      backgroundColor: '#FFD7DC',
      borderColor: '#DB091C',
      iconColor: '#DB091C',
      icon: floodSevereWarningIcon,
      linkText: 'View severe flood warning'
    },
    [AlertType.FLOOD_WARNING]: {
      type: 'Flood warning',
      backgroundColor: '#FCEAEC',
      borderColor: '#DB091C',
      iconColor: '#DB091C',
      icon: floodWarningIcon,
      linkText: 'View flood warning'
    },
    [AlertType.FLOOD_ALERT]: {
      type: 'Flood alert',
      backgroundColor: '#FDF1E3',
      borderColor: '#EB7C25',
      iconColor: '#EB7C25',
      icon: floodAlertIcon,
      linkText: 'View flood alert'
    }
  }

  const FloodWarningInfo = ({ floodInformation }) => {
    const config = FLOOD_WARNING_CONFIG[floodInformation.floodData.type]

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: '10px',
          paddingBottom: '10px',
          backgroundColor: config.backgroundColor,
          borderLeft: `6px solid ${config.borderColor}`
        }}
      >
        <div style={{ flex: '0 0 auto', marginRight: '12px' }}>
          <img
            src={config.icon}
            alt={`Flood Icon`}
            style={{ width: '100px', height: '82px' }}
          />
        </div>

        <div
          style={{
            display: 'flex', // Ensures labels and values are in a row
            alignItems: 'flex-start',
            gap: '10px' // Adds space between label and value columns
          }}
        >
          {/* Labels Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              whiteSpace: 'nowrap' // Prevents text wrapping
            }}
          >
            <span className='govuk-!-margin-bottom-1 govuk-!-font-weight-bold govuk-!-font-size-19'>
              Type
            </span>
            <span className='govuk-!-margin-bottom-1 govuk-!-font-weight-bold govuk-!-font-size-19'>
              Flood area
            </span>
            <span className='govuk-!-font-weight-bold govuk-!-font-size-19'>
              Area code
            </span>
          </div>

          {/* Values Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <span className='govuk-!-margin-bottom-1 govuk-!-font-size-19'>
              {config.type}
            </span>
            <span className='govuk-!-margin-bottom-1 govuk-!-font-size-19'>
              {floodInformation.floodData.name}
            </span>
            <span className='govuk-!-font-size-19'>
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
          <h1 class='govuk-heading-l govuk-link'>
            <Link>{locationsFloodInformation[0].locationData.address}</Link>
          </h1>
          <p>placeholder for navigation</p>
          {/* Scrollable section if there are more than 2 items */}
          <div
            style={{
              maxHeight:
                locationsFloodInformation.length > 2 ? '300px' : 'unset',
              overflowY:
                locationsFloodInformation.length > 2 ? 'auto' : 'visible'
            }}
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
