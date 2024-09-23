import React from 'react'
export default function Input({
  name,
  subName = '',
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
              ? subName
                ? 'govuk-label govuk-label--s'
                : 'govuk-label govuk-label--m'
              : 'govuk-label'
          }
          htmlFor='govuk-text-input'
        >
          {name}
        </label>
        {subName && (
          <label className={'govuk-label'} htmlFor='govuk-text-input'>
            {subName}
          </label>
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
