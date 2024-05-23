import React from 'react'
export default function TextInput({
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
        class={
          error === ''
            ? 'govuk-form-group'
            : 'govuk-form-group govuk-form-group--error'
        }
      >
        <label class="govuk-label" htmlFor="govuk-input">
          {name}
        </label>
        {error === '' && (
          <p id="error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <input
          className={
            error === '' ? className : 'govuk-input govuk-input--error'
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
