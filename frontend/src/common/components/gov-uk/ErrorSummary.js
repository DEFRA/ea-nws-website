import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'

export default function ErrorSummary ({ errorList }) {
  const summaryRef = useRef(null)

  useEffect(() => {
    if (errorList.length > 0 && summaryRef.current) {
      summaryRef.current.focus()
    }
  }, [errorList])

  if (errorList.length === 0) return null

  // Prepend 'Error: ' to title only if not already present
  const newTitle = document.title.startsWith('Error: ')
    ? document.title
    : `Error: ${document.title}`

  return (
    <>
      <Helmet>
        <title>{newTitle}</title>
      </Helmet>
      <div
        ref={summaryRef}
        className='govuk-error-summary'
        data-module='govuk-error-summary'
        role='alert'
        aria-labelledby='error-summary-title'
        tabIndex={-1}
      >
        <h2 id='error-summary-title' className='govuk-error-summary__title'>
          There is a problem
        </h2>
        <div className='govuk-error-summary__body'>
          <ul className='govuk-list govuk-error-summary__list'>
            {errorList.map((error, index) => {
              // If an object, render a link to jump to that section
              if (typeof error === 'object' && error.href) {
                return (
                  <li
                    key={index}
                    style={{ color: '#d4351c', fontWeight: '700' }}
                  >
                    <a href={error.href}>{error.text}</a>
                  </li>
                )
              }
              // Otherwise, just show the message
              return (
                <li key={index} style={{ color: '#d4351c', fontWeight: '700' }}>
                  {error}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
