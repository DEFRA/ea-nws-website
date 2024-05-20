import React from 'react'

export default function ErrorSummary({ errorList }) {
  return (
    <>
      <div className="govuk-error-summary" data-module="govuk-error-summary">
        <div role="alert">
          <h2 className="govuk-error-summary__title">There is a problem</h2>
          <div className="govuk-error-summary__body">
            <ul className="govuk-list govuk-error-summary__list">
              {errorList.map((error, index) => (
                <li key={index}>
                  <a href="#">{error}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
