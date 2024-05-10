export default function Details({ title, text }) {
  return (
    <>
      <details className="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">{title}</span>
        </summary>
        <div className="govuk-details__text">{text}</div>
      </details>
    </>
  );
}
