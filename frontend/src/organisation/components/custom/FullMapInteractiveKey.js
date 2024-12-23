import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PublicSharpIcon from '@mui/icons-material/PublicSharp'
import React from 'react'
import alertIcon from '../../../common/assets/images/alert_area_icon.png'
import warningIcon from '../../../common/assets/images/warning_area_icon.png'
import CheckBox from '../../../common/components/gov-uk/CheckBox'

export default function MapInteractiveKey ({
  showFloodWarningAreas,
  setShowFloodWarningAreas,
  showFloodAlertAreas,
  setShowFloodAlertAreas,
  showFloodExtents,
  setShowFloodExtents,
  locations
}) {
  return (
    <div>
      <span className='govuk-heading-m govuk-!-font-size-18 govuk-!-margin-bottom-2'>
        Key
      </span>

      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />

      {/* Flood areas */}
      <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
        Flood areas
      </div>
      <div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodWarningAndSevereArea'
            onChange={() => setShowFloodWarningAreas(!showFloodWarningAreas)}
            checked={showFloodWarningAreas}
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
            Flood warning and severe area
          </p>
          <br />
        </div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodAlertArea'
            onChange={() => setShowFloodAlertAreas(!showFloodAlertAreas)}
            checked={showFloodAlertAreas}
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
            onChange={() => setShowFloodExtents(!showFloodExtents)}
            checked={showFloodExtents}
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

      {/* Locations */}
      <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
        Locations ({locations.length})
      </div>
      <div
        className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
        data-module='govuk-checkboxes'
      >
        <CheckBox
          name='FloodWarningAndSevereArea'
          onChange={() => setShowFloodWarningAreas(!showFloodWarningAreas)}
          checked={showFloodWarningAreas}
        />
        <p style={{ fontSize: '14px', margin: 0 }}>
          Flood warning and severe area
        </p>
        <br />
      </div>

      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
    </div>
  )
}
