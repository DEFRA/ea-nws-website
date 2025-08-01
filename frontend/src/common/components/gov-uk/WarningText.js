import React from 'react'

export default function WarningText ({ text }) {
  return (
    <>
      <div className='govuk-warning-text'>
        <span className='govuk-warning-text__icon' aria-hidden='true'>
          !
        </span>
        <strong className='govuk-warning-text__text'>
          <span className='govuk-visually-hidden'>Warning</span>
          {text}
        </strong>
      </div>
    </>
  )
}
