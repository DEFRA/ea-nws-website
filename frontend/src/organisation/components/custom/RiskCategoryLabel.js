import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RiskAreaType from '../../../common/enums/RiskAreaType'
import {
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation
} from '../../../common/services/WfsFloodDataService'

export default function RiskCategoryLabel ({ riskAreaType }) {
  const currentLocationCoordinates = useSelector(
    (state) => state.session.currentLocation.coordinates
  )
  const [riskRating, setRiskRating] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRiskRatings = async () => {
      let riskCategory = null
      const { latitude, longitude } = currentLocationCoordinates

      if (riskAreaType === RiskAreaType.RIVERS_AND_SEA) {
        riskCategory = await getRiversAndSeaFloodRiskRatingOfLocation(
          latitude,
          longitude
        )
      } else if (riskAreaType === RiskAreaType.GROUNDWATER) {
        riskCategory = await getGroundwaterFloodRiskRatingOfLocation(
          latitude,
          longitude
        )
      }
      setLoading(false)
      setRiskRating(riskCategory)
    }
    getRiskRatings()
  }, [])

  const riskData = {
    'v.low': { className: 'very-low-risk', title: 'Very low risk' },
    low: { className: 'low-risk', title: 'Low risk' },
    medium: { className: 'medium-risk', title: 'Medium risk' },
    high: { className: 'high-risk', title: 'High risk' },
    unlikely: { className: 'unlikely-risk', title: 'Unlikely' },
    possible: { className: 'possible-risk', title: 'Possible' },
    // incase the wfs returns no data
    unavailble: { className: '', title: 'Unavailble' }
  }

  const { className, title } = riskData[riskRating] || {
    className: '',
    title: 'Unavailble'
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
