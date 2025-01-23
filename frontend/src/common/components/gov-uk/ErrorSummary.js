import React from 'react'

export default function ErrorSummary ({ errorList }) {
  return (
    <>
      {errorList.length > 0 && (
        <div className='govuk-error-summary' data-module='govuk-error-summary'>
          <div role='alert'>
            <h2 className='govuk-error-summary__title'>There is a problem</h2>
            <div className='govuk-error-summary__body'>
              <ul className='govuk-list govuk-error-summary__list'>
                {errorList.map((error, index) => (
                  <li key={index}>
                    <li key={index} style={{ color: '#d4351c', fontWeight: '700' }}>
                      {error}
                    </li>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
