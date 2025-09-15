export default function EmptyLocationsTableSpan({ additionalClasses = '' }) {
  return (
    <span
      className={`flood-risk-container ${additionalClasses}`}
      aria-label='Not available'
    >
      -
    </span>
  )
}
