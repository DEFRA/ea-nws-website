import React from 'react'
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
  showCancel = true
}) {

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

  const handleSubmit = () => {
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
        <div className='govuk-radios'>
        <table className="govuk-table">
          <tbody className='govuk-table__body'>
           <tr className='govuk-table__row'>
            <th className='govuk-table__header govuk-!-width-one-half' scope='row' style={{ verticalAlign: 'middle' }}>
              <strong>{option.label}</strong>
            </th>
            <td className='govuk-table__cell govuk-!-width-one-quarter' >            
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
                checked={option.sent===false}
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
              defaultValue={defaultValue}
            />
          )}
          {options && (
            <RadioOptions
              options={options}
            />
          )}
          <div className='popup-dialog-flex'>
            <Button
              text={buttonText}
              className={`dialog govuk-button ${buttonClass}`}
              onClick={handleSubmit}
            />
            {showCancel && (
              <p className='govuk-body popup-dialog-link inline-link'>
                <Link onClick={() => onClose()} className='govuk-link'>
                  Cancel
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}