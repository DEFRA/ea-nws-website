import React from 'react'
import alertIcon from '../../../common/assets/images/alert_area_icon.png'
import shapeIcon from '../../../common/assets/images/shapefile_icon.png'
import warningIcon from '../../../common/assets/images/warning_area_icon.png'

export default function FloodWarningKey (showShapefile = false) {
  return (
    <div className='org-flood-warning-key'>
      {showShapefile && (
        <div className='org-flood-warning-item'>
          <img src={shapeIcon} alt='Shapefile' />
          <span className='org-flood-warning-text'>Shapefile</span>
        </div>
      )}
      <div className='org-flood-warning-item'>
        <img src={warningIcon} alt='Flood warning and severe flood area' />
        <span className='org-flood-warning-text'>
          Flood warning and
          <br /> severe flood area
        </span>
      </div>

      <div className='org-flood-alert-item'>
        <img src={alertIcon} alt='Flood alert area' />
        <span>Flood alert area</span>
      </div>
    </div>
  )
}
