import React from 'react'

export default function Radio ({ label, value, name, onChange }) {
  return (
    <div className='govuk-radios__item'>
      <input
        className='govuk-radios__input'
        type='radio'
        value={value}
        name={name}
        onChange={onChange}
        id={'id' + label}
      />
      <label className='govuk-label govuk-radios__label' htmlFor={'id' + label}>
        {label}
      </label>
    </div>
  )
}
