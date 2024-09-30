import React from 'react'
export default function Input ({
  name,
  hint = '',
  className,
  value,
  defaultValue = '',
  inputType,
  onChange,
  error = '',
  isNameBold = false,
  labelSize = hint? 's' : 'm'
}) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <>
      <div
        className={
          error === ''
            ? 'govuk-form-group'
            : 'govuk-form-group govuk-form-group--error'
        }
      >
        <label
          className={`govuk-label ${
            isNameBold ? `govuk-label--${labelSize}` : ''
          }`}
          htmlFor='govuk-text-input'
        >
          {name}
        </label>
        {hint && (
          <div className='govuk-hint govuk-!-margin-bottom-2'>{hint}</div>
        )}
        {error !== '' && (
          <p id='govuk-text-input-error' className='govuk-error-message'>
            <span className='govuk-visually-hidden'>Error:</span> {error}
          </p>
        )}
        <input
          className={
            error === '' ? className : className + ' govuk-input--error'
          }
          name={name}
          id='govuk-text-input'
          type={inputType}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
