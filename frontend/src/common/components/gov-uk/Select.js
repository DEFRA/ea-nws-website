import React from 'react'
import { formatSentenceCase } from '../../utils/FormatSentenceCase'

export default function Select({
  id,
  label,
  options,
  name,
  onSelect,
  hint,
  error = '',
  initialSelectOptionText,
  disabledOptions = [],
  value,
  snakeCaseText = false
}) {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
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
          <span className='govuk-visually-hidden'>Error:</span> {error}
        </p>
      )}
      <select
        className={
          error === '' ? 'govuk-select' : 'govuk-select govuk-input--error'
        }
        id={id || 'id' + name}
        name={name}
        aria-describedby={hint}
        onChange={handleSelectChange}
        value={value || ''}
      >
        <option value='' disabled>
          {initialSelectOptionText}
        </option>
        {!snakeCaseText &&
          options.map((option, index) =>
            disabledOptions.includes(option) ? (
              <option key={index} value={option} disabled>
                {option}
              </option>
            ) : (
              <option key={index} value={option}>
                {option}
              </option>
            )
          )}
        {snakeCaseText &&
          options.map((option, index) =>
            disabledOptions.includes(option) ? (
              <option key={index} value={option} disabled>
                {formatSentenceCase(option)}
              </option>
            ) : (
              <option key={index} value={option}>
                {formatSentenceCase(option)}
              </option>
            )
          )}
      </select>
    </div>
  )
}
