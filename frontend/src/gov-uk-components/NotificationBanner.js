export default function NotificationBanner({ title, className, text }) {
  return (
    <>
      <div
        class={className}
        role="alert"
        aria-labelledby="govuk-notification-banner-title"
        data-module="govuk-notification-banner"
      >
        <div class="govuk-notification-banner__header">
          <h2
            class="govuk-notification-banner__title"
            id="govuk-notification-banner-title"
          >
            {title}
          </h2>
        </div>
        <div class="govuk-notification-banner__content">
          <p class="govuk-body">{text}</p>
        </div>
      </div>
    </>
  );
}
