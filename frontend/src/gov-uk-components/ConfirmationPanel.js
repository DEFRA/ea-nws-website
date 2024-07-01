import React from 'react'

export default function ConfirmationPanel ({
  className,
  title,
  body
}) {
  return (
    <>
      <div
        className={className}
        role='alert'
        aria-labelledby='govuk-panel__title'
        data-module='govuk-panel'
      >
        <div className='govuk-panel__title'>
          <h2
            className='govuk-panel__title'
            id='govuk-panel-title'
          >
            {title}
          </h2>
        </div>
        <div className='govuk-panel__body'>
          {body
            ? (
              <h3 className='govuk-panel__body'>{body}</h3>
              )
            : null}
        </div>
      </div>
    </>
  )
}
