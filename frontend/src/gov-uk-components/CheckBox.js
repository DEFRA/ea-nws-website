import React from 'react'

export default function Checkbox({ label, value, checked, onChange }) {
  return (
    <div className="govuk-radios__item">
      <input
        className="govuk-radios__input"
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        id={'id' + label}
      />
      <label className="govuk-label govuk-radios__label" htmlFor={'id' + label}>
        {label}
      </label>
    </div>
  )
}
