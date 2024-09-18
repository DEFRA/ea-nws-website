import React from 'react'

export default function Select ({
  label,
  options,
  name,
  onChange,
  hint,
  error = ''
}) {
  const optionsSize = options.length
  return (
    <div
      className={
        error === ''
          ? 'govuk-form-group'
          : 'govuk-form-group govuk-form-group--error'
      }
    >
      <label className='govuk-label' htmlFor={'id' + label}>
        {label}
      </label>
      <div htmlFor={'id' + hint} className='govuk-hint'>
        {hint}
      </div>
      {error !== '' && (
        <p id='govuk-text-input-error' className='govuk-error-message'>
          <span className='govuk-visually-hidden'>Error:</span> {error}
        </p>
      )}
      <select
        className={
          error === '' ? 'govuk-select' : 'govuk-select govuk-input--error'
        }
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
