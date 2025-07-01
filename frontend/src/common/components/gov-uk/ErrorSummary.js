import React from 'react'

export default function ErrorSummary({ errorList }) {
  //Remove null and flatten the errorList
  const errors = errorList.filter((item) => item !== null).flat()

  return (
    <>
      {errors.length > 0 && (
        <div className='govuk-error-summary' data-module='govuk-error-summary'>
          <div role='alert'>
            <h2 className='govuk-error-summary__title'>There is a problem</h2>
            <div className='govuk-error-summary__body'>
              <ul className='govuk-list govuk-error-summary__list'>
                {errors.map((error, index) => (
                  <li
                    key={index}
                    style={{ color: '#d4351c', fontWeight: '700' }}
                  >
                    {error}
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
