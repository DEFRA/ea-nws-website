import React from 'react'
export default function Input({
  id,
  name,
  hint = '',
  className,
  value,
  defaultValue = '',
  inputType,
  onChange,
  error = '',
  isNameBold = false,
  labelSize = hint ? 's' : 'm',
  nameSize = null,
  hiddenLabel = false
}) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const labelClassName = `govuk-label ${
    isNameBold && !nameSize ? `govuk-label--${labelSize}` : ''
  } ${isNameBold && nameSize ? `govuk-label--${nameSize}` : ''} ${
    hiddenLabel ? 'govuk-visually-hidden' : ''
  }`

  return (
    <>
      <div
        className={
          error === ''
            ? 'govuk-form-group'
            : 'govuk-form-group govuk-form-group--error'
        }
      >
        <label className={labelClassName.trim()} htmlFor={id}>
          {name}
        </label>
        {hint && (
          <div className='govuk-hint govuk-!-margin-bottom-2'>{hint}</div>
        )}
        {error !== '' && (
          <p id='govuk-text-input-error' className='govuk-error-message'>
            {error}
          </p>
        )}
        <input
          className={
            error === '' ? className : className + ' govuk-input--error'
          }
          name={name}
          id={id}
          type={inputType}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
