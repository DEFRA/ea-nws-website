import { useNavigate } from 'react-router-dom'
import LocationInFloodAreasLayout from '../../../layouts/location/LocationInFloodAreasLayout'

export default function LocationInFloodAreasPage() {
  const navigate = useNavigate()

  const continueToNextPage = (locationName) => {
    navigate('/home', {
      state: {
        locationName
      }
    })
  }

  const searchResultsPage = '/manage-locations/add/search-results'

  return (
    <>
      <LocationInFloodAreasLayout
        continueToNextPage={continueToNextPage}
        searchResultsPage={searchResultsPage}
      />
    </>
  )
}
