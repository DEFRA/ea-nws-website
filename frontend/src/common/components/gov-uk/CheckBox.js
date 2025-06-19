import React from 'react'

export default function Checkbox({
  label = '',
  value,
  checked,
  onChange,
  style
}) {
  const id = label.split(' ').join('_') // replaces spaces with underscores in ids
  return (
    <div className='govuk-checkboxes__item'>
      <input
        className='govuk-checkboxes__input'
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
        id={'id' + id}
      />
      <label
        className='govuk-label govuk-checkboxes__label'
        style={style}
        htmlFor={'id' + id}
      >
        {label}
      </label>
    </div>
  )
}
