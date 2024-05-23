import React from 'react'

export default function Details({ title, text }) {
  return (
    <>
      <details classNameName="govuk-details">
        <summary classNameName="govuk-details__summary">
          <span classNameName="govuk-details__summary-text">{title}</span>
        </summary>
        <div classNameName="govuk-details__text">{text}</div>
      </details>
    </>
  )
}
