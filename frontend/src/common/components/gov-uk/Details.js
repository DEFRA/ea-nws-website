import React from 'react'

export default function Details({ title, text }) {
  return (
    <>
      <details className='govuk-details'>
        <summary className='govuk-details__summary'>
          <h2 className='govuk-details__summary-text'>{title}</h2>
        </summary>
        <div className='govuk-details__text'>{text}</div>
      </details>
    </>
  )
}
