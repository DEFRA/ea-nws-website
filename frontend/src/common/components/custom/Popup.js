import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../css/custom.css'
import Button from '../gov-uk/Button'
import Input from '../gov-uk/Input'

export default function Popup({
  onAction,
  onCancel,
  onClose,
  title,
  popupText,
  input = '',
  textInput,
  setTextInput,
  buttonClass = '',
  buttonText,
  error,
  setError,
  charLimit,
  validateInput
}) {
  const handleTextInputChange = (val) => {
    setTextInput(val)
    if (val.length > charLimit) {
      setError(`${input} must be ${charLimit} characters or less`)
    } else {
      setError('')
    }
  }

  const handleEditSubmit = () => {
    if (error === '') {
      const validationError = validateInput(textInput)
      if (validationError) {
        setError(validationError)
      } else {
        onAction()
      }
    }
  }

  useEffect(() => {
    if (textInput.length <= charLimit) {
      setError('')
    }
  }, [textInput, setError, charLimit])

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
              onChange={(val) => handleTextInputChange(val)}
              className='govuk-input govuk-input--width-20'
              error={error}
            />
          )}
          <div className='popup-dialog-flex'>
            <Button
              text={buttonText}
              className={`dialog govuk-button ${buttonClass}`}
              onClick={input ? handleEditSubmit : onAction}
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
