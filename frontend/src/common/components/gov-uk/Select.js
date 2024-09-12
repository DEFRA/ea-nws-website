import React from 'react'

export default function Select({ label, options, name, onChange, hint }) {
  const optionsSize = options.length
  return (
    <div class='govuk-form-group'>
      <label className='govuk-label' htmlFor={'id' + label}>
        {label}
      </label>
      <div htmlFor={'id' + hint} className='govuk-hint'>
        {hint}
      </div>
      <select
        className='govuk-select'
        id={'id' + name}
        name={name}
        aria-describedby={hint}
        onChange={onChange}
      >
        <option value='choose' selected>
          Select from {optionsSize} address{optionsSize > 1 ? 'es' : ''} partly
          matched
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
