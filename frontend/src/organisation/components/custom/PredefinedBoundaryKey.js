import React from 'react'
import boundaryAlreadyAddedIcon from '../../../common/assets/images/boundary_already_added_icon.png'
import boundarySelectedIcon from '../../../common/assets/images/boundary_selected_icon.png'

export default function PredefinedBoundaryKey () {
  return (
    <div className='org-flood-warning-key'>
      <div className='org-flood-warning-item'>
        <img
          src={boundaryAlreadyAddedIcon}
          alt='Flood warning and severe flood area'
        />
        <span className='org-flood-warning-text'>Boundary already added</span>
      </div>

      <div className='org-flood-alert-item'>
        <img src={boundarySelectedIcon} alt='Flood alert area' />
        <span className='org-flood-warning-text'>Boundary selected</span>
      </div>
    </div>
  )
}
