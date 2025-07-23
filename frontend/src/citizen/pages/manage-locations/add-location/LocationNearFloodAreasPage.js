import { useNavigate } from 'react-router-dom'
import LocationNearFloodAreasLayout from '../../../layouts/location/LocationNearFloodAreasLayout'

export default function LocationNearFloodWarningsPage() {
  const navigate = useNavigate()

  const continueToNextPage = ({ locationName }) => {
    navigate('/home', {
      state: {
        locationName
      }
    })
  }

  const searchResultsPage = '/manage-locations/add/search-results'

  return (
    <>
      <LocationNearFloodAreasLayout
        continueToNextPage={continueToNextPage}
        searchResultsPage={searchResultsPage}
      />
    </>
  )
}
