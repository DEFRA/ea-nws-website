import { useNavigate } from 'react-router'
import LocationSearchOptionLayout from '../../../layouts/location/LocationSearchOptionLayout'

export default function LocationSearchOptionPage() {
  const navigate = useNavigate()

  const NavigateToPostcodeSearchPage = () => {
    navigate('/organisation/manage-locations/add/postcode-search')
  }

  // TODO: set this to point to the correct page when it exists
  const NavigateToXYSearchPage = () => {
    navigate('/organisation/manage-locations/add/xy-search')
  }

  // TODO: set this to point to the correct page when it exists
  const NavigateToPinSearchPage = () => {
    navigate('/organisation/manage-locations/add/pin-search')
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <LocationSearchOptionLayout
      NavigateToPostcodeSearchPage={NavigateToPostcodeSearchPage}
      NavigateToXYSearchPage={NavigateToXYSearchPage}
      NavigateToPinSearchPage={NavigateToPinSearchPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
