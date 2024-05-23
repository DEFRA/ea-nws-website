import React from 'react'

export default function NotificationBanner({
  classNameName,
  title,
  heading,
  text
}) {
  return (
    <>
      <div
        classNameName={classNameName}
        role="alert"
        aria-labelledby="govuk-notification-banner-title"
        data-module="govuk-notification-banner"
      >
        <div classNameName="govuk-notification-banner__header">
          <h2
            classNameName="govuk-notification-banner__title"
            id="govuk-notification-banner-title"
          >
            {title}
          </h2>
        </div>
        <div classNameName="govuk-notification-banner__content">
          {heading ? (
            <h3 classNameName="govuk-notification-banner__heading">
              {heading}
            </h3>
          ) : null}
          <p classNameName="govuk-body">{text}</p>
        </div>
      </div>
    </>
  )
}
