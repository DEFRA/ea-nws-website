import React from 'react'
export default function TextInput ({
  name,
  className,
  value,
  onChange,
  error = ''
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
        <label className='govuk-label' htmlFor='govuk-text-input'>
          {name}
        </label>
        {error !== '' && (
          <p id='{id}-error' className='govuk-error-message'>
            <span className='govuk-visually-hidden'>Error:</span> {error}
          </p>
        )}
        <input
          className={error === '' ? className : 'govuk-input--error'}
          name={name}
          id='govuk-text-input'
          type='text'
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
