import React from 'react'

export default function Checkbox ({ id, label = '', value, checked, onChange, style }) {
  return (
    <div className='govuk-checkboxes__item'>
      <input
        className='govuk-checkboxes__input'
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
        id={id || 'id' + label}
      />
      <label
        className='govuk-label govuk-checkboxes__label'
        style={style}
        htmlFor={'id' + label}
      >
        {label}
      </label>
    </div>
  )
}
