import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAdditionalAlerts } from '../../../../common/redux/userSlice'
import LocationPostCodeSearchResultsLayout from '../../../layouts/location/LocationPostCodeSearchResultsLayout'

export default function LocationSearchResultsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigateToNextPage = (isInAlertArea, isInWarningArea, isError) => {
    if (isInAlertArea && isInWarningArea) {
      dispatch(setAdditionalAlerts(true))
      navigate(`/organisation/manage-locations/add/location-in-area/${'all'}`)
    } else if (isInAlertArea) {
      dispatch(setAdditionalAlerts(false))
      navigate(
        `/organisation/manage-locations/add/location-in-area/${'alerts'}`
      )
    } else if (!isInAlertArea && !isInWarningArea) {
      navigate(
        `/organisation/manage-locations/add/location-in-area/${'no-alerts'}`
      )
    } else if (isError) {
      navigate('/error')
    }
  }

  const navigateToCannotFindAddressPage = () => {
    // TODO: navigate to the appropriate page when user clicks "I cannot find address"
    navigate(-1)
  }

  return (
    <>
      <LocationPostCodeSearchResultsLayout
        navigateToNextPage={navigateToNextPage}
        navigateToCannotFindAddressPage={navigateToCannotFindAddressPage}
      />
    </>
  )
}
