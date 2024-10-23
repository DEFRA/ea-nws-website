import React, { useState } from 'react'

export default function Select ({
  label,
  options,
  name,
  onSelect,
  hint,
  error = '',
  initialSelectOptionText
}) {
  const [selectedOption, setSelectedOption] = useState('')
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    setSelectedOption(selectedValue)
    onSelect(selectedValue)
  }
  return (
    <div
      className={
        error === ''
          ? 'govuk-form-group'
          : 'govuk-form-group govuk-form-group--error'
      }
    >
      <label className='govuk-label' htmlFor={'id' + name}>
        {label}
      </label>
      <div htmlFor={'id' + hint} className='govuk-hint'>
        {hint}
      </div>
      {error !== '' && (
        <p id='govuk-text-input-error' className='govuk-error-message'>
          {error}
        </p>
      )}
      <select
        className={
          error === '' ? 'govuk-select' : 'govuk-select govuk-input--error'
        }
        id={'id' + name}
        name={name}
        aria-describedby={hint}
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value='' disabled>
          {initialSelectOptionText}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
