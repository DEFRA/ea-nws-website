import React from 'react'

export default function Input({ name, className, value, inputType, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="govuk-text-input">
          {name}
        </label>
        <input
          id="govuk-text-input"
          className={className}
          type={inputType}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
