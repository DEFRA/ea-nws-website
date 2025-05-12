import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../layouts/location/LocationInAlertAreaLayout'

export default function LocationInAlertAreaPage () {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  // only used when user is going through nearby target areas flow
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )
  const selectedFloodWarningArea = useSelector(
    (state) => state.session.selectedFloodWarningArea
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedFloodAlertArea
  )

  const continueToSearchResultsPage = () => {
    navigate('/manage-locations/add/search-results')
  }

  const continueToNextPage = () => {
    let name
    if (isUserInNearbyTargetFlowpath) {
      // if user has selected a flood warning area, only show the name of the warning area in
      // location added banner
      if (selectedFloodWarningArea) {
        name = selectedFloodWarningArea.properties.TA_Name
      } else {
        name = selectedFloodAlertArea.properties.TA_Name
      }
    } else {
      name = selectedLocation.address
    }

    navigate('/home', {
      state: {
        locationName: name
      }
    })
  }

  return (
    <>
      <Helmet>
        <title>You Can Get Flood Alerts for This Location - Next Warning Service GOV.UK</title>
      </Helmet>
      <LocationInAlertAreaLayout continueToNextPage={continueToNextPage} continueToSearchResultsPage={continueToSearchResultsPage} />
    </>
  )
}
