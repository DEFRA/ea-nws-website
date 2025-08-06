import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../css/custom.css'
import Button from '../gov-uk/Button'
import Input from '../gov-uk/Input'
import Radio from '../gov-uk/Radio'

export default function Popup({
  onEdit,
  onDelete,
  onClose,
  title,
  popupText,
  input = '',
  options,
  textInput,
  setTextInput,
  buttonClass = '',
  buttonText,
  error = '',
  setError,
  charLimit = 0,
  validateInput = null,
  defaultValue,
  onRadioChange,
  showCancel = true,
  infoOnly = false
}) {
  const modalRef = useRef(null)
  const modalCloseRef = useRef(null)
  const lastFocusedElement = useRef(null)

  useEffect(() => {
    // last element that had focus before modal appears
    lastFocusedElement.current = document.activeElement
    // Set focus on modal container when modal appears
    modalRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements()
        if (focusableElements.length === 0) return

        const activeElement = document.activeElement
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (
          e.shiftKey &&
          (activeElement === firstElement || activeElement === modalRef.current)
        ) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        lastFocusedElement && lastFocusedElement.current?.focus()
      }
    }

    modalRef.current?.addEventListener('keydown', handleKeyDown)
    modalRef.current?.addEventListener('keydown', handleEscape)

    return () => {
      modalRef.current?.removeEventListener('keydown', handleKeyDown)
      modalRef.current?.removeEventListener('keydown', handleEscape)
    }
  }, [document.activeElement])

  const getFocusableElements = () => {
    return (
      modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) || []
    )
  }

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

  const handleRadioChange = (index, isItOn) => {
    onRadioChange(index, isItOn)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!input && !options) {
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

  const RadioOptions = ({ options }) => (
    <>
      {error && <p className='govuk-error-message'>{error}</p>}
      {options.map((option, index) => (
        <div className='govuk-radios' key={index}>
          <table className='govuk-table'>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <th
                  className='govuk-table__header govuk-!-width-one-half'
                  scope='row'
                  style={{ verticalAlign: 'middle' }}
                >
                  <strong>{option.label}</strong>
                </th>
                <td className='govuk-table__cell govuk-!-width-one-quarter'>
                  <Radio
                    label='On'
                    key={option.value + '_on'}
                    name={option.value + 'Radio'}
                    checked={option.sent}
                    onChange={() => handleRadioChange(index, true)}
                  />
                </td>
                <td className='govuk-table__cell govuk-!-width-one-quarter'>
                  <Radio
                    label='Off'
                    key={option.value + '_off'}
                    name={option.value + 'Radio'}
                    checked={option.sent === false}
                    onChange={() => handleRadioChange(index, false)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </>
  )

  return (
    <div
      aria-modal='true'
      role='dialog'
      aria-labelledby={title}
      className='popup-dialog'
    >
      <div className='popup-dialog-container' ref={modalRef} tabIndex={-1}>
        <div className='popup-dialog-header'>
          <p className='popup-close-txt'>Close</p>
          <span
            ref={modalCloseRef}
            tabIndex={0}
            aria-label='close'
            role='button'
            className='popup-close-btn'
            onClick={() => {
              onClose()
              lastFocusedElement.current?.focus()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClose()
                lastFocusedElement.current?.focus()
              }
            }}
          >
            &times;
          </span>
        </div>
        <div className='popup-dialog-body'>
          <h3 className='govuk-heading-l'>{title}</h3>
          <p className='govuk-body'>{popupText}</p>
          {!infoOnly && (
            <>
              {input && (
                <Input
                  name={input}
                  onChange={(val) => handleTextInputChange(val)}
                  className='govuk-input govuk-input--width-20'
                  error={error}
                  defaultValue={defaultValue}
                />
              )}
              {options && <RadioOptions options={options} />}
              <div className='popup-dialog-flex'>
                <Button
                  text={buttonText}
                  className={`dialog govuk-button ${buttonClass}`}
                  onClick={handleSubmit}
                />
                {showCancel && (
                  <p className='govuk-body popup-dialog-link inline-link'>
                    <Link
                      onClick={(event) => {
                        event.preventDefault()
                        onClose()
                        lastFocusedElement.current?.focus()
                      }}
                      className='govuk-link'
                    >
                      Cancel this
                    </Link>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
