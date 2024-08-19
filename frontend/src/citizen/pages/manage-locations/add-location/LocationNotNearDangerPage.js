import { useNavigate } from 'react-router-dom'
import LocationNotNearDangerLayout from '../../../layouts/location/LocationNotNearDangerLayout'

export default function LocationNotNearDangerPage () {
  const navigate = useNavigate()

  const continueToSearchResultsPage = () => {
    navigate('/manage-locations/add/search-results')
  }

  return (
    <>
      <LocationNotNearDangerLayout
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
