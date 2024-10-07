import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/custom.css'
import Button from '../gov-uk/Button'

export default function Popup({
  onAction,
  onCancel,
  onClose,
  title,
  popupText,
  input = '',
  buttonClass = 'govuk-button',
  buttonText
}) {
  return (
    <div className='popup-dialog'>
      <div className='popup-dialog-header'>
        <span class='popup-close-btn' onClick={onClose}>
          Close &times;
        </span>
      </div>
      <div className='popup-dialog-body'>
        <h3 className='govuk-heading-s'>{title}</h3>
        <p className='govuk-body'>{popupText}</p>
        {input && <p>input</p>}
        <div className='popup-dialog-flex'>
          <Button
            text={buttonText}
            className={`dialog ${buttonClass}`}
            onClick={onAction}
          />
          <p className='govuk-body popup-dialog-link inline-link'>
            <Link onClick={onCancel} className='govuk-link'>
              Cancel
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
