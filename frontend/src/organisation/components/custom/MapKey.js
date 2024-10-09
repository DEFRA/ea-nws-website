import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PublicSharpIcon from '@mui/icons-material/PublicSharp'
import React from 'react'
import alertIcon from '../../../common/assets/images/alert_area_icon.png'
import warningIcon from '../../../common/assets/images/warning_area_icon.png'
import CheckBox from '../../../common/components/gov-uk/CheckBox'

export default function MapKey ({
  isFloodWarningAndSevereAreasVisible,
  setFloodWarningAndSevereAreasVisible,
  isFloodAlertAreasVisible,
  setFloodAlertAreasVisible,
  isFloodExtentsVisible,
  setFloodExtentsVisible
}) {
  return (
    <div>
      <span className='govuk-heading-m govuk-!-font-size-18 govuk-!-margin-bottom-2'>
        Key
      </span>
      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
      <div className='govuk-heading-m govuk-!-font-size-14 govuk-!-margin-top-2 govuk-!-margin-bottom-0'>
        Flood areas
      </div>
      <div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodWarningAndSevereArea'
            onChange={() =>
              setFloodWarningAndSevereAreasVisible(
                !isFloodWarningAndSevereAreasVisible
              )}
            checked={isFloodWarningAndSevereAreasVisible}
          />
          <img
            src={warningIcon}
            style={{
              width: '24px',
              height: 'auto',
              marginLeft: '-15px',
              marginRight: '7px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>
            Flood warning and <br />
            severe area
          </p>
          <br />
        </div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodAlertArea'
            onChange={() =>
              setFloodAlertAreasVisible(!isFloodAlertAreasVisible)}
            checked={isFloodAlertAreasVisible}
          />
          <FontAwesomeIcon
            icon={PublicSharpIcon}
            size='xl'
            style={{ marginLeft: '-15px', marginRight: '7px' }}
          />
          <img
            src={alertIcon}
            style={{
              width: '24px',
              height: 'auto',
              marginLeft: '-15px',
              marginRight: '7px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>Flood alert area</p>
        </div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodExtent'
            onChange={() => setFloodExtentsVisible(!isFloodExtentsVisible)}
            checked={isFloodExtentsVisible}
          />
          <FontAwesomeIcon
            icon={PublicSharpIcon}
            size='xl'
            style={{ marginLeft: '-15px', marginRight: '7px' }}
          />
          <img
            src={alertIcon}
            style={{
              width: '24px',
              height: 'auto',
              marginLeft: '-15px',
              marginRight: '7px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>Flood extent</p>
        </div>
      </div>
      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
    </div>
  )
}
