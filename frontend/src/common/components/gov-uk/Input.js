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
  isNameBold = false
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
          className={
            isNameBold === true
              ? `govuk-label govuk-label--${hint ? 's' : 'm'}`
              : 'govuk-label'
          }
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
