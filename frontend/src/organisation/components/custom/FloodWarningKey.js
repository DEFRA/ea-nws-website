import React from 'react'
import alertIcon from '../../../common/assets/images/alert_area_icon.png'
import warningIcon from '../../../common/assets/images/warning_area_icon.png'

export default function FloodWarningKey () {
  return (
    <div className='org-flood-warning-key'>
      <div className='org-flood-warning-item'>
        <img src={warningIcon} alt='Flood warning and severe flood area' />
        <span className='org-flood-warning-text'>
          Severe flood warnings and flood warnings area
        </span>
      </div>

      <div className='org-flood-alert-item'>
        <img src={alertIcon} alt='Flood alert area' />
        <span>Flood alert area</span>
      </div>
    </div>
  )
}
