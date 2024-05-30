import React from 'react'

export default function Input({
  name,
  className,
  value,
  onChange,
  type,
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
        <label className="govuk-label" htmlFor="govuk-input">
          {name}
        </label>
        {error && <p className="govuk-error-message">{error}</p>}
        <input
          className={
            error === '' ? className : className + ' govuk-input--error'
          }
          name={name}
          id="govuk-input"
          type={type}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
