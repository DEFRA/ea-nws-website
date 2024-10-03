import { faMap } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PublicSharpIcon from '@mui/icons-material/PublicSharp'
import React from 'react'
import alertIcon from '../../../common/assets/images/alert_area_icon.png'
import warningIcon from '../../../common/assets/images/warning_area_icon.png'
import CheckBox from '../../../common/components/gov-uk/CheckBox'
import Radio from '../../../common/components/gov-uk/Radio'

export default function MapKey() {
  return (
    <div>
      <span className='govuk-heading-m govuk-!-font-size-18 govuk-!-margin-bottom-2'>
        Key
      </span>
      <hr class='govuk-section-break govuk-section-break--visible' />
      <div className='govuk-heading-m govuk-!-font-size-14 govuk-!-margin-top-2 govuk-!-margin-bottom-0'>
        Base map
      </div>
      <div>
        <div
          className='govuk-radios govuk-radios--small'
          data-module='govuk-radios'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Radio name='BaseMap' />
          <FontAwesomeIcon
            icon={faMap}
            size='xl'
            style={{ marginLeft: '-15px', marginRight: '7px' }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>Default view</p>
          <br />
        </div>
        <div
          className='govuk-radios govuk-radios--small'
          data-module='govuk-radios'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Radio name='BaseMap' />
          <FontAwesomeIcon
            icon={PublicSharpIcon}
            size='xl'
            style={{ marginLeft: '-15px', marginRight: '7px' }}
          />
          <PublicSharpIcon
            style={{
              fontSize: 32,
              marginLeft: '-15px',
              marginRight: '7px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>Satellite view</p>
        </div>
      </div>
      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
      <div className='govuk-heading-m govuk-!-font-size-14 govuk-!-margin-top-2 govuk-!-margin-bottom-0'>
        Flood areas
      </div>
      <div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small'
          data-module='govuk-checkboxes'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckBox name='FloodWarningAndSevereArea' />
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
          className='govuk-checkboxes govuk-checkboxes--small'
          data-module='govuk-checkboxes'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckBox name='FloodAlertArea' />
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
      </div>
      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
    </div>
  )
}
