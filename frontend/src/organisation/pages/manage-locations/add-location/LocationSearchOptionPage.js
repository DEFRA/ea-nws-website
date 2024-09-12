import { useNavigate } from 'react-router'
import LocationSearchOptionLayout from '../../../layouts/location/LocationSearchOptionLayout'

export default function LocationSearchOptionPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/manage-locations/add/postcode-search')
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <LocationSearchOptionLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
