import React from 'react'
import { useSelector } from 'react-redux'
import shapeIcon from '../../../common/assets/images/shapefile_icon.png'
import LocationDataType from '../../../common/enums/LocationDataType'
import { getLocationOther } from '../../../common/redux/userSlice'

export default function FloodWarningKey ({ showShapefile = false }) {
  const locationDataType = useSelector((state) =>
    getLocationOther(state, 'location_data_type')
  )

  return (
    <div className='org-flood-warning-key'>
      {(locationDataType === LocationDataType.SHAPE_POLYGON ||
        locationDataType === LocationDataType.SHAPE_LINE) && (
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
