import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/custom.css'
import Button from '../gov-uk/Button'
import Input from '../gov-uk/Input'

export default function Popup ({
  onAction,
  onCancel,
  onClose,
  title,
  popupText,
  input = '',
  setTextInput,
  buttonClass = '',
  buttonText
}) {
  return (
    <div className='popup-dialog'>
      <div className='popup-dialog-container'>
        <div className='popup-dialog-header'>
          <p className='popup-close-txt'>Close</p>
          <span className='popup-close-btn' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='popup-dialog-body'>
          <h3 className='govuk-heading-l'>{title}</h3>
          <p className='govuk-body'>{popupText}</p>
          {input && (
            <Input
              name={input}
              onChange={(val) => setTextInput(val)}
              className='govuk-input govuk-input--width-20'
            />
          )}

          <div className='popup-dialog-flex'>
            <Button
              text={buttonText}
              className={`dialog govuk-button ${buttonClass}`}
              onClick={onAction}
            />
            <p className='govuk-body popup-dialog-link inline-link'>
              <Link onClick={onCancel} className='govuk-link'>
                Cancel
              </Link>
            </p>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}
