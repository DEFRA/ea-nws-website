import React from 'react'

export default function TextInput({ name, className, value, onChange }) {
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
          id="text-input"
          className={className}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
