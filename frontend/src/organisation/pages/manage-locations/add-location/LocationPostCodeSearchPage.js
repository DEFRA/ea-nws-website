import { useNavigate } from 'react-router'
import LocationPostCodeSearchLayout from '../../../layouts/location/LocationPostCodeSearchLayout'

export default function LocationPostCodeSearchPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/manage-locations/add/postcode-search-results')
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <LocationPostCodeSearchLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
