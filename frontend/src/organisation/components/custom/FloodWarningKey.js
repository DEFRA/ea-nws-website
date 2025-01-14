import React from 'react'
import shapeIcon from '../../../common/assets/images/shapefile_icon.png'

export default function FloodWarningKey ({ showShapefile = false }) {
  return (
    <div className='org-flood-warning-key'>
      {showShapefile && (
        <div className='org-flood-warning-item'>
          <img src={shapeIcon} alt='Shapefile' />
          <span className='org-flood-warning-text'>Shapefile</span>
        </div>
      )}
      <div className='org-flood-warning-item'>
        <div className='org-flood-warning-square warning-square' />
        <span className='org-flood-warning-text'>
          Severe flood warnings and flood warnings area
        </span>
      </div>

      <div className='org-flood-alert-item'>
        <div className='org-flood-warning-square alert-square' />
        <span className='org-flood-warning-text'>Flood alert area</span>
      </div>
    </div>
  )
}
