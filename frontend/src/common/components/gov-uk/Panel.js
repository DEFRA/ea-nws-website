import React from 'react'

export default function ConfirmationPanel ({
  title,
  body,
  preTitle
}) {
  return (
    <>
      <div
        className='govuk-panel govuk-panel--confirmation'
        role='alert'
        aria-labelledby='govuk-panel__title'
        data-module='govuk-panel'
      >
        
        <div className='govuk-panel__title'>
          {preTitle &&
            <h2
              className='govuk-panel__title'
              id='govuk-panel-title'
            >
              {preTitle}
            </h2>
          }
          <h2
            className='govuk-panel__title'
            id='govuk-panel-title'
          >
            {title}
          </h2>
        </div>
        {body &&
          <div className='govuk-panel__body'>
            <h3 className='govuk-panel__body'>{body}</h3>
          </div>}
      </div>
    </>
  )
}
