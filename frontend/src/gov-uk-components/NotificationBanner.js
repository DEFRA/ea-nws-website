export default function NotificationBanner({
  className,
  title,
  heading,
  text,
}) {
  return (
    <>
      <div
        className={className}
        role="alert"
        aria-labelledby="govuk-notification-banner-title"
        data-module="govuk-notification-banner"
      >
        <div className="govuk-notification-banner__header">
          <h2
            className="govuk-notification-banner__title"
            id="govuk-notification-banner-title"
          >
            {title}
          </h2>
        </div>
        <div className="govuk-notification-banner__content">
          {heading ? (
            <h3 className="govuk-notification-banner__heading">{heading}</h3>
          ) : null}
          <p className="govuk-body">{text}</p>
        </div>
      </div>
    </>
  );
}
