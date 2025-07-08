import React from 'react'

export default function Checkbox({
  id,
  label = '',
  value,
  checked,
  onChange,
  style
}) {
  const formattedId = id || 'id_' + label.split(' ').join('_') // replaces spaces with underscores in ids
  return (
    <div className='govuk-checkboxes__item'>
      <input
        className='govuk-checkboxes__input'
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
        id={formattedId}
      />
      <label
        className='govuk-label govuk-checkboxes__label'
        style={style}
        htmlFor={formattedId}
      >
        {label}
      </label>
    </div>
  )
}
