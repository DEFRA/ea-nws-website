import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../layouts/location/LocationSearchLayout'

export default function LocationSearchPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/manage-locations/add/search-results')
  }

  return (
    <>
      <LocationSearchLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
