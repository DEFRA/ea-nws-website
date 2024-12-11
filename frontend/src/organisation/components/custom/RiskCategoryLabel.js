import { useEffect, useState } from 'react'
import RiskAreaType from '../../../common/enums/RiskAreaType'
import {
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation
} from '../../../common/services/WfsFloodDataService'

export const riskData = {
  'v.low': { className: 'very-low-risk', title: 'Very low risk' },
  low: { className: 'low-risk', title: 'Low risk' },
  medium: { className: 'medium-risk', title: 'Medium risk' },
  high: { className: 'high-risk', title: 'High risk' },
  unlikely: { className: 'unlikely-risk', title: 'Unlikely' },
  possible: { className: 'possible-risk', title: 'Possible' },
  // incase the wfs returns no data
  unavailable: { className: '', title: 'Unavailable' }
}

export default function RiskCategoryLabel ({ riskAreaType, coordinates }) {
  const [riskRating, setRiskRating] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRiskRatings = async () => {
      let riskCategory = null

      if (riskAreaType === RiskAreaType.RIVERS_AND_SEA) {
        riskCategory = await getRiversAndSeaFloodRiskRatingOfLocation(
          coordinates.latitude,
          coordinates.longitude
        )
      } else if (riskAreaType === RiskAreaType.GROUNDWATER) {
        riskCategory = await getGroundwaterFloodRiskRatingOfLocation(
          coordinates.latitude,
          coordinates.longitude
        )
      }
      setLoading(false)
      setRiskRating(riskCategory)
    }
    getRiskRatings()
  }, [])

  const { className, title } = riskData[riskRating] || {
    className: '',
    title: 'Unavailable'
  }

  return (
    <>
      {loading
        ? (
          <>
            <span className='flood-risk-container'>loading...</span>
          </>
          )
        : (
          <span className={`flood-risk-container ${className}`}>{title}</span>
          )}
    </>
  )
}
