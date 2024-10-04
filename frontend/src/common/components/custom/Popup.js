import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/custom.css'
import Button from '../gov-uk/Button'

export default function Popup({ onAction, onCancel, title, popupText }) {
  return (
    <div className='timeout-dialog'>
      <div className='timeout-dialog-container'>
        <h3 className='govuk-heading-s'>{title}</h3>
        <p className='govuk-body'>{popupText}</p>
        <div className='timeout-dialog-flex'>
          <Button className='govuk-button dialog' onClick={onAction} />
          <p className='govuk-body timeout-dialog-link inline-link'>
            <Link onClick={onCancel} className='govuk-link'>
              Cancel
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
