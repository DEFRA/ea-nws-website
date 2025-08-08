import React from 'react'

export default function Checkbox({
  id,
  label = '',
  value,
  checked,
  onChange,
  style,
  screenReaderAdditional = '',
  ariaLabelledBy
}) {
  const formattedId = id || 'id_' + label?.split(' ').join('_') // replaces spaces with underscores in ids
  const labelId = `${formattedId}-label`
  return (
    <div className='govuk-checkboxes__item'>
      <input
        className='govuk-checkboxes__input'
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
        id={formattedId}
        aria-labelledby={ariaLabelledBy || labelId}
      />
      <label
        className='govuk-label govuk-checkboxes__label'
        style={style}
        htmlFor={formattedId}
        id={labelId}
      >
        {label}
        {screenReaderAdditional !== '' && (
          <span className='govuk-visually-hidden'>
            {screenReaderAdditional}
          </span>
        )}
      </label>
    </div>
  )
}
