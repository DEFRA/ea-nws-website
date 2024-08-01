import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAdditionalAlerts } from '../../../../common/redux/userSlice'
import LocationSearchResultsLayout from '../../../layouts/location/LocationSearchResultsLayout'

export default function LocationSearchResultsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const continueToNextPage = (isInWarningArea, isInAlertArea) => {
    if (isInWarningArea) {
      // take user to severe warning screen and then to alerts screen for
      // optional additional alerts
      dispatch(setAdditionalAlerts(true))
      navigate('/manage-locations/add/location-in-severe-warning-area')
    } else if (isInAlertArea) {
      // take user to non option flood alerts scren
      dispatch(setAdditionalAlerts(false))
      navigate('/manage-locations/add/location-in-alert-area')
    } else {
      // location isnt in danger area
      navigate('/manage-locations/add/no-danger')
    }
  }

  return (
    <>
      <LocationSearchResultsLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
