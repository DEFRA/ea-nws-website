import React from 'react'

export default function Checkbox({ label = '', value, checked, onChange }) {
  return (
    <div className='govuk-checkboxes__item'>
      <input
        className='govuk-checkboxes__input'
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
        id={'id' + label}
      />
      <label
        className='govuk-label govuk-checkboxes__label'
        htmlFor={'id' + label}
      >
        {label}
      </label>
    </div>
  )
}
