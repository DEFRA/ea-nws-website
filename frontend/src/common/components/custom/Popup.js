import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../css/custom.css'
import Button from '../gov-uk/Button'
import Input from '../gov-uk/Input'

export default function Popup({
  onEdit,
  onDelete,
  onCancel,
  onClose,
  title,
  popupText,
  input = '',
  textInput,
  setTextInput,
  buttonClass = '',
  buttonText,
  error = '',
  setError,
  charLimit = 0,
  validateInput = null
}) {
  useEffect(() => {
    if (input && textInput.length <= charLimit) {
      setError('')
    }
  }, [textInput])

  const handleTextInputChange = (val) => {
    if (input) {
      setTextInput(val)
      if (val.length > charLimit) {
        setError(`${input}s must be ${charLimit} characters or less`)
      } else {
        setError('')
      }
    }
  }

  const handleSubmit = () => {
    if (!input) {
      onDelete()
    } else {
      if (error === '') {
        const validationError = validateInput()
        if (validationError) {
          setError(validationError)
        } else {
          onEdit()
        }
      }
    }
  }

  return (
    <div className='popup-dialog'>
      <div className='popup-dialog-container'>
        <div className='popup-dialog-header'>
          <p className='popup-close-txt'>Close</p>
          <span className='popup-close-btn' onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className='popup-dialog-body'>
          <h3 className='govuk-heading-l'>{title}</h3>
          <p className='govuk-body'>{popupText}</p>
          {input && (
            <Input
              name={input}
              onChange={(val) => handleTextInputChange(val)}
              className='govuk-input govuk-input--width-20'
              error={error}
            />
          )}
          <div className='popup-dialog-flex'>
            <Button
              text={buttonText}
              className={`dialog govuk-button ${buttonClass}`}
              onClick={handleSubmit}
            />
            <p className='govuk-body popup-dialog-link inline-link'>
              <Link onClick={() => onClose()} className='govuk-link'>
                Cancel
              </Link>
            </p>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}
