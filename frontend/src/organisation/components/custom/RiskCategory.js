export default function RiskCategory({ riskRating }) {
  const riskData = {
    'v.low': { className: 'very-low-risk', title: 'Very low risk' },
    low: { className: 'low-risk', title: 'Low risk' },
    medium: { className: 'medium-risk', title: 'Medium risk' },
    high: { className: 'high-risk', title: 'High risk' },
    unlikely: { className: 'unlikely-risk', title: 'Unlikely risk' },
    possible: { className: 'possible-risk', title: 'Possible risk' }
  }

  const { className, title } = riskData[riskRating] || {}

  return (
    <>
      <span className={`flood-risk-container ${className}`}>{title}</span>
    </>
  )
}
