import { useNavigate } from 'react-router'
import LocationNameLayout from '../../../layouts/location/LocationNameLayout'

export default function LocationNamePage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/manage-locations/add/search-option')
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <LocationNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
