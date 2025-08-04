import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'

export default function ErrorSummary({ errorList }) {
  const location = useLocation()
  //Remove null and flatten the errorList
  const errors = errorList.filter((item) => item !== null).flat()

  const genericError = 'The system encountered an unexpected error'

  const summaryRef = useRef(null)
  const focusFlag = useRef(false)

  useEffect(() => {
    if (!focusFlag.current && errors.length > 0 && summaryRef.current) {
      summaryRef.current.focus()
      focusFlag.current = true
    }
  }, [errors])

  if (errors.length === 0) return null

  // Prepend 'Error: ' to title only if not already present
  const newTitle = document.title.startsWith('Error: ')
    ? document.title
    : `Error: ${document.title}`

    const isOrganisationPage =
    location.pathname.includes('organisation') &&
    !location.pathname.includes('sign-up')

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
            {errors.map((error, index) => {
              // Extract the string (if an object)
              const errorText = typeof error === 'object' ? error.text : error

              // If it exactly equals the generic error, render full sentence + link
              if (errorText === genericError) {
                return (
                  <li key={index} className='govuk-error-summary__list-item'>
                    {genericError}. Please retry and if the problem persists{' '}
                    <Link to={isOrganisationPage ? '/organisation/contact' : '/contact'} className='govuk-link'>
                      contact us
                    </Link>
                    .
                  </li>
                )
              }

              // If an object, render a link to jump to that section
              if (typeof error === 'object' && error.componentId) {
                return (
                  <li
                    key={index}
                    style={{ color: '#d4351c', fontWeight: '700' }}
                  >
                    <a href={`#${error.componentId}`}>{errorText}</a>
                  </li>
                )
              }
              // Otherwise, just show the message
              return (
                <li key={index} style={{ color: '#d4351c', fontWeight: '700' }}>
                  {errorText}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
