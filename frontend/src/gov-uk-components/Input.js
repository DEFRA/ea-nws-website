import React from 'react'
export default function TextInput({
  name,
  classNameName,
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
        <label className="govuk-label" htmlFor="govuk-input">
          {name}
        </label>
        {error === '' && (
          <p id="error" classNameName="govuk-error-message">
            <span classNameName="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <input
          classNameName={
            error === '' ? classNameName : 'govuk-input govuk-input--error'
          }
          name={name}
          id="govuk-input"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
