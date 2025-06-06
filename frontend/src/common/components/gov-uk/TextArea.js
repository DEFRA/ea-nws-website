import React from 'react'

export default function TextArea ({
  id,
  name,
  className,
  rows,
  value,
  onChange,
  error = '',
  additionalInfo,
  labelledByID = ''
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
        <label className='govuk-label' htmlFor={id}>
          {name}
        </label>
        {error !== '' && (
          <p id={`${id}-error`} className='govuk-error-message'>
            <span className='govuk-visually-hidden'>Error:</span> {error}
          </p>
        )}
        <textarea
          className={
            error === '' ? className : 'govuk-textarea govuk-textarea--error'
          }
          name={name}
          id={id}
          rows={rows}
          value={value}
          onChange={handleChange}
          aria-labelledby={labelledByID}
        />
        {additionalInfo && <p className='textarea-info'>{additionalInfo}</p>}
      </div>
    </>
  )
}
