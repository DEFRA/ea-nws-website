export const riskData = {
  'very low': { className: 'very-low-risk', title: 'Very low risk' },
  low: { className: 'low-risk', title: 'Low risk' },
  medium: { className: 'medium-risk', title: 'Medium risk' },
  high: { className: 'high-risk', title: 'High risk' },
  unlikely: { className: 'unlikely-risk', title: 'Unlikely' },
  possible: { className: 'possible-risk', title: 'Possible' },
  // incase the wfs returns no data
  unavailable: { className: '', title: 'Unavailable' }
}

export default function RiskCategoryLabel ({ riskLevel }) {
  const { className, title } = riskData[riskLevel] || {
    className: '',
    title: 'Unavailable'
  }

  return (
    <span className={`flood-risk-container ${className}`}>{title}</span>
  )
}
