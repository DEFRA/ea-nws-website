import React from 'react'

export default function NotificationBanner ({
  className,
  title,
  heading,
  text
}) {
  if (!Array.isArray(text)) {
    text = [text]
  }

  return (
    <>
      <div
        className={className}
        role='alert'
        aria-labelledby='govuk-notification-banner-title'
        data-module='govuk-notification-banner'
      >
        <div className='govuk-notification-banner__header'>
          <h2
            className='govuk-notification-banner__title'
            id='govuk-notification-banner-title'
          >
            {title}
          </h2>
        </div>
        <div className='govuk-notification-banner__content'>
          {heading
            ? (
              <h3 className='govuk-notification-banner__heading'>{heading}</h3>
              )
            : null}
          <p className='govuk-body'>
            {text.map((line, index) => (
              <p key={index} className='govuk-!-margin-bottom-1'>{line}</p>
            ))}
          </p>
        </div>
      </div>
    </>
  )
}
